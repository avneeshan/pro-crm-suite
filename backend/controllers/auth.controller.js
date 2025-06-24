// Add this to your existing or new auth.controller.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password' });
    }

    const user = await User.findOne({ username: username.toLowerCase() }).select('+password');

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            role: user.role,
            permissions: user.permissions,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} = require('@simplewebauthn/server');
const User = require('../models/user.model');

const rpName = process.env.RP_NAME;
const rpID = process.env.RP_ID;
const origin = process.env.ORIGIN;

let challenges = {}; // In-memory store for challenges. Use Redis in production.

// 1. Generate Registration Options
exports.generateRegisterOptions = async (req, res) => {
    const user = await User.findById(req.user.id); // Assuming user is logged in to register a device
    if (!user) return res.status(404).json({ message: 'User not found' });

    const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userID: user.id,
        userName: user.username,
        attestationType: 'none',
        excludeCredentials: user.webAuthnCredentials.map(cred => ({
            id: cred.credID,
            type: 'public-key',
        })),
    });
    challenges[user.id] = options.challenge; // Store challenge
    res.json(options);
};

// 2. Verify Registration
exports.verifyRegister = async (req, res) => {
    const user = await User.findById(req.user.id);
    const expectedChallenge = challenges[user.id];

    try {
        const verification = await verifyRegistrationResponse({
            response: req.body,
            expectedChallenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
        });

        if (verification.verified && verification.registrationInfo) {
            const { credentialPublicKey, credentialID, counter } = verification.registrationInfo;
            user.webAuthnCredentials.push({
                credID: Buffer.from(credentialID),
                publicKey: Buffer.from(credentialPublicKey),
                counter,
            });
            await user.save();
            delete challenges[user.id];
            return res.json({ verified: true });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(400).json({ verified: false });
};

// ... Similar functions for `generateAuthOptions` and `verifyAuth` ...
// (These are more complex and would handle finding the user by username first)
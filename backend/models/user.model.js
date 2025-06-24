const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // 'select: false' to not return by default
    fullName: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    bloodGroup: { type: String },
    role: { type: String, enum: ['admin', 'marketing', 'service', 'erection'], required: true },
    salary: {
        amount: { type: Number, default: 0 },
        frequency: { type: String, enum: ['weekly', 'monthly'] }
    },
    permissions: {
        marketing: { type: Boolean, default: false },
        accounts: { type: Boolean, default: false },
        projects: { type: Boolean, default: false },
        tasks: { type: Boolean, default: false },
    },
    // For WebAuthn
    webAuthnCredentials: [{
        credID: { type: Buffer, required: true },
        publicKey: { type: Buffer, required: true },
        counter: { type: Number, required: true },
    }],
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    type: { type: String, enum: ['site', 'home', 'factory', 'office'], required: true },
    address: { type: String, required: true },
    googleMapsLink: { type: String },
});

const accountSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    primaryPhone: { type: String, required: true },
    locations: [locationSchema],
    sourceLead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
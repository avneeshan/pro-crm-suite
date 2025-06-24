const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    projectName: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['planning', 'in-progress', 'completed', 'on-hold'], default: 'planning' },
    quotation: {
        status: { type: String, enum: ['pending', 'given', 'accepted', 'cancelled'], default: 'pending' },
        fileUrl: { type: String }, // Link to uploaded quotation PDF/image
    },
    projectType: { type: String, enum: ['solar', 'motor'], required: true },
    totalValue: { type: Number, required: true }, // In INR
    paymentStatus: { type: String, enum: ['pending', 'advance', 'completed'], default: 'pending' },
    photos: [{ url: String, uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, uploadedAt: { type: Date, default: Date.now } }],
    finalNotes: { type: String },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
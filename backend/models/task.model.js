const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    location: {
        text: String,
        gps: { lat: Number, lng: Number }
    },
    taskAmount: { type: Number },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    sitePhotos: [{ url: String, uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, uploadedAt: { type: Date, default: Date.now } }],
    clientReviewVideoUrl: { type: String },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
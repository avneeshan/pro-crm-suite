const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: { type: String },
    audioUrl: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Polymorphic association
    associatedTo: {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        model: { type: String, required: true, enum: ['Lead', 'Account', 'Project'] }
    }
}, { timestamps: true });

// Create an index to query by associated model
noteSchema.index({ 'associatedTo.id': 1, 'associatedTo.model': 1 });

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
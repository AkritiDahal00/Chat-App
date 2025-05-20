const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    message: {
        text: {
            type: String, // This will handle encrypted message strings
            required: true,
        },
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId], // Use an array of ObjectId if users are referenced
        ref: 'User',
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Messages', msgSchema);

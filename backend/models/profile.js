const mongoose = require('mongoose');
const profileSchema = mongoose.Schema({
    diet: {
        type: [String],
        required: true,
    },
    health: {
        type: [String],
        required: true,

    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);
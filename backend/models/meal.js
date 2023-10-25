const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    api_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Meal', mealSchema);

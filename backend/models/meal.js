const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema(
  {
    api_id: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    cuisineType: {
      type: [String],
    },
    numberOfIngredients: {
      type: Number,
    },
    totalTime: {
      type: Number,
    },
    shareAs: {
      type: String,
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meal", mealSchema);

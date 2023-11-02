const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      
    },
    meals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Meal",
      },
    ],
    people: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Group", groupSchema);

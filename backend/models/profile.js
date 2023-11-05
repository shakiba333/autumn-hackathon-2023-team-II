const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    diet: {
      type: [String],
      required: true,
    },
    health: {
      type: [String],
      required: true,
    },
    cuisine: {
      type: [String],
      required: true,
    },
    dish: {
      type: [String],
      required: true,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);

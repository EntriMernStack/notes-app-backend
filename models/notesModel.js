const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please a add a title to the note"],
    },
    desc: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: [true, "Please enter the text"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);

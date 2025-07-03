const mongoose = require("mongoose");

//1-create Schema

const contactSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, "username required"],
    },
    Email: {
      type: String,
      required: [true, "email required"],
      lowercase: true,
    },

    Phone: String,
    message: {
      type: String,
      required: [true, "message required"],
    },
  },
  { timestamps: true }
);

//2-create Model
module.exports = mongoose.model("Contact", contactSchema);

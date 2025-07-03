const mongoose = require("mongoose");

//1-create Schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "firstname required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "lastname required"],
    },

    userName: {
      type: String,
      trim: true,
      required: [true, "username required"],
    },
    Email: {
      type: String,
      unique: true,
      required: [true, "email required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [8, "too short password"],
    },
    Phone: String,

    profileImg: String,
    count: Number,
    expiresAt: {
      type: Date,
    },
    code: {
      type: String,
      default: 0,
    },
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
  },
  { timestamps: true }
);

//@ dec remove "password" &"__v" from the output
userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password; // remove "password" from the output
    delete ret.__v; // remove "__v" from the output
    return ret;
  },
});

//2-create Model
module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ADMIN_ROLE, CLIENT_ROLE } = require("../../commons/util");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required..."],
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required..."],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required..."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required..."],
    },
    gender: {
      type: String,
      required: [true, "Gender is required..."],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required..."],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required..."],
    },
    role: {
      type: String,
      enum: [ADMIN_ROLE, CLIENT_ROLE],
      default: CLIENT_ROLE,
    },
  },
);

clientSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
});

module.exports = mongoose.model("Client", clientSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ADMIN_ROLE, CLIENT_ROLE } = require("../../commons/util");

const Schema = mongoose.Schema;
const clientSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please add a email..."],
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password required..."],
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: [ADMIN_ROLE, CLIENT_ROLE],
    default: CLIENT_ROLE,
  },
});
clientSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
});

module.exports = mongoose.model("Client", clientSchema);

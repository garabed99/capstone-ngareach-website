const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ADMIN_ROLE, PHOTOGRAPHER_ROLE } = require("../../commons/util");
const Schema = mongoose.Schema;

const photographerSchema = new Schema({
  email: {
    type: String,
    required: [true, "Backend-- Email is required..."],
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "Backend-- First name is required..."],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Backend-- Last name is required..."],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Backend-- Password is required..."],
  },
  gender: {
    type: String,
    required: [true, "Backend-- Gender is required..."],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Backend-- Date of birth is required..."],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Backend-- Phone number is required..."],
  },
  yearsOfExperience: {
    type: String,
    required: [true, "Backend-- Years of experience is required..."],
  },
  biography: {
    type: String,
    required: [true, "Backend-- Biography is required..."],
  },
  photographyTypes: {
    type: String,
    required: [true, "Backend-- Photography types is required..."],
  },
  pricePerHour: {
    type: String,
    required: [true, "Backend-- Price Per Hour is required..."],
  },
  profilePicture: {
    type: String,
  },
  portfolio: {
    type: [String],
  },
  websiteLink: {
    type: String,
    required: [true, "Backend-- Website link is required..."],
  },
  role: {
    type: String,
    enum: [ADMIN_ROLE, PHOTOGRAPHER_ROLE],
    default: PHOTOGRAPHER_ROLE,
  },
});

photographerSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
});

module.exports = mongoose.model("Photographer", photographerSchema);

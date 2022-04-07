const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ADMIN_ROLE, PHOTOGRAPHER_ROLE } = require("../../commons/util");

const Schema = mongoose.Schema;
const photographerSchema = new Schema({
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
  yearsOfExperience: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
  },
  photographyType: {
    enum: [
      "Pet",
      "Wildlife",
      "Fashion",
      "Sports",
      "Architecture",
      "Real estate",
      "Food",
      "Vehicle",
      "Advertising",
      "Aerial",
      "Landscape",
      "Panoramic",
      "Underwater",
      "Family",
      "Baby and child",
      "Newborn",
      "Portrait",
      "Branding",
      "Erotic",
      "Concert",
      "Fine art",
      "Street",
      "Wedding",
      "Birthday",
      "Baptism",
      "Travel",
      "Photojournalism",
      "Press",
      "Stock",
      "Paparazzi",
      "Macro",
      "Micro",
      "Film",
      "Astrophotography",
      "Graduation",
    ],
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

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ADMIN_ROLE, PHOTOGRAPHER_ROLE } = require("../../commons/util");

const ID_GENERATOR = (length = 7) => {
  let result = "ph-";
  return (result += Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  ));
};

const Schema = mongoose.Schema;
const photographerSchema = new Schema(
  {
    _id: {
      type: String,
      unique: true,
      default: ID_GENERATOR(),
    },
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
    yearsOfExperience: {
      type: String,
      required: [true, "Years of experience is required..."],
    },
    biography: {
      type: String,
      required: [true, "Biography is required..."],
    },
    photographyTypes: {
      type: String,
      required: [true, "Photography types is required..."],
    },
    role: {
      type: String,
      enum: [ADMIN_ROLE, PHOTOGRAPHER_ROLE],
      default: PHOTOGRAPHER_ROLE,
    },
  },
  { _id: false }
);

photographerSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
});

module.exports = mongoose.model("Photographer", photographerSchema);

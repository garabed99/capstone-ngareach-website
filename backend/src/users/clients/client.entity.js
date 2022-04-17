const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ADMIN_ROLE, CLIENT_ROLE } = require("../../commons/util");

const ID_GENERATOR = (length = 7) => {
  let result = "cl-";
  const characters = "1234567890";
  const charactersLength = characters.length;
  const n = length;
  for (let i = 0; i < n; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const Schema = mongoose.Schema;
const clientSchema = new Schema(
  {
    _id: {
      type: String,
      unique: true,
      default: ID_GENERATOR(),
    },
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
    dateOfBirth: {
      type: Date,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      enum: [ADMIN_ROLE, CLIENT_ROLE],
      default: CLIENT_ROLE,
    },
  },
  { _id: false }
);

clientSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
});

module.exports = mongoose.model("Client", clientSchema);

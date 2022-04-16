const Photographer = require("./photographer.entity");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class PhotographerService {
  create(payload) {
    const photographer = new Photographer(payload);
    return photographer.save();
  }

  async findAll() {
    const result = await Photographer.find(
      {},
      { __v: false, password: false }
    ).exec();
    return result;
  }

  async findOne(id) {
    const photographer = await Photographer.findById(id, {
      password: false,
    }).exec();
    if (!photographer) {
      throw new NotFound(`photographer with id ${id} not found.`);
    }
    return photographer;
  }

  async delete(id) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const photographer = await this.findOne(id);
      const removedPhotographer = await photographer.remove({
        session,
      });
      await session.commitTransaction();
      return removedPhotographer;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

  async update(id, payload) {
    let photographer = await this.findOne(id);

    photographer = Object.assign(photographer, payload);

    return photographer.save();
  }

  async login(email, password) {
    const message = "Either email or password is wrong.";

    const photographer = await Photographer.findOne(
      { email },
      { __v: false }
    ).exec();
    if (!photographer) {
      throw new UnauthorizedError(message);
    }

    const result = bcrypt.compareSync(password, photographer.password);
    if (!result) {
      throw new UnauthorizedError(message);
    }

    return jwt.sign(
      {
        _id: photographer._id,
        firstName: photographer.firstName,
        lastName: photographer.lastName,
        email: photographer.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }
}

module.exports = new PhotographerService();

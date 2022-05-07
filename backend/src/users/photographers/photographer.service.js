const Photographer = require("./photographer.entity");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class PhotographerService {
  create(payload) {
    // console.log('service-photoType ', payload.photographyType)
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
}

module.exports = new PhotographerService();

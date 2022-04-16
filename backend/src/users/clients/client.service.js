const Client = require("./client.entity");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class ClientService {
  create(payload) {
    const client = new Client(payload);
    return client.save();
  }

  async findAll() {
    const result = await Client.find(
      {},
      { __v: false, password: false }
    ).exec();
    return result;
  }

  async findOne(id) {
    const client = await Client.findById(id, { password: false }).exec();
    if (!client) {
      throw new NotFound(`client with id ${id} not found.`);
    }
    return client;
  }

  async delete(id) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const client = await this.findOne(id);
      const removedClient = await client.remove({
        session,
      });
      await session.commitTransaction();
      return removedClient;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

  async update(id, payload) {
    let client = await this.findOne(id);

    client = Object.assign(client, payload);

    return client.save();
  }

  async login(email, password) {
    const message = "Either email or password is wrong.";

    const student = await Client.findOne({ email }, { __v: false }).exec();
    if (!student) {
      throw new UnauthorizedError(message);
    }

    const result = bcrypt.compareSync(password, student.password);
    if (!result) {
      throw new UnauthorizedError(message);
    }

    return jwt.sign(
      {
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }
}

module.exports = new ClientService();

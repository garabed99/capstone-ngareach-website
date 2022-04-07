const Client = require("./client.entity");
const mongoose = require("mongoose");

class ClientService {
  create(payload) {
    const client = new Client(payload);
    return client.save();
  }

  // findAll(query) {
  //   const { offset, limit, sort, asc } = query;

  //   const sortObj = {};
  //   sortObj[sort] = asc === "true" ? "asc" : "desc";

  //   return Client.find({}, { password: false })
  //     .skip(+offset)
  //     .limit(+limit)
  //     .sort(sortObj)
  //     .exec();
  // }

  async findOne(id) {
    const client = await Client.findById(id, { password: false }).exec();
    if (!client) {
      throw new NotFound(`client with id ${id} not found.`);
    }
    return client;
  }
}

module.exports = new ClientService();

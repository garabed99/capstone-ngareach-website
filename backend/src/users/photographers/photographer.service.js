const Photographer = require("./photographer.entity");
const mongoose = require("mongoose");

class PhotographerService {
    create(payload) {
        const photographer = new Photographer(payload)
        return photographer.save();
    }
    async findOne(id) {
        const photographer = await Photographer.findById(id, { password: false }).exec();
        if (!photographer) {
            throw new NotFound(`photographer with id ${id} not found.`);
        }
        return photographer;
    }
}

module.exports = new PhotographerService();
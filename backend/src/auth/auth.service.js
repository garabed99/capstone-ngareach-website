const clients = require("../users/clients/client.entity");
const photographes = require("../users/photographers/photographer.entity");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//how to check the role if client or photographer
class AuthService {
  async validate(email, password) {
    const client = await clients.findOne({email});
    const photographer = await photographes.findOne({email});

    if (!client || !bcrypt.compareSync(password, client.password)) {
      if (client) {
        await client.save();
        return client;
      }
      throw new Unauthorized();
    }

    if (!photographer || !bcrypt.compare(password, photographer.password)) {
      if (photographer) {
        await photographer.save();
        return photographer;
      }
      throw new Unauthorized();
    }
  }

  async login(email, password) {
    const user = await this.validate(email, password);
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    const userinfo = {
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
    };
    return { token, userinfo };
  }

  validateToken(token) {
    const obj = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: false,
    });

    return { userId: obj.userId, email: obj.email };
  }
}
module.exports = new AuthService();

const clients = require("../users/clients/client.entity");
const photographers = require("../users/photographers/photographer.entity");
const { CLIENT_ROLE, PHOTOGRAPHER_ROLE } = require("../commons/util");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//how to check the role if client or photographer
class AuthService {
  async validate(email, password, role) {
    if (role === CLIENT_ROLE) {
      const client = await clients.findOne({ email });

      if (!client || !bcrypt.compareSync(password, client.password)) {
        if (client) {
          await client.save();
        }
        throw new Unauthorized();
      }
      return client;
    }

     if (role === PHOTOGRAPHER_ROLE) {
      const photographer = await photographers.findOne({ email });

      if (!photographer || !bcrypt.compare(password, photographer.password)) {
        if (photographer) {
          await photographer.save();
        }
        throw new Unauthorized();
      }
      return photographer;
    }
  }

  async login(email, password, role) {
    const user = await this.validate(email, password, role);
    console.log("user==>", user);
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    const userInfo = {
      token: token,
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return { userInfo };
  }

  validateToken(token) {
    const obj = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: false,
    });

    return { userId: obj.userId, email: obj.email };
  }
}
module.exports = new AuthService();

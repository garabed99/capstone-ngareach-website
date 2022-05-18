const clients = require("../users/clients/client.entity");
const photographers = require("../users/photographers/photographer.entity");
const { CLIENT_ROLE, PHOTOGRAPHER_ROLE } = require("../commons/util");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class AuthService {
  async validate(email, password, role) {
    if (role === CLIENT_ROLE) {
      const client = await clients.findOne({ email });
      const passwordCheck = await bcrypt.compare(password, client.password);
      if (!client || !passwordCheck) {
        throw new Unauthorized();
      } else {
        await client.save();
        return client;
      }
    }

    if (role === PHOTOGRAPHER_ROLE) {
      const photographer = await photographers.findOne({ email });
      const passwordCheck = await bcrypt.compare(
        password,
        photographer.password
      );
      if (!photographer || !passwordCheck) {
        throw new Unauthorized();
      } else {
        await photographer.save();
        return photographer;
      }
    }
  }

  async login(email, password, role) {
    const user = await this.validate(email, password, role);
    console.log("user==>", user);
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    const userInfo = {
      token: token,
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
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

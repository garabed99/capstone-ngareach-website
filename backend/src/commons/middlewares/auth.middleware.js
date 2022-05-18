const { Forbidden } = require("http-errors");
const { validateToken } = require("../../auth/auth.service");
const clients = require("../../users/clients.service");
const photographers = require("../../users/photographers.service");

const jwtMiddleware = async (req, res, next) => {
  let token;
  try {
    token = req.header("Authorization").split(" ")[1];
    const client = validateToken(token);
    const photographer = validateToken(token);

    const dbClient = await clients.findOne(client.userId);
    const dbPhotographer = await photographers.findOne(photographer.userId);

    client.role = dbClient.role;
    photographer.role = dbPhotographer.role;

    req.client = client;
    req.photographer = photographer;
  } catch (err) {
    return next(new Forbidden());
  }
  next();
};

jwtMiddleware.unless = require("express-unless");

module.exports = {
  jwtMiddleware,
};

const clients = require("../users/clients/client.entity");
const photographes = require("../users/photographers/photographer.entity");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//how to check the role if client or photographer

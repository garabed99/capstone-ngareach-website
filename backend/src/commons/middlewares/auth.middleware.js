const { Forbidden } = require('http-errors');
const { validateToken } = require('../../auth/auth.service');
const clients = require('../../users/clients');
const photographers = require('../../users/photographers');

// const jwtMiddleware = async
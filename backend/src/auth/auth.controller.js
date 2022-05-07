const express = require("express");
const router = express.Router();
const auth = require("./auth.service");
const asyncHandler = require("express-async-handler");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;
    console.log("res body====", email, password, role);
    const response = await auth.login(email, password, role);
    console.log("responseeee",response);
    res.json(response);
  })
);

module.exports = router;

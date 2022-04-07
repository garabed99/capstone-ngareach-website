const express = require("express");
const router = express.Router();
const auth = require("./auth.service");
const asyncHandler = require("express-async-handler");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log();
    const response = await auth.login(email, password);
    res.json(response);
    console.log(response);
  })
);

module.exports = router;

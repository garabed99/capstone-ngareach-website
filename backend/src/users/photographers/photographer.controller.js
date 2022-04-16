const express = require("express");
const router = express.Router();
const photographers = require("./photographer.service");
const asyncHandler = require("express-async-handler");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const body = req.body;
    const result = await photographers.create(body);
    console.log(result);
    res.send(result);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const result = await photographers.findAll();
    res.send(result);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await photographers.findOne(id);
    res.send(result);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await photographers.delete(id);
    res.json(result);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await photographers.update(id, req.body);
    res.json(result);
  })
);

module.exports = router;
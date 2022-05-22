const express = require("express");
const router = express.Router();
const clients = require("./client.service");
const asyncHandler = require("express-async-handler");
const {
  uploadClientProfile: uploadProfile,
} = require("../../commons/middlewares/multer.middleware");
const URL = require("url").URL;

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const body = req.body;
    const result = await clients.create(body);
    console.log(result);
    res.send(result);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const result = await clients.findAll();
    res.send(result);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await clients.findOne(id);
    res.send(result);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await clients.delete(id);
    res.json(result);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await clients.update(id, req.body);
    console.log("result===", result);
    res.json(result);
  })
);

router.patch(
  "/profilepicture/:id",
  uploadProfile.single("profilePicture"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log("img --cl.CONTROLLER====", req.file);
    const result = await clients.update(id, {
      profilePicture: req.file.path,
    });

    console.log("result===", result);
    res.json(result);
  })
);

router.get(
  "/profilepicture/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await clients.findOne(id);

    if (result.profilePicture) {
      res.sendFile(result.profilePicture);
    }
  })
);

module.exports = router;

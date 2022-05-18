const express = require("express");
const router = express.Router();
const clients = require("./client.service");
const asyncHandler = require("express-async-handler");
const {
  uploadClientProfile: upload,
} = require("../../commons/middlewares/multer.middleware");

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
  upload.single("profilePicture"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("img --cl.CONTROLLER", req.body);
red.file
    const result = await clients.update(id, req.body);

    console.log(result);
    res.json(result);
  })
);

module.exports = router;

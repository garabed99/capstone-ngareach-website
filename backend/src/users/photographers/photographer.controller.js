const express = require("express");
const router = express.Router();
const photographers = require("./photographer.service");
const asyncHandler = require("express-async-handler");
const {
  uploadPhotographerProfile: uploadProfile,
} = require("../../commons/middlewares/multer.middleware");
const {
  uploadPhotographerPortfolio: uploadPortfolio,
} = require("../../commons/middlewares/multer.middleware");

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
    const filters = req.query;
    // console.log(req);
    console.log(filters);
    // filter
    const result = await photographers.findAll(filters);
    console.log("resuuuult", result);
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
  "/:id/",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await photographers.update(id, req.body);
    console.log("result===", result);
    res.json(result);
  })
);

//single profile
router.patch(
  "/profilepicture/:id",
  uploadProfile.single("profilePicture"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log("img --ph.CONTROLLER====", req.file);
    const result = await photographers.update(id, {
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
    const result = await photographers.findOne(id);
    // const image = URL.createObjectURL(result.profilePicture);
    // console.log(result.profilePicture);
    // console.log("result===", image);
    if (result.profilePicture) {
      res.sendFile(result.profilePicture);
    }
  })
);

//portfolio
router.patch(
  "/portfolio/:id",
  uploadPortfolio.array("portfolio", 15),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    let uploaded = req.files;
    let paths = uploaded.map((obj) => obj.path);

    console.log("img --ph.CONTROLLER====", req.files);
    console.log("pathhhh --ph.CONTROLLER====", paths);
    const result = await photographers.update(id, {
      portfolio: paths,
    });

    console.log("result===", result);
    res.json(result);
  })
);

router.get(
  "/portfolio/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await photographers.findOne(id);
    // const image = window.URL.createObjectURL(result.portfolio);
    console.log(result.portfolio);
    console.log("result===", result);

    if (result.portfolio.length) {
      let photos = [];
      for (let i = 0; i < result.portfolio.length; i++) {
        // console.log("testingg", result.portfolio[i]);
        photos.push(result.portfolio[i]);
        // res.links(result.portfolio[i]);
      }
      // res.json(photos);
      // console.log("testingg", res.sendFile(result.portfolio));
      // res.sendFile(result.portfolio[0]);
      res.send(result.portfolio.join("*"));
    }
  })
);

module.exports = router;

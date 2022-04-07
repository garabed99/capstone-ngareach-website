const express = require("express");
const router = express.Router();
const clients = require("./client.service");
const asyncHandler = require("express-async-handler");


router.post(
  "/",
  asyncHandler(async (req, res) => {
    const body = req.body;
    const result = await clients.create(body);
    console.log(result);
    res.send(result);
  })
);


// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const query = req.query;
//     const result = await clients.findAll(query);
    
//     res.send(result);
//   })
// );

// router.get("/", (req, res) => {
//   res.send("hello world");
// });

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await clients.findOne(id);
    res.send(result);
  })
);

module.exports = router;

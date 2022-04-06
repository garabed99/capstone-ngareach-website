const express = require("express");
const router = express.Router();
const clients = require("./client.service");
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(async (req, res) => {
    const query = req.query;
    const result = await clients.findAll(query);
    res.json(result)
}))

router.get("/:id", asyncHandler(async (req, res) => {
    const {id} = req.params;
    const result = await clients.findOne(id);
    res.json(result)
}))

router.post("/", asyncHandler(async (req, res) => {
    const body = req.body;
    const result = await clients.create(body);
    console.log(result);
    res.status(201).json(result);
}))

module.exports = router;
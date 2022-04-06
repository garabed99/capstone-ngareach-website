const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;


const app = express();
const clients = require('./src/users/clients/client.controller');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/clients", clients)


app.listen(port, () => {
    console.log(`Server is up and listening on ${port} 🚀`);
  });
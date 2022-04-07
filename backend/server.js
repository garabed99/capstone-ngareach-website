const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const connectDB = require('./config/db')
const clients = require('./src/users/clients/client.controller');
const photographers = require('./src/users/photographers/photographer.controller');


const app = express();
connectDB()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/clients", clients)
app.use("/photographers", photographers)



app.listen(port, () => {
    console.log(`Server is up and listening on ${port} 🚀`);
  });
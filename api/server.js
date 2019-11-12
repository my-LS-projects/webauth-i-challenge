const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const usersRouter = require('../database/users/users-router')

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', usersRouter);

server.get("/", (req, res) =>
res.status(200).send("<h1>Server is up and running...</h1>")
);


module.exports = server;

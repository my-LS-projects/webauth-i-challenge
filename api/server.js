const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const session = require("express-session");

const usersRouter = require("../database/users/users-router");

const sessionConfiguration = {
  name: "yuh",
  secret: process.env.COOKIE_SECRET || "when ur moms ur dad",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));
server.use("/api/auth", usersRouter);

server.get("/", (req, res) => {
  req.session.name = "viper";
  res.status(200).json({ api: `Hello, ${req.session.name}` });
});

module.exports = server;

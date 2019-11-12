const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./users-model.js");

router.get("/users", (req, res) => {
  Users.find()
    .then(users => res.status(200).json(users))
    .catch(error =>
      res.status(500).json({ message: "Users could not be retrieved" })
    );
});

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.register(user)
    .then(completed => {
      res.status(201).json({ message: "User registered!" });
    })
    .catch(error => {
      res.status(500).json({ error: "Could not register user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findByUsername({ username })
    .first()
    .then(user => {
      user && bcrypt.compareSync(password, user.password)
        ? res.status(200).json({ message: `Welcome back, ${user.username}` })
        : res,
        status(401).json({ error: "Invalid username and/or password" });
    })
    .catch(error => res.status(500).json({ error: "Error logging in" }));
});

module.exports = router;

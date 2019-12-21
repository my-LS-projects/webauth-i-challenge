const db = require("../dbconfig.js");

module.exports = {
  register,
  find,
  findByUsername,
  findById,
};

function register(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db.select('id', 'username').from("users");
}

function findByUsername(username) {
  return db('users').select('id', 'username', 'password').where(username);

}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

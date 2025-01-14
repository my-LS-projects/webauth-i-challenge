module.exports = (req, res, next) => {
  req.session && req.session.username
    ? next()
    : res
        .status(401)
        .json({ message: "You are not authorized to view this page" });
};

const router = require("express").Router();
const User = require("../../models/User");

router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save((err) => {
      if (err) console.error(err);
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.logged_in = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!dbUserData) {
      res.status(400).json({ message: "Incorrect User or Password!" });
      return;
    }
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect User or Password!" });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.logged_in = true;

      res.status(200).json({ user: dbUserData, message: "You are logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

//==========================REQUIRES=============================================
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

//========================READ ALL USERS==========================================
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [Post, Comment],
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//==========================READ ONE USER=========================================
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [Post, Comment],
      attributes: { exclude: ["password"] },
    });
    if (!userData)
      return res
        .status(400)
        .json({ message: `There is no user by the ID of ${req.params.id}` });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//==========================CREATE NEW USER=======================================
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//==============================EXPORTS===========================================
module.exports = router;

const router = require("express").Router();
const { Post, User } = require("../models");

//GET all posts on /dashboard
router.get("/", async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: {
        model: User,
      },
    });
    const posts = postsData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET /dashboard/newPost
router.get("/newPost", async (req, res) => {
  res.render("create-post", { logged_in: req.session.logged_in });
});

//GET /dashboard/editPost/:id
router.get("/editPost/:id", async (req, res) => {
  try {
    let postsData = await Post.findOne({
      where: { id: req.params.id },
      attributes: { include: ["id", "title", "content", "user_id"] },
      include: {
        model: User,
        attributes: ["id", "username"],
      },
    });
    postsData = postsData.get({ plain: true });
    res.render("edit-post", { postsData, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET /dashboard.deletePost/:id
router.get("/deletePost/:id", async (req, res) => {
  try {
    let postsData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.render("dashboard", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

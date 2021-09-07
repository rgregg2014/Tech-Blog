//==============================REQUIRES==========================================
const router = require("express").Router();
// const { Post, User, Comment } = require("../models");

//==========================HOMEPAGE ROUTES=======================================

router.get("/", async (req, res) => {
  // find all Experience
  //   const postData = await Post.findAll({
  //     include: [
  //       {
  //         model: Comment,
  //       },
  //       { model: User, attributes: { exclude: ["password"] } },
  //     ],
  //   }).catch((err) => res.status(500).json(err));

  //   const posts = await postData.map((post) => post.get({ plain: true }));

  res.render("home");
});

//============================DASHBOARD ROUTES====================================

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

//===========================LOGIN/LOGOUT ROUTES==================================

router.get("/login", (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect("/");
  //     return;
  //   }
  res.render("login");
});

router.get("/signup", (req, res) => res.render("signup"));

// ==================================EXPORTS======================================
module.exports = router;

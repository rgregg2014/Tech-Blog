const router = require("express").Router();
const postsRoutes = require("./posts-routes");
const userRoutes = require("./user-routes");

router.use("/posts", postsRoutes);
router.use("/users", userRoutes);

module.exports = router;

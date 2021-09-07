//===========================REQUIRES=============================================
const router = require("express").Router();
const { Post, User } = require("../../models");

//========================READ ALL POSTS==========================================
router.get("/", async (req, res) => {
  const postData = await Post.findAll({
    include: [{ model: User, attributes: { exclude: ["password"] } }],
  });
  res.json(postData);
});

//=========================CREATE NEW POST========================================
router.post("/", async (req, res) => {
  let { title, content } = req.body;

  const newPost = await Post.create({
    title,
    content,
    user_id: req.session.userId,
  }).catch((err) => res.status(500).json(err.message));
  res.redirect("/dashboard");
});

//============================UPDATE POST=========================================
router.put("/:id", async (req, res) => {
  console.log(req.body);
  const updatePost = await Post.update(
    {
      content: req.body.postContent,
    },
    {
      where: { id: req.params.id },
    }
  ).catch((err) => res.status(500).json(err));
  return res
    .status(200)
    .json({ message: "Your Post was updated successfuly." })
    .send();
});

//==============================DELETE POST=======================================
router.delete("/:id", async (req, res) => {
  const deletedPost = await Post.destroy({
    where: { id: req.params.id },
  });
  if (!deletedPost) {
    return res.status(404).json({
      error_message: `Cannot be deleted because the Post with ID ${req.params.id} does not exist.`,
    });
  }
  return res.status(200).json(deletedPost).send().end();
});

//=================================EXPORTS========================================
module.exports = router;

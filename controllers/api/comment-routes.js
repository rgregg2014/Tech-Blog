//==========================REQUIRES==============================================
const router = require("express").Router();
const { Comment, User } = require("../../models");

//=======================READ ALL COMMENTS========================================
router.get("/", async (req, res) => {
  const commentData = await Comment.findAll({
    include: [{ model: User, attributes: { exclude: ["password"] } }],
  });
  res.json(commentData);
});

//=======================CREATE NEW COMMENT=======================================
router.post("/:id", async (req, res) => {
  const newComment = await Comment.create({
    comment: req.body.comment,
    user_id: req.session.userId,
    post_id: req.params.id,
  }).catch((err) => res.status(500).json(err.message));
  res.status(200).redirect("/");
});

//=========================UPDATE COMMENT=========================================
router.put("/:id", async (req, res) => {
  const updateCommentData = await Comment.update(req.body, {
    where: { id: req.params.id },
  }).catch((err) => res.status(500).json(err));
  if (!updateCommentData[0]) {
    return res.status(404).json({
      error_message: `No update done since Comment ID ${req.params.id} doesn't exist. Please double check your Comment ID.`,
    });
  }
  res.status(200).json({ message: "Your Comment was updated successfuly." });
});

//========================DELETE COMMENT==========================================
router.delete("/:id", async (req, res) => {
  const deletedComment = await Comment.destroy({
    where: { id: req.params.id },
  });
  if (!deletedComment) {
    return res.status(404).json({
      error_message: `Cannot be deleted because the Comment with ID ${req.params.id} does not exist.`,
    });
  }
  res
    .status(200)
    .json({ message: "The Comment has successfully been deleted." });
});

//=============================EXPORTS============================================
module.exports = router;

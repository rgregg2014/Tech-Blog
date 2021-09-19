const router = require("express").Router();

router.post("/", async (req, res) => {
  const temp = req.session.loggedIn;
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

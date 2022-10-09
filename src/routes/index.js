var express = require("express");
var router = express.Router();
const {
  createArticle,
  getAllArticles,
  getArticle,
  updateArticle,
  deleteArticle
} = require("../controllers/articles");

const {
  createComments,
  getAllCommentsByArticle,
  deleteComment,
  getCommentById,
  updateComment
} = require("../controllers/comments");

router.get("/", function (req, res, next) {
  return res.status(200).json({ message: "Index" });
});

router.route("/articles").get(getAllArticles).post(createArticle);
router.route("/articles/:id/comments").post(createComments).get(getAllCommentsByArticle);
router.route("/articles/:id/comments/:commentId").delete(deleteComment).get(getCommentById).patch(updateComment);
router.route("/articles/:id").get(getArticle).patch(updateArticle).delete(deleteArticle);

module.exports = router;

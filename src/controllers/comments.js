const Comments = require("../models/comments");
const Articles = require("../models/articles");
const { BadRequestError, NotFoundError } = require("../errors/index");

const createComments = async (req, res) => {
  try {
    const {
      params: { id: articleId },
      body: { text },
    } = req;

    const comment = new Comments({
      text: text,
      article: articleId,
    });

    await comment.save();

    const articleRelated = await Articles.findById(articleId);
    articleRelated.comments.push(comment);

    await articleRelated.save(function (err) {
      if (err) {
        throw new Error(err);
      }
    });

    res.status(200).json({ articleRelated });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllCommentsByArticle = async (req, res) => {
  try {
    const {
      params: { id: articleId },
    } = req;

    const comments = await Articles.findOne({ _id: articleId }).populate(
      "comments"
    );
    if (!comments) {
      throw new NotFoundError(`No Comments with id ${articleId}`);
    }
    res.status(200).json({ comments });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const {
      params: { id: articleId, commentId: commentId },
    } = req;

    const article = await Articles.findByIdAndUpdate(
      articleId,
      {
        $pull: { comments: commentId },
      },
      { new: true }
    );

    if (!article) {
      throw new NotFoundError(`No Article with id ${articleId}`);
    }

    const comment = await Comments.findByIdAndDelete(commentId);

    if (!comment) {
      throw new NotFoundError(`No Comment with id ${articleId}`);
    }
    res.status(200).json({ comment });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateComment = async (req, res) => {
  try {
    const {
        params: { id: articleId, commentId: commentId },
        body: { text },
      } = req;
    
      const comment = await Comments.findByIdAndUpdate(
        { _id: commentId },
        req.body,
        { new: true, runValidators: true }
      );
    
      if (!comment) {
        throw new NotFoundError(`No Comment with id ${articleId}`);
      }
      res.status(200).json({ comment });
  } catch (error) {
    res.status(400).json({ error });
  }

};

const getCommentById = async (req, res) => {
  try {
    const {
      params: { id: articleId, commentId: commentId },
    } = req;

    const comment = await Comments.findById(commentId);

    if (!comment) {
      throw new NotFoundError(`No Comment with id ${articleId}`);
    }
    res.status(200).json({ comment });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  createComments,
  getAllCommentsByArticle,
  deleteComment,
  getCommentById,
  updateComment
};

const Articles = require("../models/articles");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getAllArticles = async (req, res) => {
  try {
    const articles = await Articles.find({}).sort("createdAt");
    res.status(200).json({ articles, count: articles.length });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const createArticle = async (req, res) => {
  try {
    const { body } = req;
    const newArticle = await Articles.create(body);
    res.status(201).json({ newArticle });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const getArticle = async (req, res) => {
  try {
    const {
      params: { id: articleId },
    } = req;

    const article = await Articles.findOne({
      _id: articleId,
    });
    if (!article) {
      throw new NotFoundError(`No article with id ${articleId}`);
    }
    res.status(200).json({ article });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateArticle = async (req, res) => {
  try {
    const {
      body: { content, title, author },
      params: { id: articleId },
    } = req;

    if (content === "" || title === "" || author === "") {
      throw new BadRequestError("content or title fields cannot be empty");
    }
    const article = await Articles.findByIdAndUpdate(
      { _id: articleId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!article) {
      throw new NotFoundError(`No article with id ${articleId}`);
    }
    res.status(200).json({ article });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const {
      params: { id: articleId },
    } = req;
  
    const article = await Articles.findByIdAndRemove({
      _id: articleId,
    });
    if (!article) {
      throw new NotFoundError(`No article with ${articleId}`);
    }

    res.status(200).send({ article, message: "deleted succesfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle
};

// posts.js - Post routes

const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { upload, handleMulterError } = require('../middleware/upload');
const { validatePost, validateComment } = require('../utils/validators');

// @route   GET /api/posts
router.get('/', getPosts);

// @route   GET /api/posts/:id
router.get('/:id', getPost);

// @route   POST /api/posts
router.post(
  '/',
  protect,
  upload.single('featuredImage'),
  handleMulterError,
  validatePost,
  createPost
);

// @route   PUT /api/posts/:id
router.put(
  '/:id',
  protect,
  upload.single('featuredImage'),
  handleMulterError,
  updatePost
);

// @route   DELETE /api/posts/:id
router.delete('/:id', protect, deletePost);

// @route   POST /api/posts/:id/comments
router.post('/:id/comments', protect, validateComment, addComment);

module.exports = router;


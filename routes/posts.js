const express = require("express");
const router = express.Router();
const Post = require('../models/Post.js');
const PostController = require('../controllers/PostController.js')

// Create a post
router.post("/create", PostController.create);

// Get all posts
router.get('/', PostController.getPosts);

router.get('/postsWithPagination', PostController.getPostsWithPag)

// Get post by Id
router.get('/id/:_id', PostController.getPostById)

// Get post by title
router.get('/title/:title', PostController.getPostByTitle);

// Update title
router.put('/id/:_id', PostController.updateTitle);

// Delete post
router.delete('/id/:_id', PostController.deletePost);

module.exports = router; 
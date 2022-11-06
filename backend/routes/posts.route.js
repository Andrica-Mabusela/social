const express = require('express');
const postController = require('../controllers/posts.controller').PostController;

// CREATE AN EXPRESS ROUTER TO GET THE AUTH ROUTES
const router = express.Router()

router.post('/create', postController.create);

router.delete('/remove/:postId', postController.remove);

router.get('/', postController.viewAll);
router.get('/:postId', postController.viewOne);
router.put('/:postId', postController.updatePost);

module.exports = router

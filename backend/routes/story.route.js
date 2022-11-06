const express = require('express');
const storyController = require('../controllers/stories.controller').StoryController;

// CREATE AN EXPRESS ROUTER TO GET THE STORY ROUTES
const router = express.Router()



router.post('/', storyController.create);

router.get('/', storyController.viewAll);

router.get('/:storyId', storyController.viewOne);

router.delete('/:storyId', storyController.remove);


module.exports = router;
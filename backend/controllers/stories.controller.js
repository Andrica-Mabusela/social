const conn = require('../config/db.config');

const Story = require('../Models/Story.model');

module.exports.StoryController = {
    create: async (req, res) => {
        try {
            const { caption, mediaurl } = req.body;

            // SYNC THE USER MODEL TO THE USERS TABLE
            Story.sync({ alter: true });

            if( caption == null && mediaurl == null ){
                throw new Error('No story provided, Failed to create story');
            }

            // Test connection to database
            await conn.authenticate();

            // Create a Story
            const story = await Story.create(req.body); 
            
            // if( story && ){

            // }
            console.log('STORY:', story);
            res.status(200).json(story);
        }catch(error) {
            console.log(error.message);
            res.status(500).json(error.message);
        }
    },

    viewAll: async (req, res) => {
         try {
            
        }catch(error) {

        }
    },

    viewOne: async (req, res) => {
        try {
            
        }catch(error) {

        }
    },

    remove: async (req, res) => {
        try {
            
        }catch(error) {

        }
    }
}
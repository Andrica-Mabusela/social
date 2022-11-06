const conn = require('../config/db.config');

// Models
const Post = require('../Models/Post.model');

module.exports.PostController = {

    create: async (req, res) => {
        
       try {
            const { caption, file } = req.body;

            // Test connection to the database
            await conn.authenticate();
            console.log('connection to db has been established successfully!');

            // Sync the model to the Posts table
            Post.sync({ alter: true });

            if ( caption == null && file == null ) {
                throw new Error('Your Post Does Not Have Information.');
            }

           // Save the file  to cloudinary.
           if( file ) {
               const result = await cloudinary.uploader.upload(req.file.path);
               req.body.imgUrl = result.public_id;
           }

            // Create a post
            const post = await Post.create(req.body);

            res.json(post);

        } catch(error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    },

    remove: async (req, res) => {
        try {

            const { postId } = req.params
            console.log('The POST ID:*****', postId);
            // Test connection to db
            await conn.authenticate();

            // check if record exists in the posts table
            const post = await Post.findAll({
                where: { 'postid': postId },
                limit: 1
             });
            console.log('****', post[0].dataValues);

            if( post[0].dataValues ){
                await Post.destroy({
                    where: {'postid': postId}
                })
            }

            res.status(200).json({message: 'Post Deleted Successfully!', post});
        } catch(error) {
            console.log('The ERROR', error);
            res.status(500).json({message: error.message});
        }
    },

    viewAll: async (req, res) => {

        try {

            //Test connection to database
            await conn.authenticate();

            // Get all Posts 
            const posts = await Post.findAll({});

            if(posts.length > 0) {
                res.status(200).json(posts);
            } else {
                throw new Error('There are no posts available');
            }

        } catch(error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    },

    viewOne: async (req, res) => {
        try {

            // GET post Id
            const { postId } = req.params;

            // Test connection to the database
            await conn.authenticate();

            const post = await Post.findAll({
                where: {'postid': postId},
                limit: 1
            });
        
            if ( post.length === 0 ){
                throw new Error('Cannot Find Your Post');
            }

            res.status(200).json(post[0].dataValues);

        } catch(error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    },

    updatePost: async (req, res) => {
        try{
            const { postId } = req.params;
            // Test connection to database
            const post = await Post.findAll({
                where: {'postid': postId},
                limit: 1
            });

            console.log('Post***', post);
            
            if(post && post.length == 0) {
                
                throw new Error('Post does not Exist');
            }

           
            // Post exists, therefore update post
            const updatedPostQuery = await Post.update({...req.body}, {
                where: {
                    postid: postId
                }
            });

            let updatedPost;
            if( updatedPostQuery ) {
                updatedPost = await Post.findAll({
                    where: {'postid': postId},
                    limit: 1
                })
            }

            if( updatedPost && updatedPost.length == 0){
                throw new Error('Something went wrong with updating your post.');
            }

            console.log('updated post***', updatedPost);

            res.status(200).json(updatedPost[0].dataValues);

        } catch(error){
            console.log(error);
            res.status(500).json(error.message);
        }
    }
};

const Post = require('../models/Post.js');

const PostController = {
    async create(req, res) {
        const { title, body} = req.body;
        
        if(!title || !body) {
            return res.status(400).send({message: "Los campos title y body no pueden estar vacios"})
        }

        try{
            const post = await Post.create(req.body);
            res.status(201).json(post);
        } catch (error) {
            console.log(error);
            res
                .status(500)
                .send({message: "There was a problem trying to create a post"})
    
        }
    },

    async getPosts(req,res) {
        try{

            const posts = await Post.find();
            res.json(posts);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "There was a problem trying to find all posts" });
        }
    },

    async getPostsWithPag(req,res) {
        const page = parseInt(req.query.page) || 1;
        try {
            const posts = await Post.find().skip((page - 1) * 10).limit(10)
            res.json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "There was a problem trying to find all posts" });
        }
    },

    async getPostById(req,res) {
        try {
            const id = req.params._id;
            const post = await Post.findById(id);
            res.json(post)
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "There was a problem trying to find the post with _id: " +
                    req.params._id
            });
        }
    },

    async getPostByTitle(req,res) {
        try{
            const titlePost = req.params.title;
            const post = await Post.findOne({title: titlePost})
            res.json(post);
        } catch {
            console.log(error)
            res.status(500).send({ message: "There was a problem trying to find post by title" });
        }
    },

    async updateTitle(req,res) {
        try{
            const id = req.params._id;
            const updateTitlePost = await Post.findByIdAndUpdate(
                id, {
                    ...req.body
                }, {new: true}
            )
            res.json(updateTitlePost)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "There was a problem trying to update the post with _id: " +
                    req.params._id
            });
        }
    },

    async deletePost(req,res) {
        try{
            const id = req.params._id
            const deletedPost = await Post.findByIdAndDelete(id)
            if (!deletedPost) {
                return res.status(404).send({message: 'Post with that id not found'})
            }
            res.json({message: 'Post deleted successfully', deletedPost})
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "There was a problem trying to delete a post" });
        }
    }
}


module.exports = PostController;
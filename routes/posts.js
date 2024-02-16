const express = require("express");
const router = express.Router();
const Post = require('../models/Post.js')

router.post("/create", async(req, res) => {
    try{
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({message: "Trouble too create a post"})

    }
});

router.get('/', async(req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "There was a problem trying to find posts" });
    }
})

router.get('/id/:_id', async(req,res) => {
    try {
        const id = req.params._id;
        const post = await Post.findById(id);
        res.json(post)
    } catch (error) {
        console.log(error)
    }
})

//Endpoint para buscar una publicación por su titulo        
router.get('/title/:title', async(req,res) => {
    try{
        const titlePost = req.params.title;
        const post = await Post.findOne({title: titlePost})
        res.json(post);
    } catch {
        console.log(error)
        res.status(500).json({ message: "There was a problem trying to find post by title" });
    }
})

router.put('/id/:_id', async(req,res) => {
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

    }
})

router.delete('/id/:_id', async(req,res) => {
    try{
        const id = req.params._id
        const deletedPost = await Post.findByIdAndDelete(id)
        if (!deletedPost) {
            return res.status(404).json({message: 'Post with that id not found'})
        }
        res.json({message: 'Post deleted successfully', deletedPost})
    } catch (error) {
        console.log(error)

    }
})

module.exports = router; 
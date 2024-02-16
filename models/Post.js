const mongoose = require('mongoose');
const { stringify } = require('querystring');

const PostSchema = new mongoose.Schema(
    {
        title: String,
        body: String
    },
    { timestamps: true}
)

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
const request = require('supertest');
const app = require('../index.js');
const Post = require('../models/Post.js');

describe("post", () => {
    const post = {
        title: "titulo 7",   
        body: "body 7"
    };
    test("create post", async() => {
        let postsCount = await Post.countDocuments({});
        expect(postsCount).toBe(0);
        resPost = (await request(app).post('/create')).send(post).expect(201);
        postsCount = await Post.countDocuments({});
        expect(postsCount).toBe(1);
        expect(resPost.body._id).toBeDefined();
        expect(resPost.body.createdAt).toBeDefined();
        expect(resPost.body.updatedAt).toBeDefined();
    });
    afterAll(() => {
        return Post.deleteMany();
    });
})
const request = require('supertest');
const app = require('../index.js');
const Post = require('../models/Post.js');

describe("post", () => {
    const post = {
        title: "titulo 7",   
        body: "body 7"
    };
    it("create post", async() => {
        let postsCount = await Post.countDocuments({});
        expect(postsCount).toBe(0);
        resPost = await request(app).post('/create').send(post).expect(201);
        postsCount = await Post.countDocuments({});
        expect(postsCount).toBe(1);
        expect(resPost.body._id).toBeDefined();
        expect(resPost.body.createdAt).toBeDefined();
        expect(resPost.body.updatedAt).toBeDefined();
    });
    afterAll(() => {
        return Post.deleteMany();
    });
});

describe("get", () => {
    let response;
    beforeEach(async () => {
        response = await request(app).get('/').send();
    })

    it("get all posts", async() => {
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('json');
    })

    it('get array of posts', async () => {
        expect(response.body).toBeInstanceOf(Array);
    })
})
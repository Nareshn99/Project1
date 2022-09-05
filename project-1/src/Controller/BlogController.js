const authorModel = require("../models/AuthorModel")
const blogModel = require("../models/BlogModel")
const mongoose = require('mongoose');
const moment = require('moment');

const createBlog = async function (req, res) {
    try {
        let authorId = req.body.authorId
        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(400).send({ status: false, msg: "AuthorId is not valid,please enter valid ID" })
        }

        let authorbyid = await authorModel.findById(authorId)
        if (!authorbyid) {
            return res.status(400).send({ status: false, msg: "Author is not exist" })
        }
        let blog = req.body
        if (blog.isDeleted == true) { blog["deletedAt"] = Date.now() }
        if (blog.isPublished == true) { blog["publishedAt"] = Date.now() }
        let blogCreated = await blogModel.create(blog)
        res.status(201).send({ data: blogCreated })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}



const getBlogs = async function (req, res) {
    try {
        let byauthor = req.query.authorId;
        let bycategory = req.query.category;
        let bytags = req.query.tags;
        let bysubcategory = req.query.subcategory;
        let temp = req.query
        console.log(temp)
        let Blogs = await blogModel.find({$and: [temp]})
        //({$or:[{ $and: [{ isDeleted: false }, { isPublished: true }]},$or: [{ authorId: byauthor }, { category: bycategory }, { tags: bytags }, { subcategory: bysubcategory }]]} )
        res.status(201).send({ data: Blogs })
    }
    catch (error) {
        res.status(500).send({ error: error })
    }
}


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
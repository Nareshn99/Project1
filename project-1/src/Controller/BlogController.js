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



module.exports.createBlog = createBlog

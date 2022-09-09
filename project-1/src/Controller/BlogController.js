const authorModel = require("../models/AuthorModel")
const blogModel = require("../models/BlogModel")
const mongoose = require('mongoose');


const createBlog = async function (req, res) {
    try {
        let blog = req.body
        let alphabets = /^[A-Z a-z 0-9]{8,30}$/
        if (!blog.title) {
            return res.status(400).send({ status: false, msg: "provide blog title. it's mandatory" })
        }
        if (!alphabets.test(blog.title)) {
            return res.status(400).send({ status: false, msg: "blog title contains only string form" })
        }
        let checktitle = await blogModel.findOne({ title: blog.title })
        if (checktitle) {
            return res.status(400).send({ status: false, msg: "this title is already reserved" })
        }
        if (!blog.body) {
            return res.status(400).send({ status: false, msg: "provide blog body. it's mandatory" })
        }
        if (!alphabets.test(blog.body)) {
            return res.status(400).send({ status: false, msg: "blog body contains only string form" })
        }
        if (!blog.category) {
            return res.status(400).send({ status: false, msg: "please enter your blog category. it's mandatory" })
        }
        if (blog.isPublished) {
            if (typeof (blog.isPublished) !== "boolean") {
                return res.status(400).send({ status: false, msg: "contains only boolean value both isDeleted and isPablished" })
            }
        }
        if (!blog.authorId) {
            return res.status(400).send({ status: false, msg: "Please provide authorId. it's mandatory" })
        }
        if (!mongoose.Types.ObjectId.isValid(blog.authorId)) {
            return res.status(400).send({ status: false, msg: "AuthorId is not valid,please enter valid ID" })
        }
        let authorbyid = await authorModel.findById(blog.authorId)
        if (!authorbyid) {
            return res.status(400).send({ status: false, msg: "Author is not exist" })
        }
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
        let temp = req.query
        temp.isDeleted = false
        temp.isPublished = true
        let BlogsWithCond = await blogModel.find(temp)
        if (BlogsWithCond.length === 0) {
            return res.status(400).send({ status: false, msg: `blog not found` })
        }
        res.status(201).send({ data: BlogsWithCond })
    }
    catch (error) {
        res.status(500).send({ error: error })
    }
}

const updateblog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).send({ status: false, msg: "BlogId is not valid,please enter valid ID" })
        }
        let blog = await blogModel.findById(blogId)
        if (req.pass.authorId !== blog.authorId.toString()) {
            return res.status(403).send({ status: false, msg: "you are not authorised for this opretion" })
        }
        if (blog.isDeleted == true) {
            return res.status(404).send({ msg: "BlogId is not exists" })
        }
        let data = req.body;
        let titlealphabets = /^[A-Z a-z 0-9]{8,30}$/
        let bodyalphabets = /^[A-Z a-z 0-9]{10,2000}$/
        if (data.title == "") { return res.status(400).send({ status: false, msg: "blog body is empty" }) }
        if (data.title) {
            if (!titlealphabets.test(data.title)) return res.status(400).send({ status: false, msg: "title must contain only letters and first letter is capital" })
        }
        if (data.body == "") { return res.status(400).send({ status: false, msg: "blog body is empty" }) }
        if (data.body) {
            if (!bodyalphabets.test(data.body)) return res.status(400).send({ status: false, msg: "title must contain only letters and first letter is capital" })
        }
        let updateblog = await blogModel.findOneAndUpdate(
            { _id: blogId },
            { $set: { title: data.title, body: data.body, isPublished: true, publishedAt: new Date() }, $push: { tags: data.tags, subcategory: data.subcategory } },
            { new: true })
        res.status(200).send({ msg: "successfully updated", updateblog })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const DeleteBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let blog = await blogModel.findById(blogId)
        if (req.pass.authorId !== blog.authorId.toString()) {
            return res.status(403).send({ status: false, msg: "you are not authorised for this opretion" })
        }
        if (!blog) {
            return res.status(400).send({ msg: "this Blog already deleted" })
        }
        if (blog.isDeleted == false) {
            let blog = await blogModel.findOneAndUpdate(
                { _id: blogId },
                { $set: { isDeleted: true, deletedAt: new Date() } })
        }
        res.status(200).send({ msg: "Deleted successfully" })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteByQuery = async function (req, res) {
    try {
        let cond = req.query
        if (Object.keys(cond).length === 0) {
            return res.status(400).send({ status: false, msg: "kahana kya chahate ho" })
        }
        cond.isDeleted = false
        let deleted = await blogModel.updateMany(cond, { $set: { isDeleted: true } })
        let temp = deleted.modifiedCount.toString()
        if (temp == 0) {
            res.status(404).send({ status: false, msg: "blog not found " })
        } else {
            res.status(201).send({ status: true, msg: `${temp} blogs deleted` })
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateblog
module.exports.DeleteBlog = DeleteBlog
module.exports.deleteByQuery = deleteByQuery

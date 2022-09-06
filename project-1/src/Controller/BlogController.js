const authorModel = require("../models/AuthorModel")
const blogModel = require("../models/BlogModel")
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

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
        let temp = req.query
        temp.isDeleted = false
        temp.isPublished = true
        let BlogsWithCond = await blogModel.find(temp)
        res.status(201).send({ data: BlogsWithCond })
    }
    catch (error) {
        res.status(500).send({ error: error })
    }
}

const deleteByQuery = async function(req,res){
    try{
        let cond = req.query
        cond.isDeleted=false
        let deleted = await blogModel.updateMany(cond,{$set:{isDeleted:true}})
        let temp = deleted.modifiedCount.toString()
        console.log(cond)
        if(temp==0){
            res.status(404).send({status: false,msg: "No usch blog exists"})
        }else{
            res.status(201).send({status: true,msg:`${temp} blogs deleted`})
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteByQuery = deleteByQuery

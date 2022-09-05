const { Router } = require('express')
const express = require('express')
const router = express.Router()
const AuthorController= require("../Controller/AuthorController")
const BlogController= require("../Controller/BlogController")

router.get("/test-me",function(req,res){
    res.send("maari api testing")
})
router.post("/createAuthor", AuthorController.createAuthor)
router.post("/createBlog", BlogController.createBlog)
router.get("/filteredBlogs", BlogController.getBlogs)
module.exports = router
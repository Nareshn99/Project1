const { Router } = require('express')
const express = require('express')
const router = express.Router()
const AuthorController= require("../Controller/AuthorController")
const BlogController= require("../Controller/BlogController")
//const mw=require("../commonmw/auth")

router.get("/test-me",function(req,res){
    res.send("maari api testing")
})
router.post("/author", AuthorController.createAuthor)
router.post("/createBlog", BlogController.createBlog)
router.get("/filteredBlogs", BlogController.getBlogs)
router.put("/blogs/:blogId", BlogController.updateBlog)
router.delete("/blogs/:blogId", BlogController.DeleteBlog)
router.delete("/blogs", BlogController.deleteByQuery)

module.exports = router
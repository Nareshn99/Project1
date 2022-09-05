const AuthorModel = require("../models/AuthorModel.js")

createAuthor = async function(req,res){
    try{
        let authorData = await AuthorModel.create(req.body)
        res.status(201).send(authorData)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

module.exports.createAuthor = createAuthor

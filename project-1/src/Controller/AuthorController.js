const authorModel= require('../models/AuthorModel')

const createAuthor = async function(req,res){
    try{
        let authorData = await authorModel.create(req.body)
        res.status(201).send(authorData)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

module.exports.createAuthor = createAuthor

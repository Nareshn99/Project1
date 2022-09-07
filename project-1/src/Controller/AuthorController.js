const authorModel = require('../models/AuthorModel')
const jwt = require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
        let body= req.body
        if(Object.keys(body).length === 0){
            res.status(400).send({status:false,msg:"plz provied author details"})
        }
        let authorData = await authorModel.create(req.body)
        res.status(201).send(authorData)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const authorlogin = async function (req, res) {
    try {
        let useraName = req.body.email;
        let password = req.body.password;

        let authorDetails = await authorModel.findOne({ email: useraName, password: password })
        if (!authorDetails) {
            return res.status(401).send({ status: false, error: "Emaild or the password is not correct" })
        }
        let token = jwt.sign(
            {
                authorId: authorDetails._id.toString(),
                fristBlog: "the moutain"
            }, "harikesh-9690-chaudhary-8958-jaat-2606-boy")
        res.setHeader('x-api-key', token)
        res.status(200).send({ status: true, token: token });
    } catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports.createAuthor = createAuthor
module.exports.authorlogin = authorlogin


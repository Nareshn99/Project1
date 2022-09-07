const jwt = require('jsonwebtoken')

const auth = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) {
            res.status(400).send({ err: "you are not login" })
        }
        let decodedtoken = jwt.verify(token, "harikesh-9690-chaudhary-8958-jaat-2606-boy")
        if (!decodedtoken) {
            res.status(403).send({ err: "this token invalid" })
        }
        req.pass = decodedtoken;
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.auth = auth
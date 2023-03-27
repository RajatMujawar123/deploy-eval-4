const jwt = require('jsonwebtoken')


const auth = async (req,res,next)=>{
    try {
        let token = req.headers.authorization
        if(!token){
            res.status(401).send({"msg": "Not Authorised"})
        }
        const isToken = await jwt.verify(token, "masai")
        if(!isToken){
            res.send({"msg": "Not Authorised"})
        }
        req.body.userId = isToken.userId
        next()
    } catch (error) {
        res.send({"msg":"something went wrong", error})
    }
}

module.exports = {
    auth
}
const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({error : "Unauthorized"})
    }

    const token = authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({error : "Token not found"})
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()

    } catch (error) {

        console.log(error)
        res.status(401).json({error : "Invalid Token"})
    }
}

const generateToken = (userDATA) =>{
    return jwt.sign(userDATA,process.env.JWT_SECRET, {expiresIn: 30})
}
module.exports = {jwtAuthMiddleware,generateToken}
require("dotenv").config()
const jwt = require("jsonwebtoken")


//validar el token que va en al cookie el cual se enviara automaticamente al hacer login
const authMiddleware = (req,res,next) =>{
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, (err,info)=>{
        if(err)  res.send(err);
        req.UserInfo= info;
        next();
    })
}

module.exports=  { authMiddleware }
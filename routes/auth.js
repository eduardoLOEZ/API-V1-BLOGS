require("dotenv").config()
const express = require("express")
const router = express.Router()
const { Register } = require("../controllers/auth")
const { Login } = require("../controllers/auth")
const { authMiddleware } = require("../middlewares/validateToken")
const { LogOut } = require("../controllers/auth")


//endpoints
router.post("/sign-up", Register)
router.post("/login", Login)

//ver perfil        midd  para la cookie
router.get('/profile', authMiddleware, (req, res) => {
    if(req.UserInfo){
        res.json({
            data: req.UserInfo
        })
    }else{
        res.send("no autorizado")
    }
   

   
});


//al hacer un logout se cierra la sesion con las cookies y al hacer otro GET al /profile 
//dara error ya que se cerro esa sesion y debe loguearse un usuario para generar otro token automatico.
router.post('/logout', LogOut)


module.exports = router

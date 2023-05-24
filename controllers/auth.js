const User = require("../models/User")
const { body, check, validationResult, cookie } = require("express-validator")
const bcrypt = require("bcrypt")
const { generateToken } = require("../helpers/generateToken")
const { validate_user } = require("../middlewares/validateRegister")
const { validateLogin } = require("../middlewares/validateLogin")


const Register = async (req, res) => {
    try {
        for (let i = 0; i < validate_user.length; i++) {
            await validate_user[i].run(req)
        }

        // Si hay errores de validación, los manejamos aquí
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, username, password } = req.body

        if (!(email && username && password)) {
            return res.status(400).send({ message: "no colocaste los datos de manera correcta o ninguno" })

        }

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        


        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hash(password, salt)

        const NewUser = await User.create({
            email,
            username,
            password: encryptedPassword
        })

        return res.json({ msg: "usuario creado!!", data: NewUser })

    } catch (error) {
        console.log(error)

    }
}



const Login = async (req, res) => {
    try {

        for (let i = 0; i < validateLogin.length; i++) {
            await validateLogin[i].run(req)
        }
        // Si hay errores de validación, los manejamos aquí
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { email, password } = req.body
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: 'Username or password are incorrect',
            });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                error: 'Username or password are incorrect',
            });
        }

        //generar token 
        const token =  generateToken({
            id: user.id,
            email: user.email,
            username: user.username
        })

        //enviar el token en las cookies
        res.cookie('token', token).json({
            msg: `inicio de seion correcto. Bienvenido ${user.username}`,
            id: user.id,
            username: user.username

        })
        
        //return res.status(201).json({msg: "inicio de sesion correcta", token, username:user.username})


    } catch (error) {
        console.log(error)

    }

}

//Cerrar la sesion
const LogOut = async (req,res)=>{
    res.clearCookie('token').status(200).json(`Logged out successfully!!`);

}

module.exports = {
    Register,
    Login,
    LogOut
}
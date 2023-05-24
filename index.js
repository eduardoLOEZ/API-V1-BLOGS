require("dotenv").config()
const PORT= process.env.PORT;
const {app} = require("./app")
const {dbConect} = require("./db/db")

dbConect();

app.listen(PORT,()=>{
    console.log("corriendo servidor")

})

//TODO: REGISTER AND LOGIN 
//TODO: CREATE A POST AND UPLOAD IMG 
//TODO: GENERATE TOKEN COOKIES 
//TODO: GET THE AUTHOR NAME FROM THE TOKEN AND ID DECODED
//TODO: DELETE A POST BY ID
//TODO: LOGOUT COOKIE SESSION
//PENDIENTE:  UPDATE PROFILE && POSTS BY ID 
//MEJORAR SEGURIDAD DE AUTH Y OTRA MANERA DE ALMACENAR ARCHIVOS(IMAGENES)
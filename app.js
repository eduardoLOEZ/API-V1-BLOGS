const express  = require("express")
const cors  = require("cors")
const cookieParser  = require("cookie-parser")
const router = require("./routes/auth")
const blogRouter = require("./routes/blogs")
const { errorHandler } = require("./middlewares/ErrorHandler")
const app = express()


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use("/public", express.static(`${__dirname}/uploads`))
app.use(errorHandler)
app.use(router)
app.use(blogRouter)



app.get("/",  (req,res) =>{
    res.send({
        msg:"API",
        version: "1.0.0",
        author: "eduardo "
    })
})


module.exports={app}



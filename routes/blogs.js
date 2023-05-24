const express = require("express")
const blogRouter = express.Router()
const { CreateBlog } = require("../controllers/CreateBlog")
const { GetAllBlogs } = require("../controllers/CreateBlog")
const upload = require("../middlewares/storage")
const { getBlogById } = require("../controllers/CreateBlog")
const  { deleteBlog } = require("../controllers/CreateBlog")

//Crear blogs con imagenes usando midd de multer 
blogRouter.post("/createBlog", upload.single("file"),  CreateBlog)
blogRouter.get("/blogs", GetAllBlogs)
blogRouter.get("/blog/:id", getBlogById)
blogRouter.delete("/delete/:id", deleteBlog)

module.exports=  blogRouter

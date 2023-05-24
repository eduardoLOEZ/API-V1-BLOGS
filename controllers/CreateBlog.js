require("dotenv").config()
const Post2 = require("../models/Post2")
const jwt = require("jsonwebtoken")


const CreateBlog = async (req, res) => {
  try {
    //obtiene el token de las cookies para que al crear el blog tenga datos como el author
    //se puede usar como midd
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token de autenticación inválido" });
      }

      //capturar el body
      const { title, summary, content } = req.body;
      let coverImage = null;

      //el file que es la img 
      if (req.file) {
        const { filename } = req.file;
        coverImage = filename;
      }

      //crear el nuevo post
      const newPost = new Post2({
        title,
        summary,
        content,
        coverImage,
        author: decoded.id.id,
      });

      if (req.file) {
        newPost.setImgUrl(coverImage);
      }

      await newPost.save();

      return res.json({
        msg: "Blog creado correctamente",
        data: newPost,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};





const GetAllBlogs = async (req, res) => {
  try {
    res.json(
      await Post2.find()
        .populate('author', ['username'])
        .select("title summary content")
        .sort({ createdAt: -1 })
        .limit(20)
    );
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });

  }
}


const getBlogById = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post2.findById(id).populate('author', ['username']);

  if(!postDoc){
    res.json({msg: "blog no encontrado"})
  }

  res.json(postDoc);
}



const deleteBlog = async (req,res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token de autenticación inválido" });
      }

      const { id } = req.params;

      const post = await Post2.findById(id)
      

      if (!post) {
        return res.status(404).json({ error: "No se encontró el post" });
      }

      if(post.author.toString() !== decoded.id.id){
        return res.status(403).json({msg: "no tienes permiso para eliminar este post!"})
      }

      await post.deleteOne({_id: id});
      return res.json({
        msg: "Blog eliminado correctamnete"
      })


    })


  
    } catch (error) {
      console.log(error)

    }
  
}




module.exports = { CreateBlog, GetAllBlogs, getBlogById, deleteBlog }
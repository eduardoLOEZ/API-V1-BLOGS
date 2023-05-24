const mongoose = require("mongoose");

const postSchema2 = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  imgurl: String, // Campo para almacenar el nombre del archivo adjunto
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});


postSchema2.methods.setImgUrl = function setImgUrl(filename){
  this.imgurl = `http://localhost:4000/public/${filename}`
}



const Post = mongoose.model("Post2", postSchema2);

module.exports = Post;

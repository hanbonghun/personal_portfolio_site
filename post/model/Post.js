var mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  contents: String,
  author : String,
  createAt: {
    type: Date,
    default: new Date(),
  }
});

module.exports = mongoose.model("Post", postSchema); 
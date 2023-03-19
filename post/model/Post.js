var mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  contents: String,
  create_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", postSchema); 
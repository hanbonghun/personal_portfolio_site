var mongoose = require("mongoose");
const article_schema = new mongoose.Schema({
  title: String,
  description: String,
  contents: String,
  create_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", article_schema);

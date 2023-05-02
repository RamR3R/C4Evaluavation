const mongoose = require("mongoose");


const articleSchema = mongoose.Schema({
    title: String,
    body: String,
    userName: String,
    userId: String,
    category: String,
    live: Boolean
},{
    versionKey:false
});

const ArticleModel = mongoose.model("article",articleSchema);

module.exports = ArticleModel;
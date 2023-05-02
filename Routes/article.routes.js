const express = require("express");
const articleRouter = express.Router();
const ArticleModel = require("../Models/article.model");
const jwt = require("jsonwebtoken");

articleRouter.get("/", async(req,res)=>{
    const data = await ArticleModel.find({userId:req.body.userId});
    res.send(data);
})

articleRouter.post("/add",async (req,res)=>{
    await ArticleModel.insertMany([req.body]);
    res.send({msg:"Article Created",data:req.body});
})

articleRouter.patch("/edit/:id",async (req,res)=>{
    await ArticleModel.findByIdAndUpdate(req.params.id,req.body);
    res.send({msg:"Article Updated",data:req.body});
})

articleRouter.delete("/rem/:id",async (req,res)=>{
    await ArticleModel.findByIdAndDelete(req.params.id);
    res.send({msg:"Article Deleted",data:req.body});
})

module.exports = articleRouter;
const express = require("express");
const userRouter = express.Router();
const UserModel = require("../Models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.get("/",async(req,res)=>{
    const data = await UserModel.find();
    res.send(data);
});

userRouter.post("/register",async(req,res)=>{
    const data = await UserModel.find({email:req.body.email})
    if(data.length>0)
    res.send("User already Exists!!");
    else
    {
        await bcrypt.hash(req.body.password, 5, function(err, hash) {
            if(err)
            res.send({"msg":err});

            req.body.password = hash;
            UserModel.insertMany([req.body]);
        });
        res.send("New User Registered");
    }
});

userRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.find({email:email});
    if(user.length>0)
    bcrypt.compare(password, user[0].password, function(err, result) {
        if(result)
        {
            const token = jwt.sign({userId:user[0]._id,userName:user[0].name}, 'masai');
            res.send({"token":token,"Status":"Logged IN"});
        }        
        else
        res.send("Incorrect Password")
    });
    else{
        res.send("Email Not found Register First to Login");
    }
});

module.exports = userRouter;
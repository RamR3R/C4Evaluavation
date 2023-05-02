const jwt = require("jsonwebtoken");

const auth = async(req,res,next)=>{
    var token = await req.headers.authorization;
    if(!token)
    res.send({msg:"Provide Jwt token to CRUD Articles"});
    else
    {
        token = token.split(" ");
        token = token[1];
        jwt.verify(token, 'masai', function(err, decoded) {
            if(decoded)
            {
                const {userName,userId} = decoded;
                req.body.userName = userName;
                req.body.userId = userId;
                next();
            }
            if(err)
            res.send({msg:"Invalid JWT Token"})
        });
    }
}


module.exports = auth;
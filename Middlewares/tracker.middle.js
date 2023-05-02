const address = require('address');
const timestamp = require("time-stamp");
const fs = require("fs");

const tracker = (req,res,next)=>{
    const ip = address.ip();
    const method = req.method;
    const url = req.url;
    const time = timestamp.utc('YYYY/MM/DD:mm:ss');
    console.log(ip,method,url,time);
    fs.appendFileSync("./logs.txt",`${ip}  ${method}  ${url}  ${time} \n`);
    next();
}   


module.exports = tracker;
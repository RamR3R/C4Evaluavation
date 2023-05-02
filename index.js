const express = require('express');
const app = express();
const connection = require("./db");
const userRouter = require("./Routes/user.routes");
const articleRouter = require('./Routes/article.routes');
const auth = require('./Middlewares/auth.middle');
const tracker = require('./Middlewares/tracker.middle');
const accessLimiter = require('./Middlewares/rateLimiter.middle');
require("dotenv").config();

app.use(express.json());

app.use("/users",tracker,userRouter);
app.use("/articles",auth,accessLimiter,articleRouter);

app.get('/', (req, res) => res.send('Welcome to Blogs'))

app.listen(process.env.PORT, async() => {
    try{
        await connection;
        console.log("Connected to db");
        console.log(`Server is running at PORT ${process.argv[2]}`)
    }
    catch(err)
    {
        console.log(err);
        console.log("Connection to DB failed");
    }
});
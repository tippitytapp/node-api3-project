// Custom MiddleWare
const CMW = require('./customMiddleWare.js')

// dependency imports
require('dotenv').config();
const express = require('express');
const colors= require('colors');
const morgan = require('morgan');
const helmet = require('helmet');
// define server and port
const server = express();
const port = process.env.PORT || 4401;
// 3rd Party MiddleWare
server.use(express.json());
server.use(CMW.logger);
server.use(helmet());
// router imports
const PostsRouter = require('./posts/postRouter.js');
const UsersRouter = require('./users/userRouter.js');


server.get('/', (req, res) => {
  res.status(200).json({
      status: "200 OK",
      message: "Welcome to Node API 3 - MiddleWare Day"
  });
});

server.use('/api/posts', PostsRouter)
server.use('/api/users', UsersRouter)

// server listen
server.listen(port, ()=>{
    console.log(`\nServer Listening on http://localhost:${port}\n`.rainbow.bold.underline)
});
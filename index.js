const express = require("express")
const helmet = require('helmet')
// const morgan = require("morgan")
const logger = require("./middleware/logger")
const welcome = require("./server")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express()
const port = 5000

server.use(express.json())
// server.use(morgan("combined"))
server.use(logger())
server.use(helmet())

server.use('/posts', postRouter)
server.use('/users', userRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "something went wrong, try again later"
    })
})

server.get("/", (req, res) => {
    res.json({
      message: "Welcome to my API",
    });
  });


server.listen(port, ()=>{
    console.log(`server started on port --> ${port}`)
})

const app = require("express")()
const server = require("http").createServer(app)
const io = require("socket.io")(server,{
    cors:{
        origin:"http://localhost:3000"
    }
})

console.log()

io.on("connection",(socket)=>{
    console.log("user connected");
    socket.on("send",(data)=>{
        console.log("data : ",data)
        socket.broadcast.emit("send",data)
        updata = data;
        updata.name = "You";
        console.log(updata)
        socket.emit("send",updata)
        // io.emit("send",data)
    })
    socket.on("user_joined",(name)=>{
        socket.broadcast.emit("user_joined",`${name} Joined`)
        socket.emit("user_joined",`welcome ${name}`)
    })
    socket.on("user_left",(name)=>{
        socket.broadcast.emit("user_left",`${name} Left`,name)
        socket.emit("user_left","You cant send messages anymore",name)
    })

})


server.listen(8000,()=>{
    console.log("server is running on port 8000");
})
const express=require('express')
let socketio=require('socket.io')
let path=require('path')
const http=require('http')
let ejs=require('ejs')
const app=express()
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))

const server=http.createServer(app)
let io=socketio(server)


io.on('connection',function(socket){
    socket.on("send-location",function(data){
io.emit('receive-location',{id:socket.id,...data})
    })
    // console.log('connected')
    socket.on("disconnect",function(){
        io.emit('user-disconnected',socket.id)
            })
})
app.get('/',(req,res)=>{
res.render('index')
})

server.listen(3030)
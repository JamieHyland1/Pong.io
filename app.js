
var paddle = require("./public/classes/Paddle.js")
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 

var players = [];
var paddles = [];
var ball = {"x":400,"y":200,"radius": 15};
var width = 800;
var height = 400;
var vx = 6;
var vy = 6;
var rightPaddle;
var leftPaddle;




app.use(express.static(__dirname + '/public')); 

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client) {  
	console.log('client connected');
});

server.listen(3000, function(){
  console.log('listening on *:3000');
}); 

io.on('connection', function(client) {
	console.log('client connected');
	
	io.clients(function(error, clients){
	  if (error) throw error;
		io.emit('clientList', clients);
	});
	
	client.on("PaddleMoveRight",function(data){
		console.log(data)
		rightPaddle = data;
		io.emit("RightMove", data)
	})
	client.on("PaddleMoveLeft",function(data){
		console.log(data)
		leftPaddle = data;
		io.emit("LeftMove",data)
		
	})
	setInterval(function()
	{
 	 Game()
	 io.emit("Ball", ball)
	},40)
});



function Game(){
ball.x += vx;
ball.y += vy;

if((ball.x+ball.radius) > width || (ball.x - ball.radius) < 0)
{
	vx = -vx;
	console.log("change X direction")

}
else if(ball.y > height || ball.y < 0)
{
	vy = -vy
	console.log("change Y direction")
}
}









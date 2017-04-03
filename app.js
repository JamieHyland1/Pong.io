//importing libraries
var paddle = require("./public/classes/Paddle.js")
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 

//setting up global instance variables
var players = [];
var paddles = [];
var ball = {"x":400,"y":200,"radius": 15};
var width = 800;
var height = 400;
var vx = 4;
var vy = 4;
var p1Score = 0;
var p2Score = 0;
var rightPaddle = {"x": 0, "y": 0};
var leftPaddle  = {"x": 0, "y": 0};
var clients = [];



//set express to look at the public folder for our html files
app.use(express.static(__dirname + '/public')); 

//send the index.html file to the user
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});
//log to the console that a client has connected to the server
io.on('connection', function(client) {  
	console.log('client connected');
});
//set the port number to listen for requests on
server.listen(3000, function(){
  console.log('listening on :3000');
}); 

io.on('connection', function(client) {
	console.log('client connected');
	//push the new client into the clients array
	clients.push(client)
	client.on('disconnect', function (id) {
        console.log( 'Disconnected' );
		console.log(id)
		p1Score = 0;
		p2Score = 0;
		for(var i =0; i < players.length; i++)
		{
		  if(players[i].id == id)
			{
				players.splice(0,1,id)
			}
		}
		});
	
	io.clients(function(error, clients)
	{
	  //send a list of all clients to every client
	  if (error) throw error;
		io.emit('clientList', clients);
	});
	//set the names for the players
	client.on("player1Name", function(data)
	{
		io.emit("p1Name", data)
	})
	client.on("player2Name", function(data)
	{
		io.emit("p2Name", data)
	})
	
	client.on("player",function(player)
	{
		players.push(player)
	})
	
	client.on("PaddleMoveRight",function(data)
	{ 
	//retrieve the x,y positions from the paddle on the client and set it to the right paddle
		rightPaddle = data;
	//send the right paddles x,y position to all other clients
		io.emit("RightMove", data)
	})
	client.on("PaddleMoveLeft",function(data){
	 //retrieve the x,y positions from the paddle on the client and set it to the left paddle
		leftPaddle = data;
	//send the left paddles x,y position to all other clients
		io.emit("LeftMove",data)
		
	})
   
	var x = setInterval(function()
	{
	 //check to see if two or more players are connected to the server	
	 if(players.length >= 2)
	 {
	 //call the game function and output the balls x,y position to all clients
	// console.log(players.length)
 	 Game()
	 io.emit("Ball", ball)
	 if(p1Score == 10 || p2Score == 10)
	 {
		 clearInterval(x)
	 }
	 }
	},50)
	
});


//this function will be used to calculate the ball's x,y position and to keep it consistent for all players
function Game(){
//set the speed of the ball
ball.x += vx;
ball.y += vy;

//check to see if the ball has collided with the right edge of the screen
if((ball.x+ball.radius) > width)
{
//place the balls position in the center, increase the score for the left player and output that score to all clients
	ball.x = 400;
	ball.y = 200;
	p1Score += 1;
	io.emit("player1Score", p1Score)

}
//check to see if the ball has collided with the left edge of the screen
else if((ball.x - ball.radius) < 0)
{
	//place the balls position in the center, increase the score for the right player and output that score to all clients
	ball.x  = 400;
	ball.y  = 200;
	p2Score += 1;
	io.emit("player2Score", p2Score)
}
//check to see if the ball has touched the top or bottom of the canvas
else if(ball.y > height || ball.y < 0)
{
	//reverse the y speed of the ball
	vy = -vy
}
//check to see if the ball has collided with the paddle
else if(ball.x-ball.radius < leftPaddle.x+leftPaddle.width && (ball.y - ball.radius) > leftPaddle.y && (ball.y - ball.radius) < (leftPaddle.y + leftPaddle.height))
{
	vx = - vx;
	vy = - vy;
}
//check to see if the ball has collided with the paddle
else if(ball.x+ball.radius > rightPaddle.x && ball.y+ball.radius > rightPaddle.y && ball.y < (rightPaddle.y+rightPaddle.height))
{
	vx = - vx;
	vy = - vy;
}
}









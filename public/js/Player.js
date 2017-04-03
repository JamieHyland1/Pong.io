//require("./public/classes/Paddle.js")
Player = function Player(name, paddle)
{
	this.name = name;
	this.id;
	this.score = 0;
	this.Padddle = paddle;
}
Player.prototype.updateScore = function(score)
{
	this.score += score;
}

function Ball (radius, color) {
  if (radius === undefined) { radius = 40; }
  if (color === undefined) { color = "#ff0000"; }
  this.x = 0;
  this.y = 0;
  this.color = color;
  this.velocity = Math.floor(Math.cos(25 * Math.PI / 180) * 2);
  this.yx = Math.floor(Math.cos(25 * Math.PI / 180) * 2);
  this.radius = radius;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.lineWidth = 0;
}

Ball.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  //x, y, radius, start_angle, end_angle, anti-clockwise
  context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
	//console.log(this.radius)
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

Ball.prototype.CheckPaddleLeft = function(paddle)
{
	var pH = paddle.y + paddle.height;
	if(this.x-this.radius < paddle.x && (this.y - this.radius) > paddle.y && (this.y - this.radius) < pH)
	{
		console.log("touched paddle")
		return true;
	}
	else
	{
	return false;
	}
}
Ball.prototype.CheckPaddleRight = function(paddle)
{
	var pH = paddle.y + paddle.height;
	console.log(pH)
	if(this.x+this.radius > paddle.x && this.y+this.radius > paddle.y && this.y < pH)
	{
		console.log("touched paddle")
		return true;
	}
	else
	{
	 return false;
	}
//
}



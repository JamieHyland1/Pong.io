function Paddle(color) {
	if (color === undefined) {
		color = "#f5f5f5";
	}
	this.x = 0;
	this.y = 0;
	this.width = 12;
	this.height = 50;
	this.lineWidth = 1;
	this.player1 = true;
	this.color = color
}

Paddle.prototype.draw = function (ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	if (this.lineWidth > 0) {
		ctx.stroke();
	}
	ctx.restore();
};
//Paddle.prototype.Controls = function (player1) {
//	var self = this;
//	if (player1) {
//		this.onKeyDown = function (pressEvent) {
//			if (pressEvent.keyCode == 40) {
//				
//				self.y + 5
//			}
//		}
//		this.onKeyUp = function (pressEvent) {
//			if (pressEvent.keyCode == 38) {
//				self.x + 5;
//			}
//		}
//	} else if (!player1) {
//		document.onkeydown = function (e) {
//			switch (e.keyCode) {
//			case 87:
//				this.x + 5;
//				break;
//			case 83:
//				this.y + 5;
//				break;
//			}
//		}
//	}
//}
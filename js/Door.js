function Door(roomPair, coords) {
	this.roomPair = roomPair;
	this.coords = coords;
	this.renderInit();
}

Door.prototype = {
	renderInit: function() {
		this.container = new createjs.Container();
		this.container.x = this.coords.x;
		this.container.y = this.coords.y;
		doorContainer.addChild(this.container);

		this.square = new createjs.Shape();
		this.square.graphics.beginFill("black").drawRect(0,0,20,20);
		this.container.addChild(this.square);
	}
}
function Item(objectPlacer,container, room) {
	this.container = container;
	this.room = room;

	this.container.on("mousedown", function(event) {
		event.stopImmediatePropagation();
		objectPlacer.container = this.container;
	}.bind(this))
}

function ObjectPlacer(room) {
	
}

ObjectPlacer.prototype.setRoom = function(room) {
	this.room = room;

	this.gridSize = 20;

	this.object = "bin";
	this.objects = ["chair","desk", "bin"]

	this.clearListeners();

	this.pressmove = this.room.container.on("pressmove", function(event) {
		console.log("??", this.container)
		this.move(event.localX, event.localY);
	}.bind(this))

	this.mousedown = this.room.container.on("mousedown", function(event) {
		this.newObject(event.localX, event.localY);
	}.bind(this))

	this.pressup = this.room.container.on("pressup", function(event) {
		this.objectPlaced(event.localX, event.localY);
	}.bind(this))
}

ObjectPlacer.prototype.clearRoom = function() {
	this.clearListeners();
}

ObjectPlacer.prototype.clearListeners = function() {
	this.room.container.off("mousedown", this.mousedown);
	this.room.container.off("pressmove", this.pressmove);
	this.room.container.off("pressup", this.pressup);
}

ObjectPlacer.prototype.getGridPosition = function(x,y) {
	x = Math.max(x,20); x = Math.min(x,this.room.width-20);
	y = Math.max(y,20); y = Math.min(y,this.room.height-20);
	var xGrid = Math.round(x / this.gridSize) * this.gridSize;
	var yGrid = Math.round(y / this.gridSize) * this.gridSize;
	return {x: xGrid, y: yGrid};
}

ObjectPlacer.prototype.move = function(x,y) {
	var legalCoords = this.getGridPosition(x,y);
	if (legalCoords) {
		if (this.container) {
			this.container.x = legalCoords.x;
			this.container.y = legalCoords.y;
		}
	}
}

ObjectPlacer.prototype.newObject = function(x,y) {
	if (this.container == null) {
		console.log("Placing " + this.object);
		var legalCoords = this.getGridPosition(x,y)
		if (legalCoords) {
			this.container = new createjs.Container();
			this.circle = new createjs.Shape();
			this.circle.graphics.beginFill("#000000").drawCircle(0, 0, 10);
			var editText = new createjs.Text(this.object, "16px Arial", "#FFF");
			editText.x = 20;
			editText.y = -10;
			this.container.addChild(editText);
			this.container.x = legalCoords.x;
			this.container.y = legalCoords.y;
			this.container.addChild(this.circle);
			var container = this.container;
			var object = new Item(this, this.container, this.room)
			this.room.container.addChild(this.container);
		}
	}
}

ObjectPlacer.prototype.objectPlaced = function(x,y) {
	if (this.container) {
		this.container = null;
	}
}
function Item(ItemPlacer,type,container,room) {
	this.container = container;
	this.room = room;
	this.type = type;
	this.owner = null;

	this.container.on("mousedown", function(event) {
		event.stopImmediatePropagation();
		ItemPlacer.container = this.container;
	}.bind(this))
}

function ItemPlacer(room) {
	
}

ItemPlacer.prototype.setRoom = function(room) {
	this.room = room;

	this.gridSize = 20;

	this.itemTypes = room.type.items;
	this.itemTypeSelected = room.type.items[Object.keys(room.type.items)[0]];

	this.clearListeners();

	this.pressmove = this.room.container.on("pressmove", function(event) {
		this.move(event.localX, event.localY);
	}.bind(this))

	this.mousedown = this.room.container.on("mousedown", function(event) {
		this.newItem(event.localX, event.localY);
	}.bind(this))

	this.pressup = this.room.container.on("pressup", function(event) {
		this.itemPlaced(event.localX, event.localY);
	}.bind(this))
}

ItemPlacer.prototype.clearRoom = function() {
	this.clearListeners();
}

ItemPlacer.prototype.clearListeners = function() {
	this.room.container.off("mousedown", this.mousedown);
	this.room.container.off("pressmove", this.pressmove);
	this.room.container.off("pressup", this.pressup);
}

ItemPlacer.prototype.getGridPosition = function(x,y) {
	x = Math.max(x,20); x = Math.min(x,this.room.width-20);
	y = Math.max(y,20); y = Math.min(y,this.room.height-20);
	var xGrid = Math.round(x / this.gridSize) * this.gridSize;
	var yGrid = Math.round(y / this.gridSize) * this.gridSize;
	return {x: xGrid, y: yGrid};
}

ItemPlacer.prototype.move = function(x,y) {
	var legalCoords = this.getGridPosition(x,y);
	if (legalCoords) {
		if (this.container) {
			this.container.x = legalCoords.x;
			this.container.y = legalCoords.y;
		}
	}
}

ItemPlacer.prototype.newItem = function(x,y) {
	if (this.container == null && this.itemTypeSelected) {
		console.log("Placing " + this.itemTypeSelected);
		var legalCoords = this.getGridPosition(x,y)
		if (legalCoords) {

			this.container = this.itemTypeSelected.getContainer();
			this.container.x = legalCoords.x;
			this.container.y = legalCoords.y;

			var item = new Item(this, this.itemTypeSelected, this.container, this.room)
			this.room.addItem(item);
			this.room.container.addChild(this.container);
		}
	}
}

ItemPlacer.prototype.itemPlaced = function(x,y) {
	if (this.container) {
		this.container = null;
	}
}
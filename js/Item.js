//function Item(itemPlacer,type,container,room) {
function Item(x,y,type,ip, location) {
	this.ip = ip;
	this.type = type;
	this.owner = null;
	this.location = location; // A room or person 

	this.moveableEntity = new MovableEntity(x,y)

	this.container = this.type.createNewContainer();
	this.syncCoords();
	itemContainer.addChild(this.container);
	this.container.on("click", function(evt) {
		emitr.trigger("itemSelected", this)
	}.bind(this));

	this.lastXChange = 0;
	this.lastYChange = 0;

	this.setListeners();
}

Item.prototype.setListeners = function() {
	this.container.on("mousedown", function(event) {
		if (event.nativeEvent.button == 2) {
			this.destroy();
		}
	}.bind(this))

	this.container.on("pressmove", function(event) {
		this.ip.moveItem(this, event);
	}.bind(this))

	this.container.on("pressup", function(event) {
	}.bind(this))
}

Item.prototype.destroy = function() {
	if (this.location) {
		this.location.dropItem(this);
	}
	if (this.owner) {
		this.owner.dropItem(this);
	}
	itemContainer.removeChild(this.container);
}

Item.prototype.getCoords = function() {
	return {
		x: this.moveableEntity.x, y: this.moveableEntity.y
	}
}

Item.prototype.getType = function() {
	return LibraryItems.bookshelf
}

Item.prototype.gainOwner = function(owner) {
	if (this.owner) {
		debugger;
	} else {
		this.owner = owner;
	}
}

Item.prototype.looseOwner = function() {
	this.owner = null;
}

Item.prototype.hasOwner = function() {
	return (this.owner != null);
}

Item.prototype.getRoom = function() {
	return this.moveableEntity.getCurrentRoom();
}

Item.prototype.setNewCoords = function(coords) {
	this.moveableEntity.x = coords.x;
	this.moveableEntity.y = coords.y;
	this.syncCoords();
}

Item.prototype.syncCoords = function() {
	this.container.x = this.moveableEntity.x;
	this.container.y = this.moveableEntity.y;
}

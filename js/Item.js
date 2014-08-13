//function Item(itemPlacer,type,container,room) {
function Item(x,y,type,ip,location) {
	this.ip = ip;
	this.type = type;
	this.owner = null;
	this.location = location; // A room or person
	this.enabled = false;

	this.moveableEntity = new MovableEntity(x,y)

	this.container = this.type.createNewContainer();
	this.syncCoords();
	itemContainer.addChild(this.container);
	this.container.on("click", function(evt) {
		emitr.trigger("itemSelected", this)
	}.bind(this));

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

Item.prototype.isEnabled = function() {
	return this.enabled;
}

Item.prototype.looseLocation = function() {
	if (this.location) {
		this.location.dropItem(this);
	}
	this.location = null;
}

Item.prototype.gainLocation = function(location) {
	this.location = location;
}

Item.prototype.looseOwner = function() {
	if (this.owner) {
		this.owner.dropItem(this);
	}
	this.owner = null;
}

Item.prototype.destroy = function() {
	this.looseLocation();
	this.looseOwner();
	itemContainer.removeChild(this.container);
}

Item.prototype.getCoords = function() {
	return {
		x: this.moveableEntity.coords.x,
		y: this.moveableEntity.coords.y
	};
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

Item.prototype.hasOwner = function() {
	return (this.owner != null);
}

Item.prototype.getRoom = function() {
	return this.moveableEntity.getCurrentRoom();
}

Item.prototype.setNewCoords = function(coords) {
	this.moveableEntity.coords.x = coords.x;
	this.moveableEntity.coords.y = coords.y;
	this.syncCoords();
}

Item.prototype.syncCoords = function() {
	this.container.x = this.moveableEntity.coords.x;
	this.container.y = this.moveableEntity.coords.y;
}

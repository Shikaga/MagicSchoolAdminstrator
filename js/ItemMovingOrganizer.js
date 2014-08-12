function ItemMovingOrganizer() {
	this.mover = null;
}

ItemMovingOrganizer.prototype = {
	addMover: function(mover) {
		this.mover = mover;
	},
	moveItem: function(item, destination) {
		this.mover.goToCoords({x: item.getCoords().x, y: item.getCoords().y}, function() {
			this.mover.pickupItem(item);
			this.mover.goToCoords(destination, function() {
				this.mover.dropItem(item);
			}.bind(this));
		}.bind(this));
	}
}
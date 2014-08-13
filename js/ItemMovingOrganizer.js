function ItemMovingOrganizer() {
	this.mover = null;
}

ItemMovingOrganizer.prototype = {
	addMover: function(mover) {
		this.mover = mover;
	},
	moveItem: function(item, ghostItem) {
		if (this.mover) {
			this.mover.goToCoords({x: item.getCoords().x, y: item.getCoords().y}, function() {
				this.mover.pickupItem(item);
				this.mover.goToCoords(ghostItem.getCoords(), function() {
					item.enabled = true;
					roomHandler.placeItemInRoom(item);
					this.mover.dropItem(item);
					ghostItem.destroy();
				}.bind(this));
			}.bind(this));
		}
	}
}
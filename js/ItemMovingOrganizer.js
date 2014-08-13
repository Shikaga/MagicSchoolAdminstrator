function ItemMovingOrganizer() {
	this.moverArray = [];
	this.moveQueue = [];
}

ItemMovingOrganizer.prototype = {
	addMover: function(mover) {
		this.moverArray.push(mover);
	},
	moveItem: function(item, ghostItem) {
		this.moveQueue.push({item: item, ghostItem: ghostItem});
		this.deployFreeMover();
	},
	findFreeMover: function() {
		for (var i=0; i < this.moverArray.length; i++) {
			var mover = this.moverArray[i];
			if (mover.isFree()) {
				return mover;
			}
		}
	},
	deployFreeMover: function() {
		if (this.moveQueue.length > 0) {
			var freeMover = this.findFreeMover();
			if (freeMover) {
				var move = this.moveQueue.shift()
				this._moveItem(freeMover, move.item, move.ghostItem);	
			}
		}
	},
	_moveItem: function(mover, item, ghostItem) {
		mover.goToCoords({x: item.getCoords().x, y: item.getCoords().y}, function() {
				mover.pickupItem(item);
				mover.goToCoords(ghostItem.getCoords(), function() {
					item.enabled = true;
					roomHandler.placeItemInRoom(item);
					mover.dropItem(item);
					ghostItem.destroy();
					this.deployFreeMover();
				}.bind(this));
			}.bind(this));
	}
}
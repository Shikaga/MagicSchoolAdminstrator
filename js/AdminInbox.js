function AdminInbox() {
	this.items = [];
}

AdminInbox.prototype = {
	addItem: function(inboxItem) {
		inboxItem.id = this.items.length; //TODO: This will break if items are removed!
		this.items.push(inboxItem);
		emitr.trigger("inboxUpdated", this);
	}, 
	getItemFromId: function(id) {
		for (var i=0; i < this.items.length; i++) {
			if (this.items[i].id == id) {
				return this.items[i];
			}
		}
		return null;
	}
}
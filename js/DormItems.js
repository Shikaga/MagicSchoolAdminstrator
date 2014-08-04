DormItems = {
	"bed": {
		name: "Bed",
		owner: null,
		createNewContainer: function() {
			return new ItemRenderer(this.name).addRect('#000',-15,-30,30,60).done()
		}
	}
}

EmptyItems = {
	
}

ClassroomItems = {
	
}

DiningRoomItems = {
	
}

EntranceHallItems = {
	
}

LibraryItems = {
	"bookshelf": {
		name: "Bookshelf",
		id: "bookshelf",
		owner: null,
		createNewContainer: function() {
			return new ItemRenderer(this.name).addRect('brown',-15,-30,30,60).done()
		}
	},
	"chair": {
		name: "Chair",
		id: "chair",
		owner: null,
		createNewContainer: function() {
			return new ItemRenderer(this.name).addRect('red',-15,-30,30,30).done()
		}
	}
}
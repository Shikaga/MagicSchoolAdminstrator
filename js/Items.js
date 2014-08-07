DormItems = {
	"bed": {
		name: "Bed",
		id: "bed",
		owner: null,
		createNewContainer: function() {
			return new ItemRenderer(this.name).addRect('#000',-15,-30,30,60).done()
		}
	}
}

EmptyItems = {
	
}

ClassroomItems = {
	"desk": {
		name: "Desk",
		id: "desk",
		owner: null,
		createNewContainer: function() {
			return new ItemRenderer(this.name).addRect('red',-15,-30,30,30).done()
		}
	}
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
			return new ItemRenderer(this.name).addRect('brown',-15,-60,30,120).done()
		}
	},
	"chair": {
		name: "Chair",
		id: "chair",
		owner: null,
		createNewContainer: function() {
			return new ItemRenderer(this.name).addRect('red',-20,-20,40,40).addRect('darkred',-15,-20,30,30).done()
		}
	}
}
describe("ItemPlacer", function() {
	roomContainer = {
		addChild: function() {}
	}
	personContainer = {
		addChild: function() {}
	}
	itemContainer = {
		items: [],
		addChild: function(item) {
			this.items.push(item)
		}
	}
	map = {
		addChild: function(){}
	}
	emitr = {
		trigger: function() {},
		on: function() {}
	}
	roomHandler = new RoomHandler();
	var room1 = roomHandler.createAndAddRoom(0,0, "library");
	var room2 = roomHandler.createAndAddRoom(200,0);
	var room3 = roomHandler.createAndAddRoom(-200,0);
	itemMovingOrganizer = new ItemMovingOrganizer()
	// debugger;

	it("places a ghost item", function() {
		
		roomHandler.spawnRoom = room1;
		var itemPlacer = new ItemPlacer();
		var itemTypes = itemPlacer.getRoomItemTypes();
		expect(itemTypes).toEqual(null);
		var nextItemType = itemPlacer.getNextItemType();
		expect(nextItemType).toEqual(null);

		itemPlacer.setRoom(room1);
		var itemTypes = itemPlacer.getRoomItemTypes();
		expect(Object.keys(itemTypes).length).toEqual(2);
		var nextItemType = itemPlacer.getNextItemType();
		expect(nextItemType.id).toEqual('bookshelf');

		itemPlacer.createNewItemAt(100,100);
		// expect(itemContainer.items[0].id).toEqual('bookshelf');
	})
})
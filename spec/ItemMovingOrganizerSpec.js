describe("ItemMovingOrganizer", function() {
	roomContainer = {
		addChild: function() {}
	}
	personContainer = {
		addChild: function() {}
	}
	itemContainer = {
		addChild: function() {}
	}
	map = {
		addChild: function(){}
	}
	emitr = {
		trigger: function() {},
		on: function() {}
	}
	roomHandler = new RoomHandler();
	var room1 = roomHandler.createAndAddRoom(0,0);
	var room2 = roomHandler.createAndAddRoom(200,0);
	var room3 = roomHandler.createAndAddRoom(-200,0);

	it("moves one item with one footman", function() {
		var itemMovingOrganizer = new ItemMovingOrganizer();
		var footman = new Footman(10,10);
		itemMovingOrganizer.addMover(footman)

		var item = new Item(70,10, LibraryItems.chair);
		var ghostItem = new Item(70,70, LibraryItems.chair);
		var destroyCalled = false;
		ghostItem.destroy = function() {
			destroyCalled = true;
		}


		itemMovingOrganizer.moveItem(item, ghostItem);
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 40, y: 10});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 70, y: 10});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 70, y: 40});
		expect(item.getCoords()).toEqual({x: 70, y: 40});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 70, y: 70});
		expect(item.getCoords()).toEqual({x: 70, y: 70});

		footman.goToCoords({x: 10, y: 70});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 40, y: 70});
		expect(item.getCoords()).toEqual({x: 70, y: 70});
		expect(destroyCalled).toEqual(true);
	})

	it("queues up a item moving", function() {
		var itemMovingOrganizer = new ItemMovingOrganizer();
		var footman = new Footman(10,10);
		itemMovingOrganizer.addMover(footman)

		var item = new Item(70,10, LibraryItems.chair);
		var ghostItem = new Item(70,70, LibraryItems.chair);

		var item2 = new Item(10,70, LibraryItems.chair);
		var ghostItem2 = new Item(10,10, LibraryItems.chair);

		var destroyCalled = false;
		ghostItem.destroy = function() {
			destroyCalled = true;
		}

		var destroyCalled2 = false;
		ghostItem2.destroy = function() {
			destroyCalled2 = true;
		}


		itemMovingOrganizer.moveItem(item, ghostItem);
		itemMovingOrganizer.moveItem(item2, ghostItem2);

		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 40, y: 10});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 70, y: 10});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 70, y: 40});
		expect(item.getCoords()).toEqual({x: 70, y: 40});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 70, y: 70});
		expect(item.getCoords()).toEqual({x: 70, y: 70});

		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 40, y: 70});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 10, y: 70});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 10, y: 40});
		expect(item2.getCoords()).toEqual({x: 10, y: 40});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 10, y: 10});
		expect(item2.getCoords()).toEqual({x: 10, y: 10});
	})

	it("supports multiple footman", function() {
		var itemMovingOrganizer = new ItemMovingOrganizer();

		var footman = new Footman(10,10);
		itemMovingOrganizer.addMover(footman)

		var footman2 = new Footman(10,10);
		itemMovingOrganizer.addMover(footman2)

		var item = new Item(70,10, LibraryItems.chair);
		var ghostItem = new Item(70,70, LibraryItems.chair);

		var item2 = new Item(10,70, LibraryItems.chair);
		var ghostItem2 = new Item(10,10, LibraryItems.chair);

		var destroyCalled = false;
		ghostItem.destroy = function() {
			destroyCalled = true;
		}

		var destroyCalled2 = false;
		ghostItem2.destroy = function() {
			destroyCalled2 = true;
		}


		itemMovingOrganizer.moveItem(item, ghostItem);
		itemMovingOrganizer.moveItem(item2, ghostItem2);

		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 40, y: 10});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 70, y: 10});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 70, y: 40});
		expect(item.getCoords()).toEqual({x: 70, y: 40});
		footman.update(0.5);
		expect(footman.getCoords()).toEqual({x: 70, y: 70});
		expect(item.getCoords()).toEqual({x: 70, y: 70});

		footman2.update(0.5);
		expect(footman2.getCoords()).toEqual({x: 10, y: 40});
		footman2.update(0.5);
		expect(footman2.getCoords()).toEqual({x: 10, y: 70});
		footman2.update(0.5);
		expect(footman2.getCoords()).toEqual({x: 10, y: 40});
		expect(item2.getCoords()).toEqual({x: 10, y: 40});
		footman2.update(0.5);
		expect(footman2.getCoords()).toEqual({x: 10, y: 10});
		expect(item2.getCoords()).toEqual({x: 10, y: 10});
	})
})
describe("ItemMovingOrganizer", function() {
	roomContainer = {
		addChild: function() {}
	}
	personContainer = {
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
		var item = {
			coords: {x: 70, y: 10},
			getCoords: function() {
				return this.coords
			},
			setNewCoords: function(coords) {
				this.coords = coords
			},
			looseLocation: function() {

			},
			gainLocation: function() {

			}
		}
		itemMovingOrganizer.moveItem(item, {x: 70, y: 70});
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
	})
})
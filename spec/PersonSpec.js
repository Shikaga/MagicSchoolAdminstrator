describe("Person", function() {
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

	it("returns the room you are in", function() {
		var person = new Person(10,10,60);
		var room = person.getRoomIn();
		expect(room).toEqual(room1);

		var person2 = new Person(210,10,60);
		var room = person2.getRoomIn();
		expect(room).toEqual(room2);
	});

	it("teleports people", function() {
		var person = new Person(10,10,60);
		var coords = person.getCoords();
		expect(coords).toEqual({x: 10, y: 10});

		person.teleportTo({x: 210, y: 10});
		var coords = person.getCoords();
		var room = person.getRoomIn();
		expect(coords).toEqual({x: 210, y: 10});
		expect(room).toEqual(room2);
		expect(person.isTravelling()).toEqual(false);
	});

	it("walks people on update", function() {
		var person = new Person(10,10,60);
		person.goToCoords({x: 100, y: 10});
		expect(person.getCoords()).toEqual({x: 10, y: 10});

		person.update(0.1);
		expect(person.getCoords()).toEqual({x: 16, y: 10});
		expect(person.isTravelling()).toEqual(true);

		person.update(0.9);
		expect(person.getCoords()).toEqual({x: 70, y: 10});
		expect(person.isTravelling()).toEqual(true);

		person.update(1);
		expect(person.getCoords()).toEqual({x: 100, y: 10});
		expect(person.isTravelling()).toEqual(false);
	});

	it("wanders around current room at 1/3 speed", function() {
		Room.prototype.getRandomCoordinates = function() {
			return {x: 70, y: 10}
		}

		var person = new Person(10,10,60);
		person.wanderInRoom(room1);

		person.update(0.3);
		expect(person.getCoords()).toEqual({x: 16, y: 10});
		expect(person.isTravelling()).toEqual(true);


		Room.prototype.getRandomCoordinates = function() {
			return {x: 70, y: 70}
		}

		person.update(2.7);
		expect(person.getCoords()).toEqual({x: 70, y: 10});
		expect(person.isTravelling()).toEqual(true);

		Room.prototype.getRandomCoordinates = function() {
			return {x: 10, y: 70}
		}

		person.update(3);
		expect(person.getCoords()).toEqual({x: 70, y: 70});
		expect(person.isTravelling()).toEqual(true);

		person.update(1.5);
		expect(person.getCoords()).toEqual({x: 40, y: 70});
		expect(person.isTravelling()).toEqual(true);

		var newCoordsRequested = false;

		Room.prototype.getRandomCoordinates = function() {
			newCoordsRequested = true;
		}
		person.wanderInRoom(room1);
		expect(newCoordsRequested).toEqual(false);



		person.stop()
		person.update(1.5);
		expect(person.getCoords()).toEqual({x: 40, y: 70});
		expect(person.isTravelling()).toEqual(false);
	});

});
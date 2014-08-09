describe("Are Rooms Adjacent", function() {
	emitr = {
		trigger: function() {},
		on: function() {}
	}

	var room1 = {id: 'room1', x: 0, y: 0, height: 100, width: 100};

	var room1Right = {id: 'room1Right', x: 100, y: 0, height: 100, width: 100};
	var room1Left = {id: 'room1Left', x: -100, y: 0, height: 100, width: 100};
	var room1Top = {id: 'room1Top', x: 0, y: -100, height: 100, width: 100};
	var room1Bottom = {id: 'room1Bottom', x: 0, y: 100, height: 100, width: 100};

	var room1RightHalfUp = {id: 'room1Right', x: 100, y: -50, height: 100, width: 100};
	var room1TopHalfRight = {id: 'room1Top', x: 50, y: -100, height: 100, width: 100};

	var room1TopLeftCorner = {id: 'room1Right', x: -100, y: -100, height: 100, width: 100};
	var room1TopRightCorner = {id: 'room1Left', x: 100, y: -100, height: 100, width: 100};
	var room1BottomLeftCorner = {id: 'room1Top', x: -100, y: 100, height: 100, width: 100};
	var room1BottomRightCorner = {id: 'room1Bottom', x: 100, y: 100, height: 100, width: 100};

	var room1FarRightTop = {id: 'room1FarRightTop', x: 500, y: -100, height: 100, width: 100};
	var room1FarLeftTop = {id: 'room1FarLeftTop', x: -500, y: -100, height: 100, width: 100};
	var room1FarRightBottom = {id: 'room1FarRightBottom', x: 500, y: 100, height: 100, width: 100};
	var room1FarLeftBottom = {id: 'room1FarLeftBottom', x: -500, y: 100, height: 100, width: 100};

	var room1FarTopRight = {id: 'room1FarTopRight', x: 100, y: -500, height: 100, width: 100};
	var room1FarBottomRight = {id: 'room1FarBottomRight', x: 100, y: 500, height: 100, width: 100};
	var room1FarTopLeft = {id: 'room1FarTopLeft', x: -100, y: -500, height: 100, width: 100};
	var room1FarBottomLeft = {id: 'room1FarBottomLeft', x: -100, y: 500, height: 100, width: 100};


	var room1RightRight = {id: 'room1RightRight', x: 200, y: 0, height: 100, width: 100};

	var randomRoom = {id: 'randomRoom', x: 1000, y: 1000, height: 100, width: 100};

	it("detects directly adjacent rooms", function() {
		rh = new RoomHandler();
		expect(rh.areRoomsAdjacent(room1,randomRoom)).toEqual(false);
		expect(rh.areRoomsAdjacent(room1,room1Right)).toEqual(true);
		expect(rh.areRoomsAdjacent(room1,room1Left)).toEqual(true);
		expect(rh.areRoomsAdjacent(room1,room1Top)).toEqual(true);
		expect(rh.areRoomsAdjacent(room1,room1Bottom)).toEqual(true);

		expect(rh.areRoomsAdjacent(room1,room1TopRightCorner)).toEqual(false);
		expect(rh.areRoomsAdjacent(room1,room1TopLeftCorner)).toEqual(false);
		expect(rh.areRoomsAdjacent(room1,room1BottomRightCorner)).toEqual(false);
		expect(rh.areRoomsAdjacent(room1,room1BottomLeftCorner)).toEqual(false);

		expect(rh.areRoomsAdjacent(room1,room1FarTopRight)).toEqual(false);
		expect(rh.areRoomsAdjacent(room1,room1FarLeftTop)).toEqual(false);
		expect(rh.areRoomsAdjacent(room1,room1FarRightBottom)).toEqual(false);
		expect(rh.areRoomsAdjacent(room1,room1FarLeftBottom)).toEqual(false);

		expect(rh.areRoomsAdjacent(room1,room1FarRightTop)).toEqual(false);
		expect(rh.areRoomsAdjacent(room1,room1FarBottomRight)).toEqual(false);
		expect(rh.areRoomsAdjacent(room1,room1FarTopLeft)).toEqual(false);
		expect(rh.areRoomsAdjacent(room1,room1FarBottomLeft)).toEqual(false);
	});

	it("return adjacent rooms", function() {
		rh = new RoomHandler();
		rh.addRoom(room1);
		rh.addRoom(room1Left);

		var adjacentRooms = rh.getAdjacentRooms();
		expect(adjacentRooms.length).toEqual(1);
		expect(adjacentRooms[0].room1.id).toEqual('room1');
		expect(adjacentRooms[0].room2.id).toEqual('room1Left');

		rh.addRoom(room1Right);

		var adjacentRooms = rh.getAdjacentRooms();
		expect(adjacentRooms.length).toEqual(2);
		expect(adjacentRooms[0].room1.id).toEqual('room1');
		expect(adjacentRooms[0].room2.id).toEqual('room1Left');

		expect(adjacentRooms[1].room1.id).toEqual('room1');
		expect(adjacentRooms[1].room2.id).toEqual('room1Right');


		rh.addRoom(room1RightRight);

		var adjacentRooms = rh.getAdjacentRooms();
		expect(adjacentRooms.length).toEqual(3);
		expect(adjacentRooms[0].room1.id).toEqual('room1');
		expect(adjacentRooms[0].room2.id).toEqual('room1Left');

		expect(adjacentRooms[1].room1.id).toEqual('room1');
		expect(adjacentRooms[1].room2.id).toEqual('room1Right');

		expect(adjacentRooms[2].room1.id).toEqual('room1Right');
		expect(adjacentRooms[2].room2.id).toEqual('room1RightRight');

	});

	it("getSharedBorder", function() {
		rh = new RoomHandler();

		var sharedBorder = rh.getSharedBorder({
			room1: room1,
			room2: randomRoom
		})

		expect(sharedBorder).toEqual(null);

		var sharedBorder = rh.getSharedBorder({
			room1: room1,
			room2: room1Right
		})
		expect(sharedBorder[0]).toEqual({x: 100, y: 0});
		expect(sharedBorder[1]).toEqual({x: 100, y: 100});

		var sharedBorder = rh.getSharedBorder({
			room1: room1Right,
			room2: room1
		})
		expect(sharedBorder[0]).toEqual({x: 100, y: 0});
		expect(sharedBorder[1]).toEqual({x: 100, y: 100});

		var sharedBorder = rh.getSharedBorder({
			room1: room1,
			room2: room1Top
		})
		expect(sharedBorder[0]).toEqual({x: 0, y: 0});
		expect(sharedBorder[1]).toEqual({x: 100, y: 0});

		var sharedBorder = rh.getSharedBorder({
			room1: room1Top,
			room2: room1
		})
		expect(sharedBorder[0]).toEqual({x: 0, y: 0});
		expect(sharedBorder[1]).toEqual({x: 100, y: 0});

		var sharedBorder = rh.getSharedBorder({
			room1: room1,
			room2: room1TopHalfRight
		})
		expect(sharedBorder[0]).toEqual({x: 50, y: 0});
		expect(sharedBorder[1]).toEqual({x: 100, y: 0});

		var sharedBorder = rh.getSharedBorder({
			room1: room1,
			room2: room1RightHalfUp
		})
		expect(sharedBorder[0]).toEqual({x: 100, y: 0});
		expect(sharedBorder[1]).toEqual({x: 100, y: 50});
	});

});
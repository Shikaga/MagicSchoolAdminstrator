RoomTypes = {
	"empty": {
		name: "Empty",
		backgroundColor: "#888888",
		foregroundColor: "#AAAAAA",
		id: "empty",
		studentsSupported: function(room) {
			return 0;
		}
	},
	"entrancehall": {
		name: "Entrance Hall",
		backgroundColor: "#9E0025",
		foregroundColor: "#AD4B62",
		id: "entrancehall",
		studentsSupported: function(room) {
			return 20;
		}
	},
	"classroom": {
		name: "Classroom",
		backgroundColor: "#006E07",
		foregroundColor: "#77C97C",
		id: "classroom",
		studentsSupported: function(room) {
			return 6;
		}
	},
	"dorm": {
		name: "Dormitary",
		backgroundColor: "#003773",
		foregroundColor: "#5DA0E8",
		items: DormItems,
		id: "dorm",
		studentsSupported: function(room) {
			return 6;
		}
	},
	"diningroom": {
		name: "Dining Room",
		backgroundColor: "#B08B12",
		foregroundColor: "#E6CE83",
		id: "diningroom",
		studentsSupported: function(room) {
			return 20;
		}
	}
}
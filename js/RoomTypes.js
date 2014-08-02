RoomTypes = {
	"empty": {
		name: "Empty",
		backgroundColor: "#888888",
		foregroundColor: "#AAAAAA",
		studentsSupported: function(room) {
			return 0;
		}
	},
	"entrancehall": {
		name: "Entrance Hall",
		backgroundColor: "#9E0025",
		foregroundColor: "#AD4B62",
		studentsSupported: function(room) {
			return 20;
		}
	},
	"classroom": {
		name: "Classroom",
		backgroundColor: "#006E07",
		foregroundColor: "#77C97C",
		studentsSupported: function(room) {
			return 6;
		}
	},
	"dorm": {
		name: "Dormitary",
		backgroundColor: "#003773",
		foregroundColor: "#5DA0E8",
		studentsSupported: function(room) {
			return 6;
		}
	},
	"diningroom": {
		name: "Dining Room",
		backgroundColor: "#B08B12",
		foregroundColor: "#E6CE83",
		studentsSupported: function(room) {
			return 20;
		}
	}
}
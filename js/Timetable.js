function Timetable() {
	this.timetable = {};
	this.syllabus = ["class", "freetime", "naptime"]
	this.initTimetable();
	this.setListeners();
}

Timetable.prototype = {
	initTimetable: function() {
		for (var i=0; i < 24; i++) {
			this.timetable[i] = "freetime";
		}
		//this.timetable[9] = "class";
		//this.timetable[10] = "class";
		/*this.timetable[11] = "class";
		this.timetable[13] = "class";
		this.timetable[14] = "class";
		this.timetable[15] = "class";
		this.timetable[16] = "class";*/

		for (var i=0; i < 6; i++) {
			this.timetable[i] = "naptime"
		}

		for (var i=22; i < 24; i++) {
			this.timetable[i] = "naptime";
		}
	}, 

	setListeners: function() {
		emitr.on("editTimetable", function() {
			emitr.trigger("showTimetable", {timetable: this})
		}.bind(this))
	}
}
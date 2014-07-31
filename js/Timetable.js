function Timetable() {
	this.timetable = {};
	this.initTimetable();
	this.setListeners();
}

Timetable.prototype = {
	initTimetable: function() {
		for (var i=0; i < 24; i++) {
			this.timetable[i] = "freetime";
		}
		this.timetable[9] = "class";
	}, 

	setListeners: function() {
		emitr.on("editTimetable", function() {
			emitr.trigger("showTimetable", {timetable: this})
		}.bind(this))
	}
}
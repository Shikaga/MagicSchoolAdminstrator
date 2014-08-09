function Clock() {
	this.setListeners();
	this.millisecondsPassed = 8 * 60 * 60 * 1000 //TODO: Will this overflow?
	this.clock = null
	this.setClock();
	emitr.on('addHour', function() {
		this.millisecondsPassed += 60 * 60 * 1000;
	}.bind(this))
}

Clock.prototype = {
	update: function(dtMillisconds) {
		var gameTime = dtMillisconds * 60 * 2; //2 game minutes for every real second (12 minute days)
		if (!this.paused) {
			this.updateClock(gameTime);
			emitr.trigger("minutesPass", gameTime/60000)
		}
	},
	updateClock: function(gameTime) {
		this.millisecondsPassed += gameTime;
		this.setClock();
	},
	setClock: function() {
		var date = new Date(this.millisecondsPassed);
		var newClock = date.getHours() + ":" + date.getMinutes();
		if (newClock !== this.clock) {
			if (date.getHours() == 0 && date.getMinutes() == 0) {
				emitr.trigger("newDay");
			}
			emitr.trigger("newClock", newClock);
		}
		this.clock = newClock;
	},
	getTime: function() {
		var date = new Date(this.millisecondsPassed);
		return {
			hours: date.getHours(),
			minutes: date.getMinutes()
		}
	},
	pauseClock: function() {
		this.paused = true;
	},
	resumeClock: function() {
		this.paused = false;
	},
	setListeners: function() {
		emitr.on("pauseClock", function() {
			this.pauseClock();
		}.bind(this))
		emitr.on("resumeClock", function() {
			this.resumeClock();
		}.bind(this))
	}
}
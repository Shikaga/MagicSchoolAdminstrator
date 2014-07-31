/** @jsx React.DOM */
TimetableInterface = React.createClass({
	getInitialState: function() {

		emitr.on("showTimetable", function(data) {
			this.setState({
				timetable:data.timetable.timetable
			})
		}.bind(this))

		return {
			timetable: null
		}
	},

	close: function() {
		this.setState({
			timetable: null
		})
	},

	render: function() {
		var timetableInterface;
		if (this.state.timetable) {
			var periods = [];
			for (var type in this.state.timetable) {
				periods.push(<div>{this.state.timetable[type]}</div>)
			}
			timetableInterface = (<div>
				<h1>Timetable</h1>
				{periods}
				<button onClick={this.close}>Close</button>
			</div>)
		}

		if (this.state.timetable !== null) {
			return timetableInterface;
		} else {
			return <div></div>
		}
	}
})
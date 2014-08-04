/** @jsx React.DOM */
TimetableInterface = React.createClass({
	getInitialState: function() {

		emitr.on("showTimetable", function(data) {
			this.setState({
				timetable:data.timetable.timetable,
				syllabus: data.timetable.syllabus
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

	periodChanged: function(event) {
		this.state.timetable[event.target.attributes.getNamedItem("data").value] = event.target.value;

		this.setState({
			timetable: this.state.timetable
		})
	},

	render: function() {
		var timetableInterface;
		if (this.state.timetable) {
			var periods = [];
			for (var type in this.state.timetable) {
				var options = [];
				this.state.syllabus.forEach(function(topic) {
					options.push(<option value={topic}>{topic}</option>)
				})
				periods.push(
			<div><span>{type}</span><select data={type} onChange={this.periodChanged} value={this.state.timetable[type]}>
				{options}
			</select></div>)
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
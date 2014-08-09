/** @jsx React.DOM */

TimetablePeriodInterface = React.createClass({
	lessonChanged: function() {
		this.props.lessonChanged({
			time: this.props.time,
			lessonId: event.target.value
		})
	},
	render: function() {
		var options = [];
		for (var id in this.props.syllabus) {
			lesson = this.props.syllabus[id];
			options.push(<option value={lesson.id}>{lesson.name}</option>)
		};

		return (<div>
			<span>{this.props.time}</span>
			<select onChange={this.lessonChanged} value={this.props.selected}>
				{options}
			</select>
		</div>)
	}
})

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

	lessonChanged: function(event) {
		this.state.timetable[event.time] = this.state.syllabus[event.lessonId];
		this.setState({
			timetable: this.state.timetable
			})
	},

	render: function() {
		var timetableInterface;
		if (this.state.timetable) {
			var periods = [];
			for (var time in this.state.timetable) {
				periods.push(
					<TimetablePeriodInterface 
						time={time} 
						syllabus={this.state.syllabus} 
						selected={this.state.timetable[time].id}
						lessonChanged={this.lessonChanged}>
					</TimetablePeriodInterface>
				);
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
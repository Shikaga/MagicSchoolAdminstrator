/** @jsx React.DOM */
RoomEditor = React.createClass({
	getInitialState: function() {

		emitr.on("editRoom", function(data) {
			this.setState({
				room:data.room,
				type:data.room.type
			})
		}.bind(this))

		return {
			room: null
		}
	},

	setRoom: function() {
	},

	onDone: function() {
		emitr.trigger("editRoomsComplete")
		this.setState({
			room:null
		})
	},

	selectChanged: function(event) {
		this.setState({
			type:event.target.value
		})
		this.state.room.setType(event.target.value);
	},

	render: function() {
		var type;
		options = [];
		for (var type in RoomTypes) {
			options.push(<option value={type}>{RoomTypes[type].name}</option>)
		}
		var roomEditor = (<div>
			<h1>Room Editor</h1>
			<select onChange={this.selectChanged} value={this.state.type}>
				{options}
			</select>
			<button onClick={this.onDone}>Done</button>
		</div>)

		if (this.state.room !== null) {
			return roomEditor;
		} else {
			return <div></div>
		}
	}
})
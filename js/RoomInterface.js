/** @jsx React.DOM */
RoomEditor = React.createClass({
	getInitialState: function() {

		emitr.on("editRoom", function(data) {
			this.setState({
				room:data.room,
				type:data.room.type
			})

			this.setItemState(data.room);
		}.bind(this))

		return {
			room: null
		}
	},

	setRoom: function() {
	},

	onDone: function() {
		//emitr.trigger("editRoomsComplete")
		this.state.room.disableSelected();
		this.setState({
			room:null
		})
	},

	setItemState: function(room) {
		if (room.op.itemTypeSelected) {
			this.setState({
				items: Object.keys(room.op.itemTypes),
				item: room.op.itemTypeSelected.id
			})
		}
	},

	selectChanged: function(event) {
		var roomType = RoomTypes[event.target.value]
		this.state.room.setType(roomType);
		this.setState({
			type:event.target.value
		})
		this.setItemState(this.state.room);
	},

	objectChanged: function(event) {
		debugger;
		this.setState({
			item:event.target.value
		})
		this.state.room.op.itemTypeSelected = this.state.room.op.itemTypes[event.target.value];
	},

	render: function() {
		var type;
		options = [];
		for (var type in RoomTypes) {
			options.push(<option value={type}>{RoomTypes[type].name}</option>)
		}

		var itemOptions = [];
		for (var type in this.state.items) {
			itemOptions.push(<option value={this.state.items[type]}>{this.state.items[type]}</option>)
		}

		var roomEditor = (<div>
			<h1>Room Editor</h1>
			<select onChange={this.selectChanged} value={this.state.type}>
				{options}
			</select>

			<select onChange={this.objectChanged} value={this.state.item}>
				{itemOptions}
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
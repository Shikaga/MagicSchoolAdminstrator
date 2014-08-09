/** @jsx React.DOM */
AdminSubject = React.createClass({
	itemSelected: function() {
		this.props.itemSelected(this.props.item.id);
	},
	render: function() {
		return <div onClick={this.itemSelected}>{this.props.item.subject}</div>
	}
})

AdminSubjectList = React.createClass({
	itemSelected: function(id) {
		this.props.itemSelected(id)
	},
	render: function() {
		var items = [];
		this.props.items.forEach(function(item) {
			items.push(<AdminSubject item={item} itemSelected={this.itemSelected}></AdminSubject>)
		}.bind(this))
		return <div>{items}</div>
	}
})

AdminBody = React.createClass({
	render: function() {
		if (this.props.item) {
			return <div>{this.props.item.body}</div>
		} else {
			return <div>No message selected</div>
		}
	}
})

AdminInboxInterface = React.createClass({
	getInitialState: function() {
		emitr.on("inboxUpdated", function(inbox) {
			this.setState({
				inbox: inbox,
				selectedItem: null
			})
		}.bind(this))

		return {
			items: []
		}
	},
	itemSelected: function(key) {
		var item = this.state.inbox.getItemFromId(key);
		if (item) {
			this.setState({
				selectedItem: item
			})
		}
	},
	close: function() {
		debugger;
	},
	render: function() {
		var style = {
			border: "1px solid",
			margin: "2px"
		}
		if (this.state.inbox) {
			return <div style={style}>
				<h1>Inbox</h1>
				<AdminSubjectList items={this.state.inbox.items} itemSelected={this.itemSelected}></AdminSubjectList>
				<AdminBody item={this.state.selectedItem}></AdminBody>
			</div>
		} else {
			return <div></div>
		}
	}
})
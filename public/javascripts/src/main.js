/**
 * main.js
 * @flow
 */

import React from "react/addons"
import request from "superagent"
import uuid from "node-uuid"
import {UserStore} from "./stores/UserStore"
import {UserActions} from "./actions/UserActions"


// Using flowtype

interface Person {
	firstName: string,
	lastName: string
}

interface User {
	name: string,
	email: string,
	avatar: string,
	id: string
}

const styles = {
	main: {
		"fontFamily": "helvetica"
	},
	list: {
		"display": "block",
		"float": "left"
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			users: UserStore.loadUsers()
		}
	}
	componentDidMount() {
		UserActions.get(); // trigger the get action to get the ball rolling
		UserStore.addChangeListener(this._onChange.bind(this));
	}
	componentWillUnmount() {
		console.info("will unmount here")
		UserStore.removeChangeListener(this._onChange.bind(this));
	}
	render() {
		let users = this.state.users
		let userList = [];

		console.info("user state", users)

		users.map(function(user) {
			userList.push(this._generateUserList(user))
		}.bind(this))

		return (
		  <main style={styles.main}>
				<section>
					<ul>{userList}</ul>
				</section>
				<form onSubmit={this._onSubmit.bind(this)}>

					<div>
						<label>Name</label>
						<input ref="name" />
					</div>

					<div>
						<label>Email</label>
						<input ref="email" type="email" />
					</div>

					<div>
						<label>Avatar (Valid img url)</label>
						<input ref="avatar" />
					</div>

					<button type="submit">Create User</button>

				</form>
		  </main>
		)
	}
	_onSubmit(e) {
		e.preventDefault()
		let name = React.findDOMNode(this.refs.name).value
		let email = React.findDOMNode(this.refs.email).value
		let avatar = React.findDOMNode(this.refs.avatar).value
		let id = uuid.v4()

		let userFormData = {name, email, avatar, id}

		UserActions.create(userFormData)

	}
	_onChange() {
		this.setState({users: UserStore.loadUsers()})
	}
	_generateUserList(user: User) { // Using interface
		return (
			<li key={user.id}>
				<article>
					<h4>{user.name}</h4>
					<p>
						email: {user.email}
						<br />
						<img src={user.avatar} />
					</p>
				</article>
			</li>
		)
	}
}

function calculation(a: number, b: number): number {
	return a + b;
}

var x: number = calculation(2, 3)

React.render(<App />, document.getElementById("main"))

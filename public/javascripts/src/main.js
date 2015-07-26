/**
 * main.js
 * @flow
 */

import React from "react/addons"
import request from "superagent"
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

		users.map(function(user) {
			userList.push(this._generateUserList(user))
		}.bind(this))

		return (
		  <main style={styles.main}>
				<section>
					<ul>{userList}</ul>
				</section>
		  </main>
		)
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

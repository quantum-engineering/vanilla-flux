/**
 * UserActions.js
 * @flow
 */

import AppDispatcher from "../dispatcher/AppDispatcher"
import {UserConstants} from "../constants/UserConstants"
import request from "superagent"

export const UserActions = {
	get() {
		AppDispatcher.dispatch({
			actionType: UserConstants.USER_LOAD,
			users: [],
			loading: true
		})
		request
			.get("/users")
			.end(function(err, res) {
				AppDispatcher.dispatch({
					actionType: UserConstants.USER_LOAD_COMPLETE,
					users: res.body
				})
			})
	},
	create(payload) {
		AppDispatcher.dispatch({
			actionType: UserConstants.USER_CREATE,
			loading: true
		})
		console.info("sending payload", payload)
		request
			.post("/users/new")
			.send(payload)
			.end(function(err, res) {
				AppDispatcher.dispatch({
					actionType: UserConstants.USER_CREATE_COMPLETE,
					loading: false,
					newUser: payload
				})
			})
	}

}

/**
 * UserStore.js
 * @flow
 */

import AppDispatcher from "../dispatcher/AppDispatcher" // notice we don't use the braces, because it's a class import
import {UserConstants} from "../constants/UserConstants"
import assign from "object-assign"
import {EventEmitter} from "events"

// let EventEmitter = events.EventEmitter

let CHANGE_EVENT = "change"

let _users = []

function update(data): void {
	return _users = data
}

function create(user): void {
	console.info("CREATE")
	return _users.push(user)
}

export const UserStore = assign({}, EventEmitter.prototype, {

	/**
	 * Get entire collection of users
	 */

	loadUsers: function(payload) {
		return _users
		this.emitChange()
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * @param {function} callback
	 */
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * @param {function} callback
	 */
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
})

AppDispatcher.register(function(action) {
	var users;
	switch(action.actionType) {

		case UserConstants.USER_LOAD:
			console.info("LOAD USER TRIGGERED", action)
			update(action.users)
			UserStore.emitChange()
			break;

		case UserConstants.USER_LOAD_COMPLETE:
			console.info("LOAD COMPLETE", action)
			update(action.users)
			UserStore.emitChange()
			break;

		case UserConstants.USER_CREATE:
			console.info("CREATE USER TRIGGERED", action)
			UserStore.emitChange()
			break;

		case UserConstants.USER_CREATE_COMPLETE:
			console.info("CREATE USER COMPLETE", action)
			// update(action.newUser)
			create(action.newUser)
			UserStore.emitChange()
			break;

		default:
		// no op
	}
})

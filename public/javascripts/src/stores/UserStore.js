/**
 * UserStore.js
 * @flow
 */

import AppDispatcher from "../dispatcher/AppDispatcher" // notice we don't use the braces, because it's a class import
import {UserConstants} from "../constants/UserConstants"
import assign from "object-assign"
import events from "events"

let EventEmitter = events.EventEmitter

let CHANGE_EVENT = "change"

let _users = []

function update(data) {
	return _users = data
}

export const UserStore = assign({}, EventEmitter.prototype, {

	/**
	 * Get entire collection of users
	 */

	loadUsers: function(payload) {
		console.info("load users triggered", payload)
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
			console.info("LOAD USER TRIGGERED", action);
			update(action.users)
			UserStore.emitChange();
			break;
		case UserConstants.USER_LOAD_COMPLETE:
			console.info("LOAD COMPLETE", action)
			update(action.users)
			UserStore.emitChange()
			break;
		default:
	}
})

/**
 * PerformanceUserStore.js
 * @flow
 */

"use strict";

import type {Action} from '../actions/PerformanceUserActions';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import User from '../data-records/User';
import PerformanceAppDispatcher from '../dispatcher/PerformanceAppDispatcher';

type State = Immutable.OrderedMap<string, User>;

class UserStore extends ReduceStore<string, User> {
  getInitialState(): State {
    return Immutable.OrderedMap();
  }

  reduce(state: State, action: Action) {
    switch (action.type) {
      case "user/load":
        return this.getState()
      case "user/create":
        return createUser(state, action.name, action.avatar, action.email)
      default:
       return state
    }
  }
}

function createUser(state: State, name: ?string, avatar: ?string, email: ?string) {
  if (!name || !avatar || !email) {
    console.info("you've got nothing here mate")
    return state
  }

  var newUser = new User(name, avatar, email);
  return state.set(newUser.id, newUser)
}

const instance = new UserStore(PerformanceAppDispatcher)
export default instance

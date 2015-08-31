/**
 * Users.js
 * This is an immutable class of User records,
 * think of this as an user object initial state
 * and since we're going to opt for performance
 * we will get/set these records, and not change it's state,
 * but rather create new instances of states everytime we have a new
 * set of data
 *
 * @flow
 */

"use strict";

import Immutable from "immutable";
import uuid from "node-uuid"

const UserRecord = Immutable.Record({
  id: undefined,
  name: undefined,
  avatar: undefined,
  email: undefined,
});

export default class User extends UserRecord {
  id: string;
  name: string;
  avatar: string;
  email: string;

  constructor(name: string, avatar: string, email: string) {
    super({
      id: uuid.v4(),
      name,
      avatar,
      email
    })
  }
}

/**
 * UIMainViewController.js
 * @flow
 */

import type Immutable from 'immutable';
import type {Store} from 'flux/utils';
import type User from '../data-records/User';
import {Container} from 'flux/utils';
import React, {Component} from 'react';
import UserStore from '../stores/PerformanceUserStore';
import {dispatch} from '../dispatcher/PerformanceAppDispatcher';

type State = {
  users: Immutable.Map<string, User>,
}

class UIMainViewController extends Component<{}, {}, State> {
  static getStores(): Array<Store> {
    return [UserStore]
  }

  static calculateState(prevState: ?State): State {
    return {
      users: UserStore.getState()
    }
  }

  render(): ?ReactElement {
    return (
      <main>
        <h1>Performance Testing</h1>
        <MainSection users={this.state.users} />
      </main>
    )
  }
}

class TextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || ""
    }
  }

  render() {
    return (
      <div className="input-group">
        <label style={{display: "block"}}>{this.props.label}</label>
        <input
          type="text"
          value={this.state.value}
          name={this.props.name}
          onChange={this._onChange.bind(this)} />
      </div>
    )
  }

  _onChange(e) {
    this.setState({value: e.target.value})
  }
}

class MainSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      avatar: ""
    }
  }

  render(): ?ReactElement {
    let formInputs: Array<Object> = [
      {label: "Name", ref: "name", name: "name", value: this.state.name},
      {label: "Email", ref: "email", name: "email", value: this.state.email},
      {label: "Avatar", ref: "avatar", name: "avatar", value: this.state.avatar}
    ];

    const userList = [];
    for (let [id, user] of this.props.users) {
      userList.push(
        <li key={id}>
          <span style={{display: "block"}}>Name: {user.get("name")}</span>
          <span style={{display: "block"}}>Email: {user.get("email")}</span>
          <span style={{display: "block"}}>avatar: {user.get("avatar")}</span>
          <span style={{display: "block"}}>id: {user.get("id")}</span>
        </li>
      )
    }

    return (
      <section>
        <div className="user-list">
          <h3>List of users</h3>
          <ul>
            {userList}
          </ul>
        </div>
        <form onSubmit={this._onSubmit.bind(this)}>

          {formInputs.map((input) => {
            return (
              <div className="form-group">
                <label style={{display: "block"}}>{input.label}</label>
                <input
                  type="text"
                  value={input.value}
                  onChange={this._onChange(input.name)} />
              </div>
            )
          })}

          <button type="submit">Submit</button>
        </form>
      </section>
    )
  }

  _onSubmit(e) {
    e.preventDefault()
    const {user} = this.state;
    dispatch({
      type: "user/create",
      avatar: this.state.avatar,
      email: this.state.email,
      name: this.state.name
    });
  }

  _onChange(key) {
    return function(e) {
      var state = {};
      state[key] = e.target.value
      this.setState(state)
    }.bind(this)
  }

}

const UIMainViewContainer = Container.create(UIMainViewController)

export default UIMainViewContainer

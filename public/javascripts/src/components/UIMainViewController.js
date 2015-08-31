/**
 * UIMainViewController.js
 * @flow
 */

import type Immutable from 'immutable';
import type {Store} from 'flux/utils';
import {Container} from 'flux/utils';
import React, {Component} from 'react';
import _ from "underscore-contrib";

import type User from '../data-records/User';
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
      value: this.props.value || "",
      errorStyle: "",
      errorMsg: "",
      isValid: this.props.isValid
    }
  }

  render() {
    var errorMsg;
    if (this.state.errorMsg) {
      errorMsg = <div>{this.state.errorMsg}</div>
    }
    return (
      <div className="input-group">
        <label style={{display: "block"}}>{this.props.label}</label>
        <input
          style={{"borderColor": this.state.errorStyle}}
          type="text"
          value={this.props.value}
          name={this.props.name}
          onBlur={this._validate.bind(this)}
          onChange={this.props.onChange.bind(this)} />
        {errorMsg}
      </div>
    )
  }

  _validate(e) {
    switch(this.props.type) {
      case "number":
        if (_.isNumeric(e.target.value) == false) {
          this.setState({
            errorStyle: "red",
            errorMsg: "Only Number is allowed",
            isValid: false
          })
        } else {
          this.setState({errorStyle: "", errorMsg: "", isValid: true})
        }
      break;
      case "email":
        var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
        if (!regex.test(e.target.value)) {
          this.setState({
            errorStyle: "red",
            errorMsg: "only email is allowed"
          })
        } else {
          this.setState({errorStyle: "", errorMsg: "", isValid: true})
        }
      break;
      default:
        this.setState({errorStyle: "", errorMsg: "", isValid: true})
    }
  }

}

class MainSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.users.get("name"),
      email: this.props.users.get("email"),
      avatar: this.props.users.get("avatar"),
      isValid: false,
    }
  }

  render(): ?ReactElement {
    let inputs: Array<Object> = [
      {label: "Name", ref: "name", name: "name", type: "number", value: this.state.name},
      {label: "Email", ref: "email", name: "email", type: "email", value: this.state.email},
      {label: "Avatar", ref: "avatar", name: "avatar", type: "required", value: this.state.avatar}
    ];

    let formInputs = [];
    inputs.map((input, index) => {
      formInputs.push(
        <TextInput
          key={index}
          label={input.label}
          value={input.value}
          type={input.type}
          onChange={this._onChange(input.name)} />
      )
    })

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
          {formInputs}
          <button type="submit">Submit</button>
        </form>
      </section>
    )
  }

  _onSubmit(e) {
    e.preventDefault()
    dispatch({
      type: "user/create",
      avatar: this.state.avatar,
      email: this.state.email,
      name: this.state.name
    });
    this.setState({avatar: "", email: "", name: ""})
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

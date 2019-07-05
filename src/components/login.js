
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch} from '../actions/action';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.userLoginFetch(this.state)
  }

  componentDidUpdate(){
    if (this.props.currentUser.id !== undefined){
      this.props.history.push("/storybox")
    }
  }

  render() {
    const userExist = this.props.currentUser.username !== undefined
    if ( userExist === true ) {
      return <Redirect to="/storybox" />
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>

        <label>Username</label>
        <input
          name='username'
          placeholder='Username'
          value={this.state.username}
          onChange={this.handleChange}
          /><br/>

        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
          /><br/>

        <input type='submit'/>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);

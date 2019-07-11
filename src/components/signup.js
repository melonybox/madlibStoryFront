import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userPostFetch, getAllMadlibs, getMadlibListReset} from '../actions/action';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
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
    this.props.userPostFetch(this.state)
  }

  render() {
    const userExist = this.props.currentUser.username !== undefined
    if ( userExist === true ) {
      return <Redirect to="/storybox" />
    }
    return (
      <form onSubmit={this.handleSubmit} style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center"}}>
        <p className="titleFont">SignUp For An Account</p>

        <label>Username</label>
        <input
          className="textInput"
          name='username'
          placeholder='Username'
          value={this.state.username}
          onChange={this.handleChange}
          /><br/>

        <label>Password</label>
        <input
          className="textInput"
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
          /><br/>

        <input className="button" type='submit'/>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  madLibList: state.madLibList,
  madLibLoaded: state.madLibLoaded
})

const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo)),
  getAllMadlibs: () => dispatch(getAllMadlibs()),
  getMadlibListReset: () => dispatch(getMadlibListReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

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

  componentDidUpdate(){
    const userExist = this.props.currentUser.username !== undefined
    const bothExist = userExist && this.props.madLibList.length !== 0

    if (bothExist === true){
      this.props.history.push("/storybox")
    }
    if (this.props.madLibList.length === 0) {
      this.props.getMadlibListReset()
      this.props.getAllMadlibs()
      console.log("It Goofed Boss")
    }
  }

  render() {
    const userExist = this.props.currentUser.username !== undefined
    if ( userExist === true ) {
      return <Redirect to="/storybox" />
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up For An Account</h1>

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

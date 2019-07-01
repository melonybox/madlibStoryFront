import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {logoutUser} from '../actions/action';

class NavBar extends Component {

  handleClick = event => {
    event.preventDefault()
    // Remove the token from localStorage
    localStorage.removeItem("token")
    // Remove the user object from the Redux store
    this.props.logoutUser()
  }

  render(){
    const userExist = this.props.currentUser.username !== undefined
    return(
      <div style={{display: "flex",justifyContent: "center",flexDirection: "row",alignItems: "center"}}>
        <div>
          <p style={{margin: 3, padding: 0}}>{ userExist ? this.props.currentUser.username : null}</p>
        </div>
        <div>
          <p style={{margin: 3, padding: 0}}>Story</p>
        </div>
        <div>
          <p style={{margin: 3, padding: 0}}>History</p>
        </div>
        <div>
        {this.props.currentUser.username
          ? <button onClick={this.handleClick}>Log Out</button>
          :
          <div style={{display: "flex", flexDirection: "row"}}>
            <Link to="/signup" style={{margin: 3, padding: 0}}>
                <p>SignUp</p>
            </Link>
            <Link to="/login" style={{margin: 3, padding: 0}}>
                <p>Login</p>
            </Link>
          </div>
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

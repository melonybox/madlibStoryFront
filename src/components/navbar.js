import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {logoutUser} from '../actions/action';

class NavBar extends Component {

  handleLogOut = event => {
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
      { userExist ?
        <div>
          <p style={{margin: 3, padding: 0}}> {this.props.currentUser.username}</p>
        </div>
        :
        null
      }
      { userExist ?
        <div>
          <button>
            <Link to="/storybox" style={{textDecoration: "none", color: "inherit"}}>
              Story
            </Link>
          </button>
        </div>
        :
        null
      }
        <div>
          <p style={{margin: 3, padding: 0}}>History</p>
        </div>
      { this.props.currentUser.username ?
        <div>
          <button onClick={this.handleLogOut} style={{cursor: "pointer"}}>Log Out</button>
        </div>
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

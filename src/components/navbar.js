import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {logoutUser, historyButton, historyButtonOff, historyEditDefault} from '../actions/action';

class NavBar extends Component {

  handleLogOut = event => {
    event.preventDefault()
    // Remove the token from localStorage
    localStorage.removeItem("token")
    // Remove the user object from the Redux store
    this.props.logoutUser()
    this.props.historyButtonOff()
  }

  handleHistoryDefault = () => {
    this.props.historyEditDefault()
  }

  render(){
    const userExist = this.props.currentUser.username !== undefined
    const bothExist = userExist && this.props.madLibLoaded

    if (userExist === true) {
      const userHistory = this.props.currentUser.histories.length === 0
      if (userHistory === false) {
        this.props.historyButton()
      }
    }
    return(
      <div style={{display: "flex",justifyContent: "center",flexDirection: "row",alignItems: "center"}}>
      { userExist ?
        <div>
          <p style={{margin: 3, padding: 0}}> {this.props.currentUser.username}</p>
        </div>
        :
        null
      }
      { bothExist ?
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
      { this.props.historyView ?
        <div>
          <button>
            <Link onClick={this.handleHistoryDefault} to="/historybox" style={{textDecoration: "none", color: "inherit"}}>
              History
            </Link>
          </button>
        </div>
        :
        null
      }
      { userExist ?
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
  currentUser: state.currentUser,
  historyView: state.historyView,
  madLibList: state.madLibList,
  madLibLoaded: state.madLibLoaded
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  historyButton: () => dispatch(historyButton()),
  historyButtonOff: () => dispatch(historyButtonOff()),
  historyEditDefault: () => dispatch(historyEditDefault())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

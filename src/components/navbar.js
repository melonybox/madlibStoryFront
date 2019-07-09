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
      <div className="formStuff" style={{display: "flex",justifyContent: "center",flexDirection: "row",alignItems: "center", width: "fit-content"}}>
      { userExist ?
        <div>
          <p style={{margin: 3, padding: 0, fontSize: "0.74rem"}}> {this.props.currentUser.username}</p>
        </div>
        :
        null
      }
      { bothExist ?
        <div style={{paddingBottom: "2px", margin: "0px 3px"}}>
          <Link to="/storybox" style={{textDecoration: "none", boxSizing: "border-box", margin: "0em", font: "400 11px system-ui", padding: "1px 7px 2px", borderWidth: "1px", borderStyle: "solid", borderImage: "initial"}}>
            Story
          </Link>
        </div>
        :
        null
      }
      { this.props.historyView ?
        <div style={{paddingBottom: "2px", margin: "0px 3px"}}>
          <Link onClick={this.handleHistoryDefault} to="/historybox" style={{textDecoration: "none", boxSizing: "border-box", margin: "0em", font: "400 11px system-ui", padding: "1px 7px 2px", borderWidth: "1px", borderStyle: "solid", borderImage: "initial"}}>
            History
          </Link>
        </div>
        :
        null
      }
      { userExist ?
        <div>
          <button onClick={this.handleLogOut} style={{cursor: "pointer"}}>
            Log Out
          </button>
        </div>
        :
        <div style={{display: "flex",justifyContent: "center",flexDirection: "row",alignItems: "center", paddingBottom: "2px", position: "relative", bottom: "-2px"}}>
          <Link to="/signup" style={{textDecoration: "none", boxSizing: "border-box", margin: "0px 3px", font: "400 11px system-ui", padding: "1px 7px 2px", borderWidth: "1px", borderStyle: "solid", borderImage: "initial"}}>
              SignUp
          </Link>
          <Link to="/login" style={{textDecoration: "none", boxSizing: "border-box", margin: "0px 3px", font: "400 11px system-ui", padding: "1px 7px 2px", borderWidth: "1px", borderStyle: "solid", borderImage: "initial"}}>
              Login
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

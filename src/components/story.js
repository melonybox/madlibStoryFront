import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {beginStory} from './actions/action';
class Story extends Component {

  handleBeginStory = event => {
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
        <p>Hi {this.props.currentUser.username}</p>
        { noChapter ?
          <button onClick={this.handleBeginStory} style={{cursor: "pointer"}}>
            Start
          </button>
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})


export default connect(mapStateToProps, mapDispatchToProps)(Story);

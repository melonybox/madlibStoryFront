import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {beginStory,returnChapter} from '../actions/action';
import StoryForm from '../components/storyform';
import Story from '../components/story';

class StoryBox extends Component {


  render(){
    const userExist = this.props.currentUser.username !== undefined
    const noChapter = this.props.currentUser.current_chapter === null
    const hasChapter = parseInt(this.props.currentUser.current_chapter) > null
    const madlibLength = this.props.madLibList.length
    if ( userExist === false ) {
      return <Redirect to="/" />
    }
    // } else if ( hasChapter === true ) {
    //   this.props.returnChapter()
    // } else if ( this.props.currentUser.current_chapter === madlibLength ) {
    //   this.props.history.push("/historybox")
    // }

    switch (this.props.viewType) {
      case "form":
        return <StoryForm />
      case "story":
        return <Story />
      default:
      if ( this.props.madLibList !== undefined ) {
      return (
        <div style={{display: "flex",justifyContent: "center",flexDirection: "row",alignItems: "center"}}>
          <p>Hi {this.props.currentUser.username}</p>
          { noChapter ?
            <button onClick={this.props.beginStory} style={{cursor: "pointer"}}>
              Start
            </button>
            :
            null
          }
        </div>
        )
      } else {
        return (
          null
        )
      }
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  viewType: state.viewType,
  madLibList: state.madLibList
})

const mapDispatchToProps = dispatch => ({
  beginStory: () => dispatch(beginStory()),
  returnChapter: () => dispatch(returnChapter())
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryBox);

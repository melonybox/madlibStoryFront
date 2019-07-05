import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {beginStory,returnChapter} from '../actions/action';
import StoryForm from '../components/storyform';
import Story from '../components/story';

class StoryBox extends Component {

  handleReturnChapter = () => {
    this.props.returnChapter()
  }

  handleHistoryClick = () => {
    this.props.history.push("/historybox")
  }


  render(){
    const userExist = this.props.currentUser.username !== undefined
    const noChapter = this.props.currentUser.current_chapter === 0
    const hasChapter = parseInt(this.props.currentUser.current_chapter) > 0
    const madlibLength = this.props.madLibList.length === parseInt(this.props.currentUser.current_chapter)
    const resumeChapter = (madlibLength !== hasChapter)
    const bothExist = userExist && this.props.madLibList.length !== 0
    if ( userExist === false && bothExist === false ) {
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
      if (this.props.madLibList.length !== 0) {
      return (
        <div style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center"}}>
          <p>Hi {this.props.currentUser.username}</p>
          { noChapter ?
            <button onClick={this.props.beginStory} style={{cursor: "pointer"}}>
              Start
            </button>
            :
            null
          }
          { resumeChapter ?
            <button onClick={this.handleReturnChapter} style={{cursor: "pointer"}}>
              Resume
            </button>
            :
            null
          }
          { madlibLength ?
            <div>
              <p>
                Completed.
              </p>
            </div>
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

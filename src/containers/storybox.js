import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {beginStory} from '../actions/action';
import StoryForm from '../components/storyform';
import Story from '../components/story';

class StoryBox extends Component {

  render(){
    const userExist = this.props.currentUser.username !== undefined
    const noChapter = this.props.currentUser.current_chapter === null
    if ( userExist === false ) {
      return <Redirect to="/" />
    }

    switch (this.props.viewType) {
      case "form":
        return <StoryForm />
      case "story":
        return <Story />
      default:
      return(
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
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  viewType: state.viewType
})

const mapDispatchToProps = dispatch => ({
  beginStory: () => dispatch(beginStory())
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryBox);

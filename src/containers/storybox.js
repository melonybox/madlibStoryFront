import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {beginStory} from '../actions/action';
import StoryForm from '../components/storyform';

class StoryBox extends Component {

  state = {
    viewType: null
  }

  handleBeginStory = () => {
    this.setState({
      viewType: "form"
    })
  }

  render(){
    const userExist = this.props.currentUser.username !== undefined
    const noChapter = this.props.currentUser.current_chapter === null
    if ( userExist === false ) {
      return <Redirect to="/" />
    }

    switch (this.state.viewType) {
      case "form":
        return <StoryForm />
      default:
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
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  beginStory: () => dispatch(beginStory())
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryBox);

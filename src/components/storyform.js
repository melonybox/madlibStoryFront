import React, {Component} from 'react';
import {connect} from 'react-redux';

class StoryForm extends Component {

  render(){
    return(
      <div style={{display: "flex",justifyContent: "center",flexDirection: "row",alignItems: "center"}}>
        <p>Hi {this.props.currentUser.username}! This is a form!</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})


export default connect(mapStateToProps, null)(StoryForm);

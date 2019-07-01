import React, {Component} from 'react';
import {connect} from 'react-redux';

class Story extends Component {

  state = {
    madlibTemplate: this.props.madLibList[0].template,
    madLibRegex: null
  }

  completedMadLib = () => {
    return this.state.madlibTemplate.replace(this.replaceWordsRegex(), (matched) => {
      return this.props.madLibCompObj[matched];
    });
  }

  replaceWords = () => {
    return Object.keys(this.props.madLibCompObj).map((entry,idx) => {
      return entry
    })
  }

  replaceWordsRegex = () => {
    return new RegExp(this.replaceWords().join("|"), 'gi')
  }

  render(){
    return(
      <div style={{display: "flex",justifyContent: "center",flexDirection: "row",alignItems: "center"}}>
        {this.completedMadLib()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  madLibList: state.madLibList,
  madLibCompObj: state.madLibCompObj
})


export default connect(mapStateToProps, null)(Story);

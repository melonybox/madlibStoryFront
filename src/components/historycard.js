import React, {Component} from 'react';
import {connect} from 'react-redux';

class HistoryCard extends Component {

  render(){
    let currMadLib = this.props.currMadLib

    return(
      <div style={{display: "flex", justifyContent: "center",flexDirection: "row",alignItems: "center"}}>
        <p>{this.props.madLibList[currMadLib.madlib_id - 1].title}</p>
        <button style={{cursor: "pointer"}}>
          View
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  madLibList: state.madLibList
})

export default connect(mapStateToProps, null)(HistoryCard);

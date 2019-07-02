import React, {Component} from 'react';
import {connect} from 'react-redux';
import {historyEditView, setCurrMadlibEdit} from '../actions/action';


class HistoryCard extends Component {

  handleOnClick = () => {
    this.props.historyEditView()
    this.props.setCurrMadlibEdit(this.props.currMadLib)
  }

  render(){
    let currMadLib = this.props.currMadLib

    return(
      <div style={{display: "flex", justifyContent: "center",flexDirection: "row",alignItems: "center"}}>
        <p>{this.props.madLibList[currMadLib.madlib_id - 1].title}</p>
        <button onClick={this.handleOnClick} style={{cursor: "pointer"}}>
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

const mapDispatchToProps = dispatch => ({
  historyEditView: () => dispatch(historyEditView()),
  setCurrMadlibEdit: data => dispatch(setCurrMadlibEdit(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCard);

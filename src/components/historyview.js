import React, {Component} from 'react';
import {connect} from 'react-redux';
import {historyEditForm} from '../actions/action';

class HistoryView extends Component {

  state = {
    madlibTemplate: this.props.madLibList[(this.props.currMadLibEdit.madlib_id - 1)].template,
    filledObj: JSON.parse(this.props.currMadLibEdit.placeHolderFilled)
  }

  completedMadLib = () => {
    return this.state.madlibTemplate.replace(this.replaceWordsRegex(), (matched) => {
      return this.state.filledObj[matched];
    });
  }

  replaceWords = () => {
    return Object.keys(this.state.filledObj).map((entry,idx) => {
      return entry
    })
  }

  replaceWordsRegex = () => {
    return new RegExp(this.replaceWords().join("|"), 'gi')
  }

  handleEditClick = () => {
    this.props.historyEditForm()
  }

  render(){
    return(
      <div style={{display: "flex", justifyContent: "center",flexDirection: "column",alignItems: "center"}}>
        <p>{this.completedMadLib()}</p>
        <div style={{display: "flex", justifyContent: "center",flexDirection: "row",alignItems: "center"}}>
          <button style={{cursor: "pointer"}}>
            Save
          </button>
          <button onClick={this.handleEditClick} style={{cursor: "pointer"}}>
            Edit
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  madLibList: state.madLibList,
  currMadLibEdit: state.currMadLibEdit
})

const mapDispatchToProps = dispatch => ({
  historyEditForm: () => dispatch(historyEditForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryView);

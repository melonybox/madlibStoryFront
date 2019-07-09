import React, {Component} from 'react';
import {connect} from 'react-redux';
import HistoryCard from '../components/historycard';
import {removeAllHistories} from '../actions/action';

class HistorySelect extends Component {

  handleOnClick = () => {
    let currUserId = this.props.currentUser.id
    this.props.removeAllHistories(currUserId)
    this.props.historyStuff.push("/storybox")
  }

  render(){
    let userMadLib = this.props.currentUser.histories

    return(
      <div className="formStuff" style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center", marginTop: "16px"}}>
        <div>
          {userMadLib.map(saved => {
            return  <HistoryCard key={saved.id} currMadLib={saved}/>
          })}
        </div>
        <div>
          <button onClick={this.handleOnClick} style={{cursor: "pointer"}}>
            Delete All
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  madLibList: state.madLibList,
  madLibLoaded: state.madLibLoaded
})

const mapDispatchToProps = dispatch => ({
  removeAllHistories: data => dispatch(removeAllHistories(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(HistorySelect);

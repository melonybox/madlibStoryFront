import React, {Component} from 'react';
import {connect} from 'react-redux';
import HistoryCard from '../components/historycard';

class HistorySelect extends Component {

  render(){
    let userMadLib = this.props.currentUser.histories

    return(
      <div>
        {userMadLib.map(saved => {
          return  <HistoryCard key={saved.id} currMadLib={saved}/>
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  madLibList: state.madLibList,
  madLibLoaded: state.madLibLoaded
})

export default connect(mapStateToProps, null)(HistorySelect);

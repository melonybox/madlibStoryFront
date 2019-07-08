import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import HistorySelect from '../containers/historyselect';
import HistoryView from '../components/historyview';
import HistoryForm from '../components/historyform';

class HistoryBox extends Component {

  render(){
    const userExist = this.props.currentUser.username !== undefined
    if ( userExist === false ) {
      return <Redirect to="/" />
    }
    switch (this.props.madLibEditType) {
      case "view":
        return <HistoryView />
      case "form":
        return <HistoryForm />
      default:
        return <HistorySelect historyStuff={this.props.history}/>

      }
    }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  madLibEditType: state.madLibEditType
})

export default connect(mapStateToProps, null)(HistoryBox);

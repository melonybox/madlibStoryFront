import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import HistorySelect from '../containers/historyselect';

class HistoryBox extends Component {

  render(){
    const userExist = this.props.currentUser.username !== undefined
    if ( userExist === false ) {
      return <Redirect to="/" />
    }

      return(
        <div style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center"}}>
          <p>Hi {this.props.currentUser.username}</p>
          <HistorySelect />
        </div>
      )

  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
})

export default connect(mapStateToProps, null)(HistoryBox);

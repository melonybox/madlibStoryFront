import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserFetch, getAllMadlibs} from './actions/action';
import Signup from './components/signup';
import Login from './components/login';
import NavBar from './components/navbar';


class App extends Component {
  componentDidMount = () => {
    if (!this.props.currentUser === false) {
      this.props.getUserFetch()
      this.props.getAllMadlibs()
    }
  }

  render() {
    if (this.props.madLibLoaded === true) {
      var test = this.props.madLibList[0].template
      var testa = JSON.parse(this.props.madLibList[0].placeHolderEmpty)
      let regEx = /(<\w*?>)/gi;
      let replaceWords = Object.keys(testa).map((entry,idx) => {
        return entry
      })
      let replaceWordsRegex = new RegExp(replaceWords.join("|"), 'gi')
      testa["<spell>"] = "Aemono"
      testa["<person>"] = "Billy Bob"
      let testc = test.replace(replaceWordsRegex, function(matched){
        return testa[matched];
      });
      debugger
    }
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  madLibList: state.madLibList,
  madLibLoaded: state.madLibLoaded
})

const mapDispatchToProps = dispatch => ({
  getUserFetch: () => dispatch(getUserFetch()),
  getAllMadlibs: () => dispatch(getAllMadlibs())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

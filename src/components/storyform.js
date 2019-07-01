import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fillList} from '../actions/action';

class StoryForm extends Component {

  state = {
    madlibTemplate: this.props.madLibList[0].template,
    madLibObj: JSON.parse(this.props.madLibList[0].placeHolderEmpty)
  }

  handleChange = (event) => {
    this.setState({
      madLibObj: {
        ...this.state.madLibObj,
        [event.target.name]: event.target.value
      }
    },() => console.log(this.state.madLibObj))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.fillList(this.state.madLibObj)
    console.log("hi")
  }

  render(){
    return(
      <div style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center"}}>
        <div>
          <p>Hi {this.props.currentUser.username}! This is a form!</p>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            {Object.keys(this.state.madLibObj).map((entry, idx) => {
              let placeholderSentence = `Enter a ${entry}:`
              return(
              <div key={idx}>
                <label>{placeholderSentence}</label>
                <input
                onChange={this.handleChange}
                value={this.state.madLibObj[entry]}
                type="text"
                name={entry}
                placeholder={entry} />
              </div>)
            })}
            <div style={{textAlign: "center"}}>
              <input type="submit" value="Submit"/>
            </div>
          </form>
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
  fillList: data => dispatch(fillList(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm);

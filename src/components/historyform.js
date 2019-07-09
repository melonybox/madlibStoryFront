import React, {Component} from 'react';
import {connect} from 'react-redux';
import {historyEditView,updateFavorite} from '../actions/action';

class HistoryForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    filledObj: JSON.parse(this.props.currMadLibEdit.placeHolderFilled),
    madlibTitle: this.props.madLibList[this.props.currMadLibEdit.madlib_id - 1].title
  }

  handleChange = (event) => {
    this.setState({
      filledObj: {
        ...this.state.filledObj,
        [event.target.name]: event.target.value
      }
    })
  }

  // handleChange = (event) => {
  //   this.setState({
  //     filledObj: {
  //       ...this.state.filledObj,
  //       [event.target.name]: event.target.value
  //     }
  //   },() => console.log(this.state.filledObj))
  // }

  handleSubmit = (event) => {
    event.preventDefault()
    const {id,user_id,madlib_id} = this.props.currMadLibEdit
    let data = {user_id: user_id,
                madlib_id: madlib_id,
                placeHolderFilled: JSON.stringify(this.state.filledObj)
              }
    let dataArray = [id,data]
    this.props.updateFavorite(dataArray)
  }

  render(){
    return(
      <div style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center"}}>
        <div>
          <p className="titleFont">Chapter Title: {this.state.madlibTitle}</p>
        </div>
        <div>
          <form className="formStuff" onSubmit={this.handleSubmit} autoComplete="off">
            {Object.keys(this.state.filledObj).map((entry, idx) => {
              let placeholderSentence = `Enter a ${entry}:`
              return(
              <div key={idx}>
                <label>{placeholderSentence}</label>
                <input
                className="textInput"
                onChange={this.handleChange}
                value={this.state.filledObj[entry]}
                type="text"
                name={entry}
                placeholder={entry} />
              </div>)
            })}
            <div style={{textAlign: "center"}}>
              <input className="button" type="submit" value="Submit"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  currMadLibEdit: state.currMadLibEdit,
  madLibList: state.madLibList
})

const mapDispatchToProps = dispatch => ({
  historyEditView: () => dispatch(historyEditView()),
  updateFavorite: data => dispatch(updateFavorite(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryForm);

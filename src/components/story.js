import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postFavorite, nextChapter} from '../actions/action';

class Story extends Component {

  state = {
    madlibTemplate: this.props.madLibList[this.props.currentUser.current_chapter].template,
    madLibRegex: null
  }

  completedMadLib = () => {
    this.handleSaveChapter()
    return this.state.madlibTemplate.replace(this.replaceWordsRegex(), (matched) => {
      return this.props.madLibCompObj[matched];
    });
  }

  replaceWords = () => {
    return Object.keys(this.props.madLibCompObj).map((entry,idx) => {
      return entry
    })
  }

  replaceWordsRegex = () => {
    return new RegExp(this.replaceWords().join("|"), 'gi')
  }

  handleSaveChapter = () => {
    let madLibCompObjSave = JSON.stringify(this.props.madLibCompObj)
    let madLibCurrChapter = (this.props.currentUser.current_chapter + 1)
    let data = {user_id: this.props.currentUser.id,
                madlib_id: madLibCurrChapter,
                placeHolderFilled: madLibCompObjSave
              }
    this.props.postFavorite(data)
  }

  handleNextChapter = () => {
    this.props.nextChapter()
  }

  render(){
    let madLibListLength = (this.props.madLibList.length - 1)
    let userCurrentChapter = this.props.currentUser.current_chapter
    let finalChapter = (madLibListLength === userCurrentChapter)

    return(
      <div style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center"}}>
        <div>
          {this.completedMadLib()}
        </div>
        { finalChapter ?
          null
          :
          <button onClick={this.handleNextChapter} style={{cursor: "pointer"}}>
            Next Chapter
          </button>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  madLibList: state.madLibList,
  madLibCompObj: state.madLibCompObj
})

const mapDispatchToProps = dispatch => ({
  postFavorite: data => dispatch(postFavorite(data)),
  nextChapter: () => dispatch(nextChapter())
})

export default connect(mapStateToProps, mapDispatchToProps)(Story);

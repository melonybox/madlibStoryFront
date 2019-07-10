import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postFavorite, nextChapter,setSaveStateTrue} from '../actions/action';

class Story extends Component {

  state = {
    madlibTemplate: this.props.madLibList[parseInt(this.props.currentUser.current_chapter)].template,
    madlibTitle: this.props.madLibList[parseInt(this.props.currentUser.current_chapter)].title,
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
    if (this.props.saveState === false) {
      let madLibCompObjSave = JSON.stringify(this.props.madLibCompObj)
      let madLibCurrChapter = (parseInt(this.props.currentUser.current_chapter) + 1)
      let data = {user_id: this.props.currentUser.id,
                  madlib_id: madLibCurrChapter,
                  placeHolderFilled: madLibCompObjSave
                }
      this.props.postFavorite(data)
      this.props.setSaveStateTrue()
    }
  }

  handleNextChapter = () => {
    this.props.nextChapter()
  }

  render(){
    let madLibListLength = (this.props.madLibList.length - 1)
    let userCurrentChapter = parseInt(this.props.currentUser.current_chapter)
    let finalChapter = (madLibListLength === userCurrentChapter)

    return(
      <div style={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center"}}>
        <div>
          <p className="titleFont">Chapter Title: {this.state.madlibTitle}</p>
        </div>
        <p className="formStuff" style={{width: "66%", position: "relative", top: "-16px"}}>
            {this.completedMadLib()}
        </p>
        { finalChapter ?
          <div>
            <p>
              You have completeled the story {this.props.currentUser.username}.
            </p>
          </div>
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
  madLibCompObj: state.madLibCompObj,
  saveState: state.saveState
})

const mapDispatchToProps = dispatch => ({
  postFavorite: data => dispatch(postFavorite(data)),
  nextChapter: () => dispatch(nextChapter()),
  setSaveStateTrue: () => dispatch(setSaveStateTrue())
})

export default connect(mapStateToProps, mapDispatchToProps)(Story);

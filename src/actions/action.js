export const getUserFetch = () => {
  return dispatch => {
    const token = localStorage.getItem("token")
    if (token) {
      return fetch("http://localhost:3000/api/v1/auto_login", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.errors) {
            // An error will occur if the token is invalid.
            // If this happens, you may want to remove the invalid token.
            localStorage.removeItem("token")
					  alert(data.errors)
          } else {
            if (data.current_chapter === null) {
              data.current_chapter = 0
              dispatch(loginUser(data))
            } else {
              dispatch(loginUser(data))
              dispatch(historyButton())
            }
          }
        })
    }
  }
}

export const userLoginFetch = user => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.errors) {
          // Here you should have logic to handle invalid login credentials.
          // This assumes your Rails API will return a JSON object with a key of
          // 'message' if there is an error
          localStorage.removeItem("token")
          alert(data.errors)
        } else {
          // localStorage.setItem("token", data.token)
          // dispatch(loginUser(data.user))
          if (data.user.current_chapter === null) {
            data.user.current_chapter = 0
            dispatch(loginUser(data.user))
            localStorage.setItem("token", data.token)
          } else {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data.user))
            dispatch(historyButton())
          }
        }
      })
  }
}

export const userPostFetch = user => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.errors) {
          // Here you should have logic to handle invalid creation of a user.
          // This assumes your Rails API will return a JSON object with a key of
          // 'message' if there is an error with creating the user, i.e. invalid username
          localStorage.removeItem("token")
          alert(data.errors)
        } else {
          if (data.user.current_chapter === null) {
            data.user.current_chapter = 0
            dispatch(loginUser(data.user))
            localStorage.setItem("token", data.token)
          }
        }
      })
  }
}

export const postFavorite = data => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/histories", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.errors) {
          // Here you should have logic to handle invalid creation of a user.
          // This assumes your Rails API will return a JSON object with a key of
          // 'message' if there is an error with creating the user, i.e. invalid username
          alert(data.errors)
        } else {
          if (data.madlib_id === 1) {
            dispatch(historyButton())
          }
          dispatch(updateUserHistory(data))
          console.log("Saved!")
        }
      })
  }
}

export const updateFavorite = data => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/histories/${data[0]}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data[1])
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.errors) {
          // Here you should have logic to handle invalid creation of a user.
          // This assumes your Rails API will return a JSON object with a key of
          // 'message' if there is an error with creating the user, i.e. invalid username
          alert(data.errors)
        } else {
          dispatch(historyEditDefault())
          dispatch(updateFavoriteArray(data))
          console.log("Updated!")
        }
      })
  }
}

export const updateFavoriteArray = data => {
  return (dispatch, getState) => {
    let newArray = getState().currentUser.histories
    let updateArray = newArray.map((history)=>{
      if (history.id === data.id) {
        return data
      } else {
        return history
      }
    })
    dispatch(updateFavoriteArrayState(updateArray))
  }
}

export const getAllMadlibs = () => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/madlibs", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
          }
        })
          .then(resp => resp.json())
          .then(data => dispatch(getMadlibList(data)),
                        console.log("Loaded Madlibs"))
  }
}

export const removeAllHistories = data => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/histories/${data}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          .then(resp => resp.json())
          .then(data => dispatch(historyButtonOff()),
                        dispatch(clearHistories()),
                        dispatch(defaultViewType())
                      )
  }
}

export const clearHistories = () => ({
    type: 'CLEAR_HISTORIES'
})

export const getMadlibList = data => ({
    type: 'GET_MADLIBLIST',
    payload: data
})

export const fillList = data => ({
    type: 'FILL_LIST',
    payload: data
})

export const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

export const beginStory = () => ({
  type: 'BEGIN_STORY'
})

export const nextChapter = () => ({
  type: 'NEXT_CHAPTER'
})

export const historyButton = () => ({
  type: 'HISTORY_VIEW'
})

export const historyButtonOff = () => ({
  type: 'HISTORY_VIEW_OFF'
})

export const historyEditDefault = () => ({
  type: 'HISTORY_EDIT_DEFAULT'
})

export const historyEditView = () => ({
  type: 'HISTORY_EDIT_VIEW'
})

export const historyEditForm = () => ({
  type: 'HISTORY_EDIT_FORM'
})

export const setCurrMadlibEdit = data => ({
  type: 'SET_CURR_MADLIB_EDIT',
  payload: data
})

export const updateFavoriteArrayState = data => ({
  type: 'UPDATE_FAVORITE_ARRAY_STATE',
  payload: data
})

export const setEditViewFalse = () => ({
  type: 'SET_EDIT_VIEW_FALSE',
})

export const setEditViewTrue = () => ({
  type: 'SET_EDIT_VIEW_TRUE',
})

export const updateUserHistory = (data) => ({
  type: 'UPDATE_USER_HISTORY',
  payload: data
})

export const setSaveStateTrue = () => ({
  type: 'SET_SAVE_STATE_TRUE'
})

export const setSaveStateFalse = () => ({
  type: 'SET_SAVE_STATE_FALSE'
})

export const returnChapter = () => ({
  type: 'RETURN_CHAPTER'
})

export const getMadlibListReset = () => ({
  type: 'GET_MADLIBLIST_RESET'
})

export const defaultViewType = () => ({
  type: 'DEFAULT_STORY_VIEW'
})

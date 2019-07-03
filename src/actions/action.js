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
            dispatch(loginUser(data))
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
          localStorage.setItem("token", data.token)
          dispatch(loginUser(data.user))

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
          localStorage.setItem("token", data.token)
          dispatch(loginUser(data.user))

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
          console.log("Saved!")
        }
      })
  }
}

export const updateFavorite = data => {
  debugger
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
          dispatch(historyEditDefault())
          console.log("Updated!")
        }
      })
  }
}

export const getAllMadlibs = () => {
  return dispatch => {
    fetch("http://localhost:3000/api/v1/madlibs", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
          }
        })
          .then(resp => resp.json())
          .then(data => dispatch(getMadlibList(data)))
  }
}

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

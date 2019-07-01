const initialState = {
  currentUser: {},
  madLibList: [],
  madLibLoaded: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUser: action.payload}
      case 'LOGOUT_USER':
        return {...state, currentUser: {} }
      case 'GET_MADLIBLIST':
        return {...state, madLibList: action.payload, madLibLoaded: true}
      case 'BEGIN_STORY':
      debugger
        return {...state, currentUser: action.payload}
      default:
        return state;
    }
  }

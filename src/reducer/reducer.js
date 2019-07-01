const initialState = {
  currentUser: {},
  madLibList: [],
  madLibLoaded: false,
  madLibCompObj: {},
  viewType: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUser: action.payload}
      case 'LOGOUT_USER':
        return {...state, currentUser: {}}
      case 'GET_MADLIBLIST':
        return {...state, madLibList: action.payload, madLibLoaded: true}
      case 'BEGIN_STORY':
        return {...state, viewType: "form"}
      case 'FILL_LIST':
        return {...state, madLibCompObj: action.payload, viewType: "story"}
      default:
        return state;
    }
  }

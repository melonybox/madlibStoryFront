const initialState = {
  currentUser: {},
  madLibList: [],
  madLibLoaded: false,
  madLibCompObj: {},
  viewType: null,
  historyView: false,
  madLibEditType: null,
  currMadLibEdit: null,
  updateEditView: false,
  saveState: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUser: action.payload}
      case 'LOGOUT_USER':
        return {...state, currentUser: {}}
      case 'GET_MADLIBLIST':
        return {...state, madLibList: action.payload, madLibLoaded: true}
      case 'HISTORY_VIEW':
        return {...state, historyView: true}
      case 'HISTORY_VIEW_OFF':
        return {...state, historyView: false}
      case 'HISTORY_EDIT_DEFAULT':
        return {...state, madLibEditType: null}
      case 'HISTORY_EDIT_VIEW':
        return {...state, madLibEditType: "view"}
      case 'HISTORY_EDIT_FORM':
        return {...state, madLibEditType: "form"}
      case 'SET_CURR_MADLIB_EDIT':
        return {...state, currMadLibEdit: action.payload}
      case 'SET_EDIT_VIEW_FALSE':
        return {...state, madLibEditType: false}
      case 'SET_EDIT_VIEW_TRUE':
        return {...state, madLibEditType: true}
      case 'SET_SAVE_STATE_TRUE':
        return {...state, saveState: true}
      case 'SET_SAVE_STATE_FALSE':
        return {...state, saveState: false}
      case 'UPDATE_FAVORITE_ARRAY_STATE':
        return {...state, currentUser: {
          ...state.currentUser,
          histories: action.payload
        }
      }
      case 'UPDATE_USER_HISTORY':
        return {...state, currentUser: {
          ...state.currentUser,
          histories: [...state.currentUser.histories, action.payload]
        }
      }
      case 'BEGIN_STORY':
        return {...state, viewType: "form",
        currentUser: {
          ...state.currentUser,
          current_chapter: 0
        }
      }
      case 'NEXT_CHAPTER':
        return {...state, viewType: "form",
        currentUser: {
          ...state.currentUser,
          current_chapter: state.currentUser.current_chapter+1
        }
      }
      case 'FILL_LIST':
        return {...state, madLibCompObj: action.payload, viewType: "story"}
      default:
        return state;
    }
  }

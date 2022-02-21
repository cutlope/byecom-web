import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_SIGNUP,
  FETCH_AUTH,
  FETCH_SHOW,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  initialURL: '/',
  error: '',
  message: '',
  loading: false,
  signup: '',
  userauth: '',
  setshow: false,
};

const Common = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: '', message: '', loading: true };
    }
    case FETCH_SUCCESS: {
      return { ...state, error: '', loading: false, message: action.payload };
    }
    case FETCH_ERROR: {
      return { ...state, loading: false, message: '', error: action.payload };
    }
    case FETCH_SIGNUP: {
      return { ...state, loading: false, signup: action.value };
    }
    case FETCH_AUTH: {
      return { ...state, loading: false, userauth: action.value };
    }
    case FETCH_SHOW: {
      return { ...state, loading: false, setshow: action.value };
    }
    default:
      return state;
  }
};

export default Common;

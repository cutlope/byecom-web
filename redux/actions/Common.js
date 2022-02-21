import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS,FETCH_SIGNUP,FETCH_AUTH,FETCH_SHOW } from '../../@jumbo/constants/ActionTypes';

export const fetchSuccess = (message) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUCCESS,
      payload: message || '',
    });
  };
};
export const fetchError = (error) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
  };
};

export const fetchStart = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_START,
    });
  };
};
export const fetchsignup = (value) =>({
  type: FETCH_SIGNUP,
  value
});
export const fetchAuth = (value) =>({
  type: FETCH_AUTH,
  value
});
export const fetchAuthShow = (value) =>({
  type: FETCH_SHOW,
  value
});


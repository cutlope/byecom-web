import { FETCH_TEMPLATE, FETCH_SELECTTEMPLATE } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  template: [],
  selecttemplate: '',
};

const Template = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_TEMPLATE: {
      return { ...state, loading: false, template: action.value };
    }
    case FETCH_SELECTTEMPLATE: {
      return { ...state, loading: false, selecttemplate: action.value };
    }

    default:
      return state;
  }
};

export default Template;

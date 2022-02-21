import { FETCH_CUSTOMER, FETCH_SELECTCUSTOMER } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  customer: [],
  selectcustomer: '',
};

const Customer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER: {
      return { ...state, loading: false, customer: action.value };
    }
    case FETCH_SELECTCUSTOMER: {
      return { ...state, loading: false, selectcustomer: action.value };
    }

    default:
      return state;
  }
};

export default Customer;

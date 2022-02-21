import { FETCH_CUSTOMER,FETCH_SELECTCUSTOMER } from '../../@jumbo/constants/ActionTypes';


export const fetchCustomer = (value) =>({
  type: FETCH_CUSTOMER,
  value
});
export const fetchselectCustomer = (value) =>({
  type: FETCH_SELECTCUSTOMER,
  value
});

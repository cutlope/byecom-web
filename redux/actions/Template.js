import { FETCH_TEMPLATE,FETCH_SELECTTEMPLATE } from '../../@jumbo/constants/ActionTypes';


export const fetchTemplate = (value) =>({
  type: FETCH_TEMPLATE,
  value
});
export const fetchselectTemplate = (value) =>({
  type: FETCH_SELECTTEMPLATE,
  value
});

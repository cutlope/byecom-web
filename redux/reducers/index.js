import { combineReducers } from 'redux';

import Common from './Common';
import Dashboard from './Dashboard';
import TaskList from './TaskList';
import MailApp from './MailApp';
import Chat from './Chat';
import ContactApp from './ContactApp';
import ProfileApp from './ProfileApp';
import WallApp from './WallApp';
import Users from './Users';
import Customer from './Customer';
import Template from './Template';

export default combineReducers({
  common: Common,
  taskList: TaskList,
  dashboard: Dashboard,
  mailApp: MailApp,
  chat: Chat,
  contactApp: ContactApp,
  profileApp: ProfileApp,
  wallApp: WallApp,
  usersReducer: Users,
  Customer:Customer,
  Template:Template
});

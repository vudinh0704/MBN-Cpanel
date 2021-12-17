import { combineReducers } from 'redux';
import inboxesReducer from './inbox-reducer';
import userReducer from './user-reducer';
import functionReducer from './function-reducer';
import roleReducer from './role-reducer';
import otpReducer from './otp-reducer';
// import notify from './notifyReducer';
// import suggest from './suggestReducer'

const rootReducer = combineReducers({
  func: functionReducer,
  inbox: inboxesReducer,
  user: userReducer,
  otp: otpReducer,
  role: roleReducer

  // notify: notifyReducer,
  // suggest: suggestReducer,
});

export default rootReducer;

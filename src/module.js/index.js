import { combineReducer } from 'redux';
import users from './users';

const rootReducer = combineReducer({ users });

export default rootReducer;
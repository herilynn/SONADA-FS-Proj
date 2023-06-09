import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import groupsReducer from './group';
import searchReducer from './search';
import membershipsReducer from './memberships';
// import usersReducer from './members';

const rootReducer = combineReducers({
  session: sessionReducer,
  // user: usersReducer, 
  groups: groupsReducer,
  search: searchReducer,
  memberships: membershipsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
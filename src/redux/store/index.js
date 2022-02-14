import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import login from '../reducers/login';

const store = createStore(
  login,
  composeWithDevTools(applyMiddleware(thunk)),
);

if (window.Cypress) {
  window.store = store;
}

export default store;

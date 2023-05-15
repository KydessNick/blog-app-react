import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import thunk from 'redux-thunk';

import App from './components/App/App';
import store from './store/store';
// import { articlesReducer } from './redux/article-reducer';
// import { userReducer } from './redux/user-reducer';

// const rootReducer = combineReducers({
//   articles: articlesReducer,
//   user: userReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

import { configureStore } from '@reduxjs/toolkit';

// import { articlesReducer } from './redux/articles-reducer';
import articleSliceReducer from './redux/articleSlice';
import userSliceReducer from './redux/userSlice';

const store = configureStore({
  reducer: {
    articles: articleSliceReducer,
    user: userSliceReducer,
  },
});

export default store;

// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import thunk from 'redux-thunk';

// import { articlesReducer } from './redux/articles-reducer';
// import { userReducer } from './redux/user-reducer';

// const rootReducer = combineReducers({
//   articles: articlesReducer,
//   user: userReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store

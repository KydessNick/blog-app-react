export const getArticle = (slug, token) => async (dispatch) => {
  await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(setCurrentArticle(res.article));
      dispatch(setLoading(false));
    })
    .catch(() => {
      dispatch(setArticlesError(true));
    });
};

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getArticles = createAsyncThunk('articles/getArticles', async (payload, { dispatch }) => {
  const { offset, token } = payload;
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const res = await response.json();
    dispatch(setArticles(res.articles));
    dispatch(setTotalPage(res.articlesCount));
    dispatch(setLoading(false));
    return res.articles;
  } catch (err) {
    dispatch(setArticlesError(true));
  }
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    currentArticle: {},
    isLoading: false,
    articlesError: null,
    totalPage: 0,
    offset: 0,
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setArticlesError: (state, action) => {
      state.articlesError = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
    },
  },
});

export default articlesSlice.reducer;
export const { setArticles, setTotalPage, setArticlesError, setLoading, setOffset, setCurrentArticle } =
  articlesSlice.actions;

/* eslint-disable no-useless-escape */
export const getUser = async (token) => {
  return await fetch('https://blog.kata.academy/api/user', {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => {
    if (res.ok) return res.json();
  });
};

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    // userData: null,
    userError: null,
    isLogin: false,
    username: '',
    email: '',
    image: '',
    error: '',
  },
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setUserError: (state, action) => {
      state.userError = action.payload;
    },
  },
});

export const { setUserData, setUserError } = userSlice.actions;

export default userSlice.reducer;

export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    'max-age': 3600,
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, '', {
    'max-age': -1,
  });
}

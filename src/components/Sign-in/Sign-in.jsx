import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { setUserData, setCookie } from '../../redux/userSlice';
import { loginUser } from '../../services/services';

import style from './Sign-in.module.scss';

const SignIn = ({ history }) => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = ({ email, password }) => {
    loginUser(email, password)
      .then(({ user: { email, token, username, image } }) => {
        setCookie('token', token);
        dispatch(setUserData({ username, email, image, isLogin: true }));
        history.push('/');
      })
      .catch((error) => {
        if (error === 422) setValidationError(true);
      });
  };

  return (
    <div className={style['sign-in']}>
      <h3 className={style['sign-in__title']}>Sign In</h3>
      <form className={style['sign-in__form']} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email address
          <input
            className={style['sign-in__input']}
            {...register('email', { required: 'This field is required.' })}
            type="email"
            placeholder="Email address"
          />
          <div className="error-form">{errors?.email?.message}</div>
        </label>
        <label>
          Password
          <input
            className={style['sign-in__input']}
            {...register('password', { required: 'This field is required.' })}
            type="password"
            placeholder="Password"
          />
          <div className="error-form">{errors?.password?.message}</div>
          {validationError ? <div className="error-form">Login or password is invalid</div> : null}
        </label>
        <button className={style['sign-in__submit']} type="submit">
          Login
        </button>
      </form>
      <span className={style['sign-in__footer']}>
        Don't have an account?{' '}
        <Link to="/sign-up" className={style['sign-in__link']}>
          Sign Up
        </Link>
        .
      </span>
    </div>
  );
};

export default withRouter(SignIn);

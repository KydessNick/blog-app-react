import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import { deleteCookie, setUserData } from '../../store/redux/userSlice';

import styles from './Header.module.scss';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const username = useSelector((state) => state.user.username);
  const image = useSelector((state) => state.user.image);

  const onLogOut = () => {
    dispatch(setUserData({ username: null, email: null, image: null, isLogin: false }));
    deleteCookie('token');
    history.push('/');
  };

  const isLogInFalse = (
    <>
      <Link to="/sign-in">
        <button className={styles['authentication__in']}>Sign in</button>
      </Link>
      <Link to="/sign-up">
        <button className={styles['authentication__up']}>Sign up</button>
      </Link>
    </>
  );

  const isLogInTrue = (
    <>
      <Link to="/new-article">
        <button className={styles['authentication__create-article']}>Create article</button>
      </Link>
      <Link to="/profile" className={styles.user}>
        {username}
        {image ? <Avatar size={46} src={image} /> : <Avatar size={46} icon={<UserOutlined />} />}
      </Link>
      <button className={styles['authentication__out']} onClick={onLogOut}>
        Log Out
      </button>
    </>
  );

  return (
    <header className={styles.header}>
      <Link to="/articles" className={styles['header__title']}>
        Realworld Blog
      </Link>
      <div className={styles.authentication}>{isLogin ? isLogInTrue : isLogInFalse}</div>
    </header>
  );
};

export default withRouter(Header);

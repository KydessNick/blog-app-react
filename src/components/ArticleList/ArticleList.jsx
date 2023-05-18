import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import ArticleCard from '../ArticleCard/ArticleCard';
import { getArticles } from '../../store/slices/articleSlice';
import PaginationComponent from '../Pagination/Pagination';
import { getCookie } from '../../store/slices/userSlice';

import styles from './ArticleList.module.scss';

const ArticleList = ({ articles, getArticles, loading, currentArticle, offset }) => {
  const token = getCookie('token');

  useEffect(() => {
    getArticles(offset, token);
  }, [getArticles]);

  return (
    <>
      <div className={styles['article-list']}>
        {loading ? (
          <Spin size="large" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        ) : (
          articles.map((el) => {
            return <ArticleCard key={el.slug} articleData={el} currentArticle={currentArticle} />;
          })
        )}
      </div>
      <PaginationComponent />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    offset: state.articles.offset,
    currentArticle: state.articles.currentArticle,
    loading: state.articles.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: (offset, token) => dispatch(getArticles(offset, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);

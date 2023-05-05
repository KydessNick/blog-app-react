import React, { useEffect, useState } from 'react'
import { Avatar, Tag, Typography, Popconfirm } from 'antd'
import { connect, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import { UserOutlined } from '@ant-design/icons'
import { Link, withRouter } from 'react-router-dom'

import { getArticle } from '../../redux/article-actions'
import { getCookie } from '../../redux/user-actions'
import { deleteArticle, favoriteArticle, unFavoriteArticle } from '../../services/services'

import classesCard from '../ArticleCard/ArticleCard.module.scss'
// import classesCard from '../ArticleCard/'
import style from './ArticleDetails.module.scss'

const ArticleDetails = ({ currentArticle, slug, getArticle, username, history }) => {
    const { Paragraph } = Typography
    const isLogin = useSelector((state) => state.user.isLogin)
    const token = getCookie('token')

    useEffect(() => {
        getArticle(slug, token)
    }, [])

    const confirm = () => {
        deleteArticle(slug, token)
        history.push('/')
    }

    const { title, favoritesCount, tagList, author, updatedAt, description, body, favorited } = currentArticle

    const [likesCount, setLikesCount] = useState(favoritesCount)
    const [like, setLike] = useState(favorited)

    const onLikeChange = () => {
        if (!like) {
            favoriteArticle(slug, token).then(({ article: { favorited, favoritesCount } }) => {
                setLike(favorited)
                setLikesCount(favoritesCount)
            })
        } else {
            unFavoriteArticle(slug, token).then(({ article: { favorited, favoritesCount } }) => {
                setLike(favorited)
                setLikesCount(favoritesCount)
            })
        }
    }

    return (
        <>
            {Object.keys(currentArticle).length ? (
                <div className={style['article-details']}>
                    <header className={classesCard['article-list-item__header']}>
                        <div className={classesCard['article-list-item__left']}>
                            <div className={classesCard['article-list-item__title-container']}>
                                <h3 className={classesCard['article-list-item__title']}>{title}</h3>
                                <div className={classesCard['article-list-item__likes']}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className={classesCard['article-list-item__input']}
                                            disabled={!isLogin}
                                            onChange={onLikeChange}
                                            checked={like}
                                        />
                                        <span className={classesCard['article-list-item__box']}></span>
                                        {likesCount}
                                    </label>
                                </div>
                            </div>
                            <div className={classesCard['article-list-item__tags']}>
                                {tagList.length ? tagList.map((el, index) => <Tag key={index}>{el}</Tag>) : null}
                            </div>
                            <section className={style['article-details__description']}>
                                <Paragraph>{description}</Paragraph>
                            </section>
                        </div>
                        <div className={style['article-details__right']}>
                            <div className={style['article-details__row']}>
                                <div className={classesCard['article-list-item__user']}>
                                    <h3 className={classesCard['article-list-item__user-name']}>{author.username}</h3>
                                    <span className={classesCard['article-list-item__date']}>
                                        {format(new Date(updatedAt), 'MMMM d, y')}
                                    </span>
                                </div>
                                {author.image ? (
                                    <Avatar size={46} src={author.image} />
                                ) : (
                                    <Avatar size={46} icon={<UserOutlined />} />
                                )}
                            </div>
                            <div className={style['article-details__row']}>
                                {username === author.username ? (
                                    <>
                                        <Popconfirm
                                            title="Are you sure to delete this article?"
                                            placement="right"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={confirm}
                                        >
                                            <button className={style['article-details__delete']}>Delete</button>
                                        </Popconfirm>
                                        <Link to={`/articles/${slug}/edit`}>
                                            <button className={style['article-details__edit']}>Edit</button>
                                        </Link>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </header>
                    <main className={style['article-details__main']}>
                        <ReactMarkdown>{body}</ReactMarkdown>
                    </main>
                </div>
            ) : null}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentArticle: state.articles.currentArticle,
        username: state.user.username,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticle: (slug, token) => dispatch(getArticle(slug, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleDetails))

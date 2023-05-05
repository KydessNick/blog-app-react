import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Header from '../Header/Header'
import ArticleList from '../ArticleList/ArticleList'
import ArticleDetails from '../ArticleDetails/ArticleDetails'
import SignIn from '../Sign-in/Sign-in'
import SignUp from '../Sign-up/Sign-up'
import { getCookie, getUser, setUserData } from '../../redux/user-actions'
import EditProfile from '../EditProfile/EditProfile'
import CreateArticle from '../CreateArticle/CreateArticle'

import classes from './App.module.scss'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        if (getCookie('token')) {
            getUser(getCookie('token')).then(({ user: { username, email, image } }) => {
                dispatch(setUserData({ username, email, image, isLogin: true }))
            })
        }
    }, [])

    return (
        <>
            <Router>
                <Header />
                <main className={classes.main}>
                    <Switch>
                        <Route exact path={['/', '/articles']} render={() => <ArticleList />} />
                        <Route
                            exact
                            path="/articles/:slug"
                            render={({ match }) => <ArticleDetails slug={match.params.slug} />}
                        />
                        <Route exact path="/sign-in" render={() => <SignIn />} />
                        <Route exact path="/sign-up" render={() => <SignUp />} />
                        <Route exact path="/new-article" render={() => <CreateArticle />} />
                        <Route
                            exact
                            path="/articles/:slug/edit"
                            render={({ match }) => <CreateArticle edit slug={match.params.slug} />}
                        />
                        <Route exact path="/profile" render={() => <EditProfile />} />
                        <Redirect to="/" />
                    </Switch>
                </main>
            </Router>
        </>
    )
}

export default App

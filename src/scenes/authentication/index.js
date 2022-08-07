/* eslint-disable react-hooks/exhaustive-deps */
import { Redirect, Route, Switch, useHistory, } from "react-router-dom"
import SignIn from "./signin"
import { useEffect } from 'react'
import { useSelector } from "react-redux";


const Authentication = () => {

    const history = useHistory()
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        if (user) history.replace("/")
    }, [])


    return (
        <Switch>
            <Route path="/auth/signin/" exact component={SignIn} />
            <Redirect to="/auth/signin/" />
        </Switch>
    )
}

export default Authentication
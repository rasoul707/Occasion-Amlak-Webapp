/* eslint-disable react-hooks/exhaustive-deps */
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Box } from "@mui/material"
import { useEffect, } from 'react'
import { useSelector } from "react-redux";

import Home from "./Home"
import AddFile from "./AddFile"
import AddFileExtra from "./AddFile/Extra"
import SearchFile from "./SearchFile"
import FileView from "./FileView"

import AddVilla from "./AddFile/FileTypes/Villa"
import AddApartment from "./AddFile/FileTypes/Apartment"
import AddLand from "./AddFile/FileTypes/Land"
import AddCommercial from "./AddFile/FileTypes/Commercial"
import AddHectare from "./AddFile/FileTypes/Hectare"

const Panel = () => {

    const history = useHistory()
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        if (!user) history.replace("/auth/signin")
        else checkUser()
    }, [])


    const checkUser = async () => {
        /* */
    }


    if (!user) return null;
    return <Box component="main" sx={{ height: '100%' }}>
        <Switch>
            <Route path="/new" exact component={AddFile} />

            <Route path="/new/villa" exact component={AddVilla} />
            <Route path="/new/villa/extra" exact component={AddFileExtra} />

            <Route path="/new/apartment" exact component={AddApartment} />
            <Route path="/new/apartment/extra" exact component={AddFileExtra} />

            <Route path="/new/land" exact component={AddLand} />
            <Route path="/new/land/extra" exact component={AddFileExtra} />

            <Route path="/new/commercial" exact component={AddCommercial} />
            <Route path="/new/commercial/extra" exact component={AddFileExtra} />

            <Route path="/new/hectare" exact component={AddHectare} />
            <Route path="/new/hectare/extra" exact component={AddFileExtra} />

            <Route path="/search" exact component={SearchFile} />

            <Route path="/file/:id" exact component={FileView} />

            <Route path="/" exact component={Home} />
            <Redirect to="/" />
        </Switch>
    </Box>
}
export default Panel;
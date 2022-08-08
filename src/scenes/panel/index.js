/* eslint-disable react-hooks/exhaustive-deps */
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Box } from "@mui/material"
import React, { useEffect, } from 'react'
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

import AddToHomePopUp from "../../components/AddToHomePopUp"


const Panel = () => {

    const history = useHistory()
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        if (!user) history.replace("/auth/signin")
        else checkUser()
    }, [])

    const [addToHomeOpen, setAdd2HomeOpen] = React.useState(false)


    const checkUser = async () => {
        /* */
        // Detects if device is on iOS 
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test(userAgent);
        }
        // Detects if device is in standalone mode
        const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

        // checked before
        const checkedAdd2Home = localStorage.getItem("checkedAdd2Home")

        // Checks if should display install popup notification:
        if (!checkedAdd2Home && isIos() && !isInStandaloneMode()) {
            setAdd2HomeOpen(true)
            localStorage.setItem("checkedAdd2Home", true)
        }

        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position);
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
    }


    if (!user) return null;
    return <Box component="main" sx={{ height: '100%' }}>
        {addToHomeOpen && <AddToHomePopUp close={() => setAdd2HomeOpen(false)} />}
        <Switch>
            <Route path="/new" exact component={AddFile} />

            <Route path="/new/villa" exact component={AddVilla} />
            <Route path="/new/villa/extra" component={AddFileExtra} />

            <Route path="/new/apartment" exact component={AddApartment} />
            <Route path="/new/apartment/extra" component={AddFileExtra} />

            <Route path="/new/land" exact component={AddLand} />
            <Route path="/new/land/extra" component={AddFileExtra} />

            <Route path="/new/commercial" exact component={AddCommercial} />
            <Route path="/new/commercial/extra" component={AddFileExtra} />

            <Route path="/new/hectare" exact component={AddHectare} />
            <Route path="/new/hectare/extra" component={AddFileExtra} />

            <Route path="/search" exact component={SearchFile} />

            <Route path="/file/:id" exact component={FileView} />


            <Route path="/" component={Home} />
            <Redirect to="/" />
        </Switch>
    </Box>
}
export default Panel;
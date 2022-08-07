/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import Authentication from "./scenes/authentication";
import Panel from "./scenes/panel";
import * as API from "./api";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress, } from '@mui/material';



import './App.css';


function App() {

  const [loadMain, setLoadMain] = useState(false)

  const dispatch = useDispatch()
  // const appLoader = (payload) => dispatch({ type: 'BACKDROP', payload: { backdrop: payload } })
  const backdrop = useSelector(state => state.app.backdrop)

  // ##### validate session 

  const access_token = localStorage.getItem('access_token')

  const verifyToken = async () => {
    if (access_token) {
      try {
        await API.POST(true)('jwt-auth/v1/token/validate')
        await getUserInfo()
      } catch (error) {
        if (error === undefined) {
          await getUserInfo()
        } else {
          localStorage.clear()
          window.location.reload()
        }
      }
    }
    else {
      setLoadMain(true)

    }
  }


  const getUserInfo = async () => {
    try {
      const response = await API.GET(true)('rapp/v1/getMe')
      dispatch({ type: 'USER_INFO', payload: { user: response.data?.user } })
      localStorage.setItem('user_data', JSON.stringify(response.data?.user));
    } catch (error) {
      if (error === undefined) {
        const userLocal = localStorage.getItem('user_data')
        if (userLocal) {
          dispatch({ type: 'USER_INFO', payload: { user: JSON.parse(userLocal) } })
        }
      }
      else {
        localStorage.clear()
        window.location.reload()
      }
    }

    setLoadMain(true)

  }



  useEffect(() => {
    verifyToken()
  }, [])


  return <>
    <Backdrop
      open={backdrop}
      transitionDuration={{ appear: 0, enter: 0, exit: 1000 }}
      style={{ zIndex: 9999, backgroundColor: "rgb(229, 229, 229)" }}
      children={<CircularProgress />}
    />


    {loadMain &&
      <Router>
        <Switch>
          <Route path="/auth/" component={Authentication} />
          <Route path="/" component={Panel} />
          <Redirect to="/" />
        </Switch>
      </Router >
    }
  </>;
}
export default App;
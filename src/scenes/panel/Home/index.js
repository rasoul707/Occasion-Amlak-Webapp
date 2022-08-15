/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography, Card, Button, CardContent, Dialog, Slide, DialogTitle, DialogContent, DialogActions, Zoom } from "@mui/material"
import { useSelector } from "react-redux";
import { Link as LinkRoute } from "react-router-dom";
import UserAvatar from "../../../components/UserAvatar";
import * as React from 'react';
import { useDispatch, } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom"
import * as API from "../../../api"

const Page = () => {

    const dispatch = useDispatch()
    const appLoader = (payload) => dispatch({ type: 'BACKDROP', payload: { backdrop: payload } })
    React.useState(() => { appLoader(false) }, [])

    const history = useHistory()

    React.useState(() => {
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
        }
        getUserInfo()
    }, [])

    const user = useSelector(state => state.auth.user)
    return (
        <Zoom in={true} >
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: '100%', m: 3 }}>

                    <Grid container gap={.5} direction="column" alignItems="stretch" wrap="nowrap" sx={{ height: '100%' }}>

                        <Grid item container justifyContent="center" >
                            <UserAvatar email={user.email} />
                        </Grid>
                        <Grid item>
                            <Typography align="center" variant="h5" sx={{ fontWeight: 900, mt: 2, mb: 3, color: "#111111" }}>
                                {user.displayName}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" spacing={2} alignItems="center" justifyContent="center">
                                <Grid item xs={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 13, textAlign: "center" }} noWrap color="#111111" >
                                                در انتظار تایید
                                            </Typography>
                                            <Typography sx={{ textAlign: "center", fontWeight: 900 }} variant="h6" color="#111111">
                                                {user.pending}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 13, textAlign: "center" }} noWrap color="#111111" >
                                                فایل های تایید شده
                                            </Typography>
                                            <Typography sx={{ textAlign: "center", fontWeight: 900 }} variant="h6" color="#111111">
                                                {user.confirmed}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ mt: 5 }}
                                children="ثبت فایل جدید"
                                component={LinkRoute}
                                to="/new"
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="large"
                                color="inherit"
                                sx={{ mt: 2 }}
                                children="جستجوی فایل"
                                component={LinkRoute}
                                to="/search"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} />
                        <Grid item sx={{ pb: 1.5, mt: 3 }}>
                            <Button
                                variant="contained"
                                size="large"
                                color="inherit"
                                children="خروج از حساب کاربری"
                                onClick={() => history.push("/logout")}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>


                <Switch>
                    <Route path="/logout" exact component={LogoutDialog} />
                </Switch>

            </Box>
        </Zoom>


    )
}
export default Page;











const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
});



const LogoutDialog = () => {

    const history = useHistory()


    const logout = async () => {
        history.goBack()
        localStorage.clear()
        window.location.reload()
    }



    return <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={history.goBack}
    >
        <DialogTitle>خروج از حساب کاربری</DialogTitle>
        <DialogContent >
            <Typography>آیا می خواهید از حساب کاربری خود خارج شوید؟</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={history.goBack}>نه</Button>
            <Button onClick={logout}>بله</Button>
        </DialogActions>
    </Dialog>

}


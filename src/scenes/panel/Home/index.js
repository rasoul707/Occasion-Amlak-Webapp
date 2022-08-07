/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography, Card, Button, CardContent, Dialog, Slide, DialogTitle, DialogContent, DialogActions, Zoom } from "@mui/material"
import { useSelector } from "react-redux";
import { Link as LinkRoute } from "react-router-dom";
import UserAvatar from "../../../components/UserAvatar";
import * as React from 'react';
import { useDispatch, } from "react-redux";

const Page = () => {

    const dispatch = useDispatch()
    const appLoader = (payload) => dispatch({ type: 'BACKDROP', payload: { backdrop: payload } })
    React.useState(() => { appLoader(false) }, [])

    const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false)

    const user = useSelector(state => state.auth.user)
    return (
        <Zoom in={true} >
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: 400, }}>
                    <Box sx={{ p: 3, }}>
                        <Grid container direction="column" alignItems="center">
                            <UserAvatar email={user.email} />
                            <Typography align="center" variant="h5" sx={{ fontWeight: 900, mt: 2, mb: 3, color: "#111111" }}>
                                {user.displayName}
                            </Typography>
                            <Grid container direction="row" spacing={2} alignItems="center" justifyContent="center">
                                <Grid item xs={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 13, textAlign: "center" }} color="#111111" >
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
                                            <Typography sx={{ fontSize: 13, textAlign: "center" }} color="#111111" >
                                                فایل های تایید شده
                                            </Typography>
                                            <Typography sx={{ textAlign: "center", fontWeight: 900 }} variant="h6" color="#111111">
                                                {user.confirmed}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ mt: 5 }}
                                children="ثبت فایل جدید"
                                component={LinkRoute}
                                to="/new"
                                fullWidth
                            />
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
                            <Button
                                variant="contained"
                                size="large"
                                color="inherit"
                                sx={{ mt: 2 }}
                                children="خروج از حساب کاربری"
                                onClick={() => setOpenLogoutDialog(true)}
                                fullWidth
                            />
                        </Grid>
                    </Box>
                </Box>

                <LogoutDialog
                    open={openLogoutDialog}
                    reject={() => setOpenLogoutDialog(false)}
                />
            </Box>
        </Zoom>


    )
}
export default Page;

















const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const LogoutDialog = ({ open, reject, }) => {


    const logout = async () => {
        reject()
        localStorage.clear()
        window.location.reload()
    }



    return <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={reject}
    >
        <DialogTitle>خروج از حساب کاربری</DialogTitle>
        <DialogContent >
            <Typography>آیا می خواید از جساب کاربری خود خارج شوید؟</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={reject}>نه</Button>
            <Button onClick={logout}>بله</Button>
        </DialogActions>
    </Dialog>

}


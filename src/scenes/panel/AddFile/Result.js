/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Typography, Button, Fade, Box } from "@mui/material"
import { useHistory } from "react-router-dom";
import * as React from 'react';
import SuccessIcon from "../../../assets/images/success.png"
import ErrorIcon from "../../../assets/images/error.png"

export const Success = () => {
    return (
        <Concept
            imgSrc={SuccessIcon}
            title="فایل شما با موفقیت ثبت شد"
            subtitle="و جهت بررسی به مدیریت ارسال شد"
        />
    )
}

export const Error = () => {
    return (
        <Concept
            imgSrc={ErrorIcon}
            title="خطایی رخ داد"
            subtitle="لطفا مجددا تلاش کنید"
        />
    )
}



const Concept = ({ imgSrc, title, subtitle }) => {

    const history = useHistory()

    return (
        <Fade in={true} mountOnEnter unmountOnExit >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: '100%', }}>
                    <Box sx={{ p: 3, }}>
                        <Grid container direction="row" spacing={5} alignItems="center" justifyContent="center" >
                            <Grid item xs={12} container justifyContent="center">
                                <img src={imgSrc} alt="success" style={{ height: 150, }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center" variant="h5" sx={{ fontWeight: 900, color: "#111111" }}>{title}</Typography>
                                <Typography align="center" variant="subtitle2" sx={{ fontWeight: 700, color: "#111111" }}>{subtitle}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="inherit"
                                    sx={{ mt: 2 }}
                                    children="بازگشت به خانه"
                                    onClick={() => {
                                        history.replace("/")
                                    }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Fade>
    )
}
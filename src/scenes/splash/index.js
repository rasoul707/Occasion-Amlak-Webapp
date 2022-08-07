/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Typography, Box } from "@mui/material"
import * as React from 'react';
import Logo from "../../assets/images/logo_black.png"
import ReactDOM from 'react-dom';




const Splash = () => {

    React.useEffect(() => {
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('splash-root'))
        }, 5000)
    }, [])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: "linear-gradient(215.33deg, #FFE600 0%, #FFDA00 29.51%, #FFC700 70.74%)" }}>
            <Box sx={{ maxWidth: 400, width: 400, }}>
                <Box sx={{ p: 3, }}>
                    <Grid container direction="column" spacing={2} alignItems="center" justifyContent="center" >
                        <Grid item container justifyContent="center">
                            <img src={Logo} alt="Iran Occasion" style={{ height: 150, }} />
                        </Grid>
                        <Grid item>
                            <Typography align="center" variant="h4" sx={{ fontWeight: 700, color: "#111111" }}>املاک اکازیون</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="center" variant="h6" sx={{ fontWeight: 700, color: "#111111" }}>
                                بزرگترین مرکز اطلاعات
                            </Typography>
                            <Typography align="center" variant="h6" sx={{ fontWeight: 700, color: "#111111" }}>
                                املاک شمال کشور
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default Splash
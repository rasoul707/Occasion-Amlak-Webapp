import logo from "../assets/images/logo.png"
import { Typography, Grid } from "@mui/material"


const Logo = () => {
    return <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={12} container justifyContent="center">
            <img style={{ maxWidth: 300, width: "100%" }} src={logo} alt="Iran Occasion" />
        </Grid>
        <Grid item xs={12}>
            <Typography align="center" variant="h5" sx={{ fontSize: "2rem", fontWeight: 700, marginTop: 1.5 }}>املاک اکازیون</Typography>
        </Grid>
    </Grid>
}

export default Logo
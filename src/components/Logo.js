import logo from "../assets/images/logo.png"
import { Typography, Grid } from "@mui/material"


const Logo = () => {
    return <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={12}>
            <img style={{ maxWidth: 200, alignItems: "center" }} src={logo} alt="Iran Occasion" />
        </Grid>
        <Grid item xs={12}>
            <Typography align="center" variant="h5" sx={{ fontWeight: 900, marginTop: 2 }}>املاک اکازیون</Typography>
        </Grid>
    </Grid>
}

export default Logo
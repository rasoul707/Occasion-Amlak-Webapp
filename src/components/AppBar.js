import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';

const ResponsiveAppBar = ({ title, center = true, titleVariant = "h5", autoLeading = false, leading = null, bottom, leadingProps, absoluteContainer, customComponent }) => {

    const history = useHistory()


    return (
        <AppBar position="relative" >

            {customComponent}

            <Container maxWidth="xl" sx={{ position: absoluteContainer && "absolute" }}>


                <Toolbar
                    sx={{
                        justifyContent: center ? "center" : (title ? "space-between" : "flex-end"),
                        mt: 2, mb: 2,
                        p: "0 !important",
                    }}

                >
                    {title &&
                        <Typography align="center" noWrap variant={titleVariant} sx={{ fontWeight: 700, color: "#111111" }}>
                            {title}
                        </Typography>
                    }




                    <Grid container spacing={1} justifyContent="flex-end" sx={{ width: "fit-content" }}>
                        {leading}
                        {autoLeading && <Leading
                            Icon={NavigateBeforeIcon}
                            onClick={() => {
                                if (history.length === 1) {
                                    history.replace("/")
                                }
                                else {
                                    history.goBack()
                                }
                            }}
                            title="بازگشت"
                            {...leadingProps}
                        />}
                    </Grid>





                </Toolbar>



            </Container>
            <Container maxWidth="xl">
                {bottom}
            </Container>

        </AppBar>
    )

}
export default ResponsiveAppBar






export const Leading = ({ Icon, onClick, title, background }) => {
    return <Grid item>
        <Tooltip title={title}>
            <IconButton
                size="small"
                sx={{
                    background: background || "#CECECE"
                }}
                onClick={onClick}
            >
                <Icon
                    fontSize="large"
                    sx={{
                        color: "#e5e5e5"
                    }}
                />
            </IconButton>
        </Tooltip>
    </Grid>
}
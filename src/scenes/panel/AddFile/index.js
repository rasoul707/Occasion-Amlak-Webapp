/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography, Card, Tooltip, CardContent, CardActionArea, Zoom } from "@mui/material"
import { Link as LinkRoute } from "react-router-dom";
import * as React from 'react';
import { useDispatch, } from "react-redux";


const Page = () => {

    const dispatch = useDispatch()
    const appLoader = (payload) => dispatch({ type: 'BACKDROP', payload: { backdrop: payload } })
    React.useState(() => { appLoader(false) }, [])


    return (
        <Zoom in={true} >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: '100%', m: 3, }}>
                    <Grid container direction="row" spacing={2} alignItems="center" justifyContent="center">
                        <Item label="ویلا" url="villa" />
                        <Item label="آپارتمان" url="apartment" />
                        <Item label="زمین" url="land" />
                        <Item label="اداری تجاری" url="commercial" />
                        <Item label="هکتاری" url="hectare" />
                    </Grid>
                </Box>
            </Box>
        </Zoom >
    )
}
export default Page;





const Item = ({ label, url }) => {
    return <Grid item xs={6}>
        <Tooltip title={label}>
            <Card>
                <CardActionArea component={LinkRoute} to={`/new/${url}`}>
                    <CardContent sx={{ p: "26px !important" }}>
                        <Typography sx={{ textAlign: "center", fontWeight: 900 }} noWrap variant="h6" color="#111111">
                            {label}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Tooltip>
    </Grid>
}
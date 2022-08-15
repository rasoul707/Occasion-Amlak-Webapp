/* eslint-disable default-case */
import { Grid, Typography, Card, CardContent, CardActionArea, Slide, Avatar } from "@mui/material"
import { useHistory } from "react-router-dom";
import * as React from 'react';
import FilePlaceHolder from "../../../assets/images/file_placeholder.png"
import BedIcon from '@mui/icons-material/Bed';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import NumberFormat from 'react-number-format';


const FileItem = ({ index, data: file, byTotal }) => {

    const imageUrl = file?.thumbUrl?.thumbnail[0]
    const price = file?.price
    const totalPrice = file?.totalPrice
    let title = ""
    let detail = []

    const history = useHistory()



    switch (file.type) {
        case 'villa':
            title = "فروش " + file?.villa?.buildingArea + " متر ویلا " + file.city
            detail[0] = {
                icon: AspectRatioIcon,
                data: file?.villa?.buildingArea
            }
            detail[1] = {
                icon: BedIcon,
                data: file?.villa?.mastersCount
            }
            break;

        case 'apartment':
            title = "فروش " + file?.apartment?.area + " متر آپارتمان " + file.city
            detail[0] = {
                icon: AspectRatioIcon,
                data: file?.apartment?.area
            }
            detail[1] = {
                icon: BedIcon,
                data: file?.apartment?.mastersCount
            }
            break;


        case 'commercial':
            title = "فروش " + file?.commercial?.area + " متر تجاری " + file.city
            detail[0] = {
                icon: AspectRatioIcon,
                data: file?.commercial?.area
            }
            break;

        case 'hectare':
            title = "فروش " + file?.hectare?.area + " متر هکتاری " + file.city
            detail[0] = {
                icon: AspectRatioIcon,
                data: file?.hectare?.area
            }
            break;
        case 'land':
            title = "فروش " + file?.land?.area + " متر زمین " + file.city
            detail[0] = {
                icon: AspectRatioIcon,
                data: file?.land?.area
            }
            break;
    }


    const itemClick = () => {
        history.push(`/file/${file.id}${byTotal ? "?total" : ""}`)
    }


    return <Slide direction="up" in={true} mountOnEnter unmountOnExit key={index}>
        <Card sx={{ width: "100%", mb: 2 }}>
            <CardActionArea onClick={itemClick}>
                <CardContent sx={{ p: "8px !important" }}>
                    <FileImage alt={title} src={imageUrl} />
                    <Typography sx={{ fontWeight: 900, pt: 1, pb: 1 }} noWrap variant="subtitle1" color="#111111">
                        {title}
                    </Typography>
                    <Grid container direction="row" spacing={1} alignItems="stretch" justifyContent="center">
                        {detail.length > 0 &&
                            <Grid item xs="auto" >
                                <FileDetail detail={detail} />
                            </Grid>
                        }
                        <Grid item xs>
                            <FilePrice price={price} totalPrice={totalPrice} byTotal={byTotal} />
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    </Slide>
}



const FileImage = ({ alt, src }) => {
    return <Avatar
        variant="rounded"
        sx={{ width: "100%", borderRadius: 5, height: "auto" }}
        alt={alt}
        src={src}
    >
        <img
            src={FilePlaceHolder}
            style={{
                width: "100%",
                objectFit: "cover",
                color: "transparent",
            }}
            alt={alt}
        />
    </Avatar>
}


export const FilePrice = ({ price, totalPrice, byTotal = false }) => {

    return <Card sx={{ background: "#EEEEEE", boxShadow: "none", height: "100%", borderRadius: "50px" }}>
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: "100%", }}>
            <Typography sx={{ fontWeight: 500 }} lineHeight={1.5} textAlign="center" noWrap variant="subtitle1" color="#555555">
                {byTotal ? "قیمت کل" : "هر متر"}
            </Typography>
            <Typography sx={{ fontWeight: 900 }} lineHeight={1.2} textAlign="center" noWrap variant="h6" color="#555555">
                <NumberFormat value={(byTotal ? totalPrice : price) || 0} displayType={'text'} thousandSeparator={true} />
            </Typography>
            <Typography sx={{ fontWeight: 500 }} lineHeight={1.5} textAlign="center" noWrap variant="subtitle1" color="#555555">
                تومان
            </Typography>
        </Grid>
    </Card>
}



export const FileDetail = ({ detail, textAlign = "center", textVariant = "subtitle1" }) => {
    return <Card sx={{ background: "#EEEEEE", boxShadow: "none", height: "100%", borderRadius: "20px", }}>
        <Grid container direction="column" alignItems="flex-start" justifyContent="center" sx={{ height: "100%", p: 1, pl: 3, pr: 3, }}>
            {detail.map(({ icon: Icon, data }) => {
                return <Typography sx={{ fontWeight: 900, display: "flex" }} textAlign={textAlign} variant={textVariant} color="#555555">
                    <Icon sx={{ pr: 1 }} />{data}
                </Typography>
            })}
        </Grid>
    </Card>
}



export default FileItem
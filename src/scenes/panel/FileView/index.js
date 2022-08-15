/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Zoom, Grid, Typography, Avatar, Stack, Card, CardContent } from "@mui/material"
import * as React from 'react';
import AppBar from "../../../components/AppBar";
import FilePlaceHolder from "../../../assets/images/file_placeholder.png"
import FilePlaceHolderSquare from "../../../assets/images/file_placeholder_square.png"


import * as API from "../../../api"
import { useParams, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FilePrice, FileDetail } from "../FileItem";
import BedIcon from '@mui/icons-material/Bed';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import UserAvatar from "../../../components/UserAvatar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, } from "react-redux";


const FileView = () => {



    const params = useParams()
    const location = useLocation()
    const { enqueueSnackbar } = useSnackbar()


    const [activePicture, setActivePicture] = React.useState(0)

    const [file, setFile] = React.useState(null)

    const dispatch = useDispatch()
    const appLoader = (payload) => dispatch({ type: 'BACKDROP', payload: { backdrop: payload } })


    React.useEffect(() => {
        appLoader(true)
        const getDate = async () => {
            const { id } = params
            try {
                const response = await API.GET(false)(`rapp/v1/getFile/${id}`)
                setFile(response.data.file)
            } catch (error) {
                API.ResponseError(enqueueSnackbar, error)
            }
            appLoader(false)
        }
        getDate()
    }, [])

    const picturesUrl = file?.picturesUrl
    const thumbUrl = picturesUrl && picturesUrl.length > 0 && picturesUrl[activePicture]?.thumbnail[0]

    let title = ""
    let detail = []
    let documentType = ""
    let equipments = []



    switch (file?.type) {
        case 'villa':
            title = "ویلای " + file.city
            detail[0] = {
                icon: AspectRatioIcon,
                data: file?.villa?.buildingArea + " متر مربع زیربنا"
            }
            detail[1] = {
                icon: BedIcon,
                data: file?.villa?.mastersCount + " اتاق خواب مستر"
            }
            documentType = file?.villa?.documentType
            equipments = file?.villa?.equipments
            break;

        case 'apartment':
            title = "آپارتمان " + file.city
            detail[0] = {
                icon: AspectRatioIcon,
                data: file?.apartment?.area + " متر مربع"
            }
            detail[1] = {
                icon: BedIcon,
                data: file?.apartment?.mastersCount + " اتاق خواب مستر"
            }
            documentType = file?.apartment?.documentType
            equipments = file?.apartment?.equipments
            break;


        case 'commercial':
            title = "تجاری " + file.city
            detail[0] = {
                icon: AspectRatioIcon,
                data: file?.commercial?.area + " متر مربع"
            }
            documentType = file?.commercial?.documentType
            break;

        case 'hectare':
            title = "هکتاری " + file.city
            detail[0] = {
                icon: AspectRatioIcon,
                data: file?.hectare?.area + " متر مربع"
            }
            documentType = file?.hectare?.documentType
            break;
        case 'land':
            title = "زمین " + file.city
            detail[0] = {
                icon: AspectRatioIcon,
                data: file?.land?.area + " متر مربع"
            }
            documentType = file?.land?.documentType
            break;
    }

    return (

        <Zoom in={true} mountOnEnter unmountOnExit style={{ transitionDelay: '100ms' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: '100%', height: '100%' }}>
                    <Grid container gap={0} direction="column" alignItems="stretch" wrap="nowrap" sx={{ height: '100%' }}>
                        <AppBar
                            center={false}
                            titleVariant="h6"
                            autoLeading={true}
                            leadingProps={thumbUrl && { background: "#fff" }}
                            absoluteContainer
                            customComponent={<FocusPicture title={title} src={thumbUrl} />}
                            paddingToolbar={true}
                        />
                        <Grid item>
                            <PicturesList
                                title={title}
                                pictures={picturesUrl}
                                activePicture={activePicture}
                                setActivePicture={setActivePicture}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ContentBox
                                detail={detail}
                                price={file?.price}
                                totalPrice={file?.totalPrice}
                                byTotal={location.search === "?total"}
                                title={title}
                                documentType={documentType}
                                equipments={equipments}
                                author={file?.author}
                            />
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </Zoom>
    )
}


export default FileView




const ContentBox = ({ detail, price, totalPrice, byTotal, title, documentType, equipments, author, topBar }) => {
    return (
        <Card sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0, height: "100%" }}>
            <CardContent sx={{ height: '100%' }}>
                <Grid item container gap={.5} direction="column" alignItems="stretch" wrap="nowrap" sx={{ height: '100%' }}>
                    <Grid container direction="row" spacing={1} alignItems="stretch" justifyContent="center" sx={{ mb: 2, }}>
                        <Grid item xs={6} >
                            <FileTitle title={title} />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container direction="column" spacing={1} alignItems="stretch" justifyContent="center">
                                <Grid item xs={6} >
                                    <FileDetail
                                        detail={detail}
                                        textAlign="start"
                                        textVariant={"subtitle2"}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FilePrice
                                        price={price}
                                        totalPrice={totalPrice}
                                        byTotal={byTotal}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FileDocumentType documentType={documentType} />
                    </Grid>
                    <Grid item>
                        <FileEquipmentsType equipments={equipments} />
                    </Grid>
                    <Grid item xs={12} />
                    <Grid item>
                        <FileAuthor author={author} />
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )
}



const FileDocumentType = ({ documentType }) => {
    return <Typography sx={{ fontWeight: 900 }} textAlign="start" variant="h6" >
        وضعیت سند: <span style={{ fontWeight: 500 }} >{documentType}</span>
    </Typography>
}




const FileEquipmentsType = ({ equipments }) => {
    if (!equipments?.length) return null
    return <>
        <Typography sx={{ fontWeight: 900 }} textAlign="start" variant="h6" >
            امکانات:
        </Typography>
        <Grid container justifyContent="stretch">
            {equipments.map((equ) => {
                return <Typography textAlign="start" variant="subtitle2" sx={{ display: "flex", pr: 1, pb: .5, pt: .5 }}>
                    <CheckCircleIcon sx={{ color: "#2ECC71", pr: 0.25 }} />{equ}
                </Typography>
            })}
        </Grid>
    </>
}



const FileAuthor = ({ author }) => {
    return <Card sx={{ background: "#EEEEEE", boxShadow: "none", height: "fit-content", borderRadius: "30px", mb: 4 }}>
        <Grid container direction="row" alignItems="center" justifyContent="center" sx={{ height: "100%", p: 2 }}>
            <Grid item xs>
                <Typography sx={{ fontWeight: 700 }} textAlign="center" variant="h6" noWrap >
                    فایل و بازدید
                </Typography>
                <Typography sx={{ fontWeight: 900 }} textAlign="center" variant="h5" noWrap >
                    {author?.displayName}
                </Typography>
            </Grid>
            <Grid item xs="auto">
                <UserAvatar
                    email={author?.email}
                />
            </Grid>
        </Grid>
    </Card>
}






const FileTitle = ({ title }) => {
    return <Card sx={{ background: "#EEEEEE", boxShadow: "none", height: "100%", borderRadius: "30px" }}>
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: "100%", p: 2 }}>
            <Typography sx={{ fontWeight: 900 }} lineHeight={1.5} textAlign="center" variant="h4" color="#555555">
                {title}
            </Typography>
        </Grid>
    </Card>
}




const FocusPicture = ({ title, src }) => {
    return <Avatar
        variant="square"
        sx={{ width: "100%", borderBottomRightRadius: 30, borderBottomLeftRadius: 30, height: "fit-content", top: 0, background: "#d7d7d7" }}
        alt={title}
        src={src}
    >
        <img
            src={FilePlaceHolder}
            style={{ width: "100%", objectFit: "cover", color: "transparent", }}
            alt={title}
        />
    </Avatar>
}




const PicturesList = ({ pictures, title, activePicture, setActivePicture }) => {



    if (!pictures || pictures?.length <= 1) return null

    return <Stack direction="row" spacing={2} sx={{ pb: 1, pt: 2, ml: 2, mr: 2, overflowX: "scroll", }}>
        {pictures?.map(({ thumbnail }, index) => {
            return <PictureItem
                title={title}
                isActive={activePicture === index}
                src={thumbnail[0]}
                setActive={() => setActivePicture(index)}
            />
        })}
    </Stack>
}



const PictureItem = ({ isActive, title, src, setActive }) => {
    return <Avatar
        variant="square"
        sx={{
            width: 65, height: 65,
            borderRadius: 2,
            border: "0.5px solid transparent",
            borderColor: isActive ? "#9c27b0" : "transparent"
        }}
        alt={title}
        src={src}
        onClick={setActive}
    >
        <img
            src={FilePlaceHolderSquare}
            style={{ width: "100%", height: "100%", objectFit: "contain", color: "transparent", }}
            alt={title}
        />
    </Avatar>
}
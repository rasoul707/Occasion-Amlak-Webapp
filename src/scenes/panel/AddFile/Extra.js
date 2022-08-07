/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Zoom } from "@mui/material"
import { useLocation, useHistory } from "react-router-dom";
import * as React from 'react';
import AppBar from "../../../components/AppBar"
import TextField from "../../../components/TextField"

import LocationChooser from "../../../components/LocationChooser"
import ImageChooser from "../../../components/ImageChooser"
import { typeFileConvert2Persian } from "../../../constants/file"
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab'
import * as API from "../../../api";
import NumberFormat from 'react-number-format';

import { Success, Error } from "./Result"

import { useDispatch, } from "react-redux";

const PriceFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
});



const Page = () => {

    const dispatch = useDispatch()
    const appLoader = (payload) => dispatch({ type: 'BACKDROP', payload: { backdrop: payload } })
    React.useState(() => { appLoader(false) }, [])

    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const locationH = useLocation()
    const history = useHistory()
    const fileType = locationH.pathname.split("/")[2]
    const mainData = locationH.state?.[fileType]


    // ****

    const [pictures, setPictures] = React.useState([])
    const [thumbIndex, setThumbIndex] = React.useState(null)
    const [uploaded, setUploaded] = React.useState([])
    const [uploading, setUploading] = React.useState(false)

    const [price, setPrice] = React.useState(null)
    const [city, setCity] = React.useState(null)
    const [district, setDistrict] = React.useState(null)
    const [quarter, setQuarter] = React.useState(null)
    const [alley, setAlley] = React.useState(null)
    const [description, setDescription] = React.useState(null)
    const [location, setLocation] = React.useState([35.6973918, 51.3476617, 15])


    // ****

    const handleUpload = async () => {
        return new Promise(async (resolve, reject) => {
            let thumbID = null, picturesID = []
            setUploading(true)
            setUploaded([])
            let upo = []

            for (let pic in pictures) {
                const formData = new FormData();
                formData.append("file", pictures[pic]);
                try {
                    const config = {
                        onUploadProgress: (progressEvent) => {
                            // console.log(progressEvent.loaded)
                        }
                    }
                    const response = await API.POST(true, config)('wp/v2/media/', formData)

                    if (parseInt(pic) === thumbIndex) thumbID = response.data.id
                    else picturesID.push(response.data.id)
                    upo.push(pic)

                } catch (error) {
                    reject(error)
                }
            }

            setUploaded(upo)
            setUploading(false)
            picturesID = [thumbID].concat(picturesID)
            resolve({ thumbID, picturesID })
        })
    }


    const submit = async () => {

        closeSnackbar()

        setLoading(true)
        setDisabled(true)


        try {

            let upload = { picturesID: [], thumbID: null }
            if (pictures.length > 0) {
                const uploadingSnackKey = enqueueSnackbar("در حال آپلود تصاویر...", { variant: 'info', autoHideDuration: null })
                upload = await handleUpload()
                closeSnackbar(uploadingSnackKey)
            }


            const data = {
                type: fileType,
                city,
                district,
                quarter,
                alley,
                location,
                price,
                description,
                pictures: upload.picturesID,
                thumb: upload.thumbID,
                [fileType]: mainData
            }

            await API.POST(true)('rapp/v1/addFile', data)

            setSuccess(true)

        } catch (error) {
            closeSnackbar()
            API.ResponseError(enqueueSnackbar, error)
            setError(true)
        }

        setLoading(false)
        setDisabled(false)
    }


    React.useEffect(() => {
        if (!mainData) history.replace("/")
    }, [])


    const persianFileType = typeFileConvert2Persian(fileType)

    if (success) return <Success />
    if (error) return <Error />

    return (
        <Zoom in={true} mountOnEnter unmountOnExit style={{ transitionDelay: '100ms' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: 400, }}>
                    <AppBar
                        title={"ثبت " + persianFileType}
                    />
                    <Box sx={{ p: 3, }}>
                        <Grid container direction="stretch" spacing={3} alignItems="center" justifyContent="center">
                            <Grid item xs={12}>
                                <ImageChooser
                                    pictures={pictures}
                                    setPictures={setPictures}
                                    thumb={thumbIndex}
                                    setThumb={setThumbIndex}
                                    uploaded={uploaded}
                                    uploading={uploading}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="قیمت هر متر مربع (تومان)"
                                    autoComplete="true"
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    disabled={disabled}
                                    InputProps={{
                                        inputComponent: PriceFormatCustom,
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="شهر"
                                    autoComplete="true"
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    disabled={disabled}
                                    inputProps={{ style: { direction: 'rtl', } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="منطقه"
                                    autoComplete="true"
                                    type="text"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    disabled={disabled}
                                    inputProps={{ style: { direction: 'rtl', } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="محله"
                                    autoComplete="true"
                                    type="text"
                                    value={quarter}
                                    onChange={(e) => setQuarter(e.target.value)}
                                    disabled={disabled}
                                    inputProps={{ style: { direction: 'rtl', } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="کوچه"
                                    autoComplete="true"
                                    type="text"
                                    value={alley}
                                    onChange={(e) => setAlley(e.target.value)}
                                    disabled={disabled}
                                    inputProps={{ style: { direction: 'rtl', } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="توضیحات"
                                    autoComplete="true"
                                    type="text"
                                    multiline
                                    rows={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    disabled={disabled}
                                    inputProps={{ style: { direction: 'rtl', } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocationChooser
                                    location={location}
                                    setLocation={setLocation}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    variant="contained"
                                    size="large"
                                    children={"ثبت " + persianFileType}
                                    onClick={submit}
                                    disabled={disabled}
                                    loading={loading}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>



        </Zoom>
    )
}
export default Page;


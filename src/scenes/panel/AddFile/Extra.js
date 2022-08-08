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


import { Success as SuccessAdd, Error as ErrorAdd } from "./Result"

import { useDispatch, } from "react-redux";

import { FullMap } from "../../../components/LocationChooser"
import { PriceFormatCustom } from "../../../components/TextField"
import validex from 'validex'


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

    const [fullmap, setFullmap] = React.useState(false)

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

        let data = {
            type: fileType,
            city,
            district,
            quarter,
            alley,
            location,
            price: parseInt(price),
            description,
            pictures: [],
            thumb: null,
            [fileType]: mainData
        }





        const schema = {
            price: {
                nameAlias: "قیمت",
                required: [true, new Error("$field الزامی است")],
                type: ['number', new Error("$field به درستی وارد نشده است")]
            },
            city: {
                nameAlias: "شهر",
                required: [true, new Error("$field الزامی است")],
            },
            district: {
                nameAlias: "منطقه",
                required: [true, new Error("$field الزامی است")],
            },

        }


        const validator = validex(data, schema)
        const isValidate = validator.validate()

        if (!isValidate) {
            const errors = validator.getError()
            return enqueueSnackbar(Object.values(errors)[0], { variant: "error" })
        }


        setLoading(true)
        setDisabled(true)


        try {

            if (pictures.length > 0) {
                const uploadingSnackKey = enqueueSnackbar("در حال آپلود تصاویر...", { variant: 'info', autoHideDuration: null })
                const { picturesID, thumbID } = await handleUpload()
                closeSnackbar(uploadingSnackKey)

                data.pictures = picturesID
                data.thumb = thumbID
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

    if (success) return <SuccessAdd />
    if (error) return <ErrorAdd />

    return (
        <Zoom in={true} mountOnEnter unmountOnExit style={{ transitionDelay: '100ms' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>

                {fullmap &&
                    <FullMap
                        location={location}
                        setLocation={setLocation}
                        disabled={disabled}
                        close={() => setFullmap(false)}
                    />
                }

                <Box sx={{ maxWidth: 400, width: '100%', display: fullmap && "none" }}>
                    <AppBar
                        title={"ثبت " + persianFileType}
                    />
                    <Box sx={{ m: 3, }}>
                        <Grid container direction="column" spacing={3} alignItems="stretch" wrap="nowrap" sx={{ height: '100%' }}>
                            <Grid item>
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
                            <Grid item>
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
                            <Grid item>
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
                            <Grid item>
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
                            <Grid item>
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
                            <Grid item>
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
                            <Grid item>
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
                            <Grid item>
                                <LocationChooser
                                    location={location}
                                    setLocation={setLocation}
                                    disabled={disabled}
                                    fullMap={() => setFullmap(true)}
                                />
                            </Grid>
                            <Grid item>
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


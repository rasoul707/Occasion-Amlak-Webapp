/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Zoom } from "@mui/material"
import { useHistory, useLocation } from "react-router-dom";
import * as React from 'react';
import AppBar from "../../../../components/AppBar"
import TextField, { JustPersianFormatCustom } from "../../../../components/TextField"
import SelectOption from "../../../../components/SelectOption"
import { villaEquipmentsList, villaTypesList, documentsTypeList, typeFileConvert2Persian } from "../../../../constants/file"
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab'
import validex from 'validex'
import { useDispatch, } from "react-redux";

const Page = () => {

    const dispatch = useDispatch()
    const appLoader = (payload) => dispatch({ type: 'BACKDROP', payload: { backdrop: payload } })
    React.useState(() => { appLoader(false) }, [])

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const locationH = useLocation()
    const history = useHistory()
    const fileType = locationH.pathname.split("/")[2]

    // ***

    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [type, setType] = React.useState(null)
    const [landArea, setLandArea] = React.useState(null)
    const [buildingArea, setBuildingArea] = React.useState(null)
    const [constructionYear, setConstructionYear] = React.useState(null)
    const [documentType, setDocumentType] = React.useState(null)
    const [roomsCount, setRoomsCount] = React.useState(null)
    const [mastersCount, setMastersCount] = React.useState(null)
    const [equipments, setEquipments] = React.useState([])



    const next = () => {
        closeSnackbar()
        const data = {
            type,
            landArea: parseFloat(landArea),
            buildingArea: parseFloat(buildingArea),
            constructionYear: parseInt(constructionYear),
            documentType,
            roomsCount: parseInt(roomsCount),
            mastersCount: parseInt(mastersCount),
            equipments,
        }
        const schema = {
            type: {
                nameAlias: "نوع ویلا",
                required: [true, new Error("$field الزامی است")],
                oneOf: [villaTypesList, new Error("$field به درستی انتخاب نشده است")]
            },
            landArea: {
                nameAlias: "متراژ زمین",
                required: [true, new Error("$field الزامی است")],
                type: ['number', new Error("$field به درستی وارد نشده است")]
            },
            buildingArea: {
                nameAlias: "متراژ بنا",
                required: [true, new Error("$field الزامی است")],
                type: ['number', new Error("$field به درستی وارد نشده است")]
            },
            constructionYear: {
                nameAlias: "سال ساخت",
                required: [true, new Error("$field الزامی است")],
                type: ['number', new Error("$field به درستی وارد نشده است")]
            },
            documentType: {
                nameAlias: "نوع سند",
                required: [true, new Error("$field الزامی است")],
                oneOf: [documentsTypeList, new Error("$field به درستی انتخاب نشده است")]
            },
            roomsCount: {
                nameAlias: "تعداد اتاق",
                required: [true, new Error("$field الزامی است")],
                type: ['number', new Error("$field به درستی وارد نشده است")]
            },
            mastersCount: {
                nameAlias: "تعداد مستر",
                required: [true, new Error("$field الزامی است")],
                type: ['number', new Error("$field به درستی وارد نشده است")]
            },
        }

        const validator = validex(data, schema)
        const isValidate = validator.validate()

        if (!isValidate) {
            const errors = validator.getError()
            return enqueueSnackbar(Object.values(errors)[0], { variant: "error" })
        }

        setDisabled(true)
        setLoading(true)


        history.replace(`/new/${fileType}/extra`, { [fileType]: data })
    }


    const persianFileType = typeFileConvert2Persian(fileType)


    return (
        <Zoom in={true} mountOnEnter unmountOnExit>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: 400, }}>
                    <AppBar
                        title={"ثبت " + persianFileType}
                    />
                    <Box sx={{ m: 3, }}>
                        <Grid container direction="column" spacing={3} alignItems="stretch" wrap="nowrap" sx={{ height: '100%' }}>
                            <Grid item>
                                <SelectOption
                                    items={villaTypesList}
                                    value={type}
                                    onChange={(v) => setType(v)}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="متراژ زمین"
                                    autoComplete="true"
                                    type="text"
                                    value={landArea}
                                    onChange={(e) => setLandArea(e.target.value)}
                                    disabled={disabled}
                                    InputProps={{
                                        inputComponent: JustPersianFormatCustom,
                                    }}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    label="متراژ بنا"
                                    autoComplete="true"
                                    type="text"
                                    value={buildingArea}
                                    onChange={(e) => setBuildingArea(e.target.value)}
                                    disabled={disabled}
                                    InputProps={{
                                        inputComponent: JustPersianFormatCustom,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="سال ساخت"
                                    autoComplete="true"
                                    type="text"
                                    value={constructionYear}
                                    onChange={(e) => setConstructionYear(e.target.value)}
                                    disabled={disabled}
                                    InputProps={{
                                        inputComponent: JustPersianFormatCustom,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <SelectOption
                                    items={documentsTypeList}
                                    value={documentType}
                                    onChange={(v) => setDocumentType(v)}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="تعداد اتاق"
                                    autoComplete="true"
                                    type="text"
                                    value={roomsCount}
                                    onChange={(e) => setRoomsCount(e.target.value)}
                                    disabled={disabled}
                                    InputProps={{
                                        inputComponent: JustPersianFormatCustom,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="تعداد مستر"
                                    autoComplete="true"
                                    type="text"
                                    value={mastersCount}
                                    onChange={(e) => setMastersCount(e.target.value)}
                                    disabled={disabled}
                                    InputProps={{
                                        inputComponent: JustPersianFormatCustom,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <SelectOption
                                    items={villaEquipmentsList}
                                    value={equipments}
                                    onChange={(v) => setEquipments(v)}
                                    multiple
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid item >
                                <LoadingButton
                                    variant="contained"
                                    size="large"
                                    children="ثبت و ادامه"
                                    onClick={next}
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


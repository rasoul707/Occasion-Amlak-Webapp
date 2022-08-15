/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Zoom } from "@mui/material"
import { useHistory, useLocation } from "react-router-dom";
import * as React from 'react';
import AppBar from "../../../../components/AppBar"
import TextField, { JustPersianFormatCustom } from "../../../../components/TextField"
import SelectOption from "../../../../components/SelectOption"
import { apartmentEquipmentsList, documentsTypeList, typeFileConvert2Persian } from "../../../../constants/file"
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

    const [floorsCount, setFloorsCount] = React.useState(null)
    const [unitsCount, setUnitsCount] = React.useState(null)
    const [floor, setFloor] = React.useState(null)
    const [area, setArea] = React.useState(null)
    const [documentType, setDocumentType] = React.useState(null)
    const [roomsCount, setRoomsCount] = React.useState(null)
    const [mastersCount, setMastersCount] = React.useState(null)
    const [equipments, setEquipments] = React.useState([])



    const next = () => {
        closeSnackbar()
        const data = {
            floorsCount: parseFloat(floorsCount),
            unitsCount: parseFloat(unitsCount),
            floor: parseFloat(floor),
            area: parseFloat(area),
            documentType,
            roomsCount: parseInt(roomsCount),
            mastersCount: parseInt(mastersCount),
            equipments,
        }
        const schema = {
            floorsCount: {
                nameAlias: "تعداد طبقات",
                required: [true, new Error("$field الزامی است")],
                type: ['number', new Error("$field به درستی وارد نشده است")]
            },
            unitsCount: {
                nameAlias: "تعداد کل واحدها",
                required: [true, new Error("$field الزامی است")],
                type: ['number', new Error("$field به درستی وارد نشده است")]
            },
            floor: {
                nameAlias: "طبقه مورد نظر برای فروش",
                required: [true, new Error("$field الزامی است")],
                type: ['number', new Error("$field به درستی وارد نشده است")]
            },
            area: {
                nameAlias: "متراژ",
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


        localStorage.setItem('newFileDataStates', JSON.stringify(data))
        history.push(`/new/${fileType}/extra`, { [fileType]: data })
    }

    React.useEffect(() => {
        if (localStorage.getItem('newFileDataStates') && history.action === "POP") {
            const data = JSON.parse(localStorage.getItem('newFileDataStates'))
            if (data.floorsCount) setFloorsCount(data.floorsCount)
            if (data.unitsCount) setUnitsCount(data.unitsCount)
            if (data.floor) setFloor(data.floor)
            if (data.area) setArea(data.area)
            if (data.documentType) setDocumentType(data.documentType)
            if (data.roomsCount) setRoomsCount(data.roomsCount)
            if (data.mastersCount) setMastersCount(data.mastersCount)
            if (data.equipments) setEquipments(data.equipments)
        }
        localStorage.removeItem('newFileDataStates')
    }, [])


    const persianFileType = typeFileConvert2Persian(fileType)


    return (
        <Zoom in={true} mountOnEnter unmountOnExit>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: '100%', m: 3, }}>

                    <Grid container direction="column" gap={3} alignItems="stretch" wrap="nowrap" sx={{ height: '100%' }}>
                        <AppBar
                            title={"ثبت " + persianFileType}
                        />
                        <Grid item >
                            <TextField
                                label="تعداد طبقات"
                                autoComplete="true"
                                type="text"
                                value={floorsCount}
                                onChange={(e) => setFloorsCount(e.target.value)}
                                disabled={disabled}
                                InputProps={{
                                    inputComponent: JustPersianFormatCustom,
                                }}
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                                label="تعداد کل واحدها"
                                autoComplete="true"
                                type="text"
                                value={unitsCount}
                                onChange={(e) => setUnitsCount(e.target.value)}
                                disabled={disabled}
                                InputProps={{
                                    inputComponent: JustPersianFormatCustom,
                                }}
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                                label="طبقه مورد نظر برای فروش"
                                autoComplete="true"
                                type="text"
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                disabled={disabled}
                                InputProps={{
                                    inputComponent: JustPersianFormatCustom,
                                }}
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                                label="متراژ"
                                autoComplete="true"
                                type="text"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                disabled={disabled}
                                InputProps={{
                                    inputComponent: JustPersianFormatCustom,
                                }}
                            />
                        </Grid>
                        <Grid item >
                            <SelectOption
                                items={documentsTypeList}
                                value={documentType}
                                onChange={(v) => setDocumentType(v)}
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                                label="تعداد خواب"
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
                        <Grid item >
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
                        <Grid item >
                            <SelectOption
                                items={apartmentEquipmentsList}
                                value={equipments}
                                onChange={(v) => setEquipments(v)}
                                multiple
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item xs={12} />
                        <Grid item sx={{ pb: 2 }}>
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
        </Zoom>
    )
}
export default Page;


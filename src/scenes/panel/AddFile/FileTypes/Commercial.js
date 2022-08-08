/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Zoom } from "@mui/material"
import { useHistory, useLocation } from "react-router-dom";
import * as React from 'react';
import AppBar from "../../../../components/AppBar"
import TextField, { JustPersianFormatCustom } from "../../../../components/TextField"
import SelectOption from "../../../../components/SelectOption"
import { commercialTypesList, documentsTypeList, typeFileConvert2Persian } from "../../../../constants/file"
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
    const [area, setArea] = React.useState(null)
    const [documentType, setDocumentType] = React.useState(null)
    const [floor, setFloor] = React.useState(null)
    const [commercialArea, setCommercialArea] = React.useState(null)





    const next = () => {
        closeSnackbar()
        const data = {
            type,
            area: parseFloat(area),
            documentType,
            floor: parseFloat(floor),
            commercialArea: parseFloat(commercialArea),
        }
        const schema = {
            type: {
                nameAlias: "نوع تجاری",
                required: [true, new Error("$field الزامی است")],
                oneOf: [commercialTypesList, new Error("$field به درستی انتخاب نشده است")]
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
            floor: {
                nameAlias: "طبقه ملک",
                required: [true, new Error("$field الزامی است")],
                type: ['number', new Error("$field به درستی وارد نشده است")]
            },
            commercialArea: {
                nameAlias: "متراژ بر تجاری",
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
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: 400, m: 3, }}>
                    <AppBar
                        title={"ثبت " + persianFileType}
                    />
                    <Grid container direction="column" spacing={3} alignItems="stretch" wrap="nowrap" sx={{ height: '100%' }}>
                        <Grid item>
                            <SelectOption
                                items={commercialTypesList}
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
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
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
                                label="طبقه ملک"
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
                        <Grid item>
                            <TextField
                                label="متراژ بر تجاری"
                                autoComplete="true"
                                type="text"
                                value={commercialArea}
                                onChange={(e) => setCommercialArea(e.target.value)}
                                disabled={disabled}
                                InputProps={{
                                    inputComponent: JustPersianFormatCustom,
                                }}
                            />
                        </Grid>

                        <Grid item>
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


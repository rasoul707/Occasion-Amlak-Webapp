/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Zoom } from "@mui/material"
import { useHistory, useLocation } from "react-router-dom";
import * as React from 'react';
import AppBar from "../../../../components/AppBar"
import TextField, { JustPersianFormatCustom } from "../../../../components/TextField"
import SelectOption from "../../../../components/SelectOption"
import { usageStatusLandHectareList, tissueStatusLandHectareList, documentsTypeList, typeFileConvert2Persian } from "../../../../constants/file"
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab'
import validex from 'validex'
import { useDispatch, } from "react-redux";
import Checkbox from "../../../../components/Checkbox"




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

    const [usageStatus, setUsageStatus] = React.useState(null)
    const [tissueStatus, setTissueStatus] = React.useState(null)
    const [area, setArea] = React.useState(null)
    const [documentType, setDocumentType] = React.useState(null)
    const [withOldBuilding, setWithOldBuilding] = React.useState(false)




    const next = () => {
        closeSnackbar()
        const data = {
            usageStatus,
            tissueStatus,
            area: parseFloat(area),
            documentType,
            withOldBuilding
        }
        const schema = {
            usageStatus: {
                nameAlias: "وضعیت کاربری",
                required: [true, new Error("$field الزامی است")],
                oneOf: [usageStatusLandHectareList, new Error("$field به درستی انتخاب نشده است")]
            },
            tissueStatus: {
                nameAlias: "وضعیت بافت",
                required: [true, new Error("$field الزامی است")],
                oneOf: [tissueStatusLandHectareList, new Error("$field به درستی انتخاب نشده است")]
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
            if (data.usageStatus) setUsageStatus(data.usageStatus)
            if (data.tissueStatus) setTissueStatus(data.tissueStatus)
            if (data.area) setArea(data.area)
            if (data.documentType) setDocumentType(data.documentType)
            if (data.withOldBuilding) setWithOldBuilding(data.withOldBuilding)
        }
        localStorage.removeItem('newFileDataStates')
    }, [])


    const persianFileType = typeFileConvert2Persian(fileType)


    return (
        <Zoom in={true} mountOnEnter unmountOnExit>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: '100%', m: 3, }}>
                    <AppBar
                        title={"ثبت " + persianFileType}
                    />
                    <Grid container direction="column" spacing={3} alignItems="stretch" wrap="nowrap" sx={{ height: '100%' }}>
                        <Grid item>
                            <SelectOption
                                items={usageStatusLandHectareList}
                                value={usageStatus}
                                onChange={(v) => setUsageStatus(v)}
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item>
                            <SelectOption
                                items={tissueStatusLandHectareList}
                                value={tissueStatus}
                                onChange={(v) => setTissueStatus(v)}
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item>
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
                        <Grid item>
                            <SelectOption
                                items={documentsTypeList}
                                value={documentType}
                                onChange={(v) => setDocumentType(v)}
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item >
                            <Checkbox
                                label="دارای بنای قدیمی"
                                checked={withOldBuilding}
                                onChange={(e) => setWithOldBuilding(e.target.checked)}
                                disabled={disabled}
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


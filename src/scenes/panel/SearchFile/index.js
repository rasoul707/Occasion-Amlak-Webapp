/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Zoom, Slider, InputLabel, Typography, Select, MenuItem, } from "@mui/material"
import * as React from 'react';
import AppBar, { Leading } from "../../../components/AppBar"
import { fileTypesList, typeConvert2Slug, typeFileConvert2Persian } from "../../../constants/file"
import { useSnackbar } from 'notistack';
import * as API from "../../../api";

import SelectOption from "../../../components/SelectOption";
import TextField, { JustPersianFormatCustom } from "../../../components/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import FilesList from "../FilesList"
import moment from "moment";
import { useDispatch, } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";
import NumberFormat from 'react-number-format';


const sortingList = [
    {
        value: "-time",
        title: "جدیدترین"
    },
    {
        value: "time",
        title: "قدیمی ترین"
    },
    {
        value: "-price",
        title: "گران ترین"
    },
    {
        value: "price",
        title: "ارزان ترین"
    },
]


const minPrice = 0
const maxPrice = 100000000

const Page = () => {

    const history = useHistory()
    const location = useLocation()

    const dispatch = useDispatch()
    const appLoader = (payload) => dispatch({ type: 'BACKDROP', payload: { backdrop: payload } })
    React.useState(() => { appLoader(false) }, [])

    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)


    const { enqueueSnackbar, closeSnackbar } = useSnackbar()



    const [sorting, setSorting] = React.useState('-time')
    // ****
    const [price, setPrice] = React.useState([25000000, 75000000]);
    const [type, setType] = React.useState([])
    const [district, setDistrict] = React.useState(null)
    const [area, setArea] = React.useState(null)
    const [buildingArea, setBuildingArea] = React.useState(null)


    // ****
    const [fileList, setFileList] = React.useState([])




    const submit = async () => {
        closeSnackbar()

        const _type = type.map(typeConvert2Slug)
        let queryParam = `price=${price.join(",")}`
        if (_type.length) queryParam += `&type=${_type.join(",")}`
        if (district) queryParam += `&district=${district}`
        if (area) queryParam += `&area=${area}`
        if (buildingArea) queryParam += `&buildingArea=${buildingArea}`

        history.replace(`/search?${queryParam}`)
    }



    const search = async (queryParam) => {
        setLoading(true)
        setDisabled(true)

        try {
            const response = await API.GET(false)(`rapp/v1/searchFile${queryParam}`)
            if (!response.data?.files?.length) {
                enqueueSnackbar("چیزی یافت نشد! دوباره تلاش کنید", { variant: "error" })
            }
            setFileList(response.data?.files)

        } catch (error) {
            API.ResponseError(enqueueSnackbar, error)
        }

        setLoading(false)
        setDisabled(false)
    }
    React.useEffect(() => {
        setFileList([])
        if (location.search) search(location.search)
    }, [location])


    React.useEffect(() => {
        const params = Object.fromEntries(new URLSearchParams(location.search))
        if (params?.price?.split(",").length) setPrice(params?.price?.split(","))
        if (params?.type?.split(",").length) setType(params?.type?.split(",").map(typeFileConvert2Persian))
        setDistrict(params?.district || district)
        setArea(params?.area || area)
        setBuildingArea(params?.buildingArea || buildingArea)
    }, [])





    if (fileList?.length > 0) {
        const files = fileList.sort((a, b) => {
            if (sorting === 'time') {
                return moment(a.modified).diff(moment(b.modified))
            }
            else if (sorting === '-price') {
                return b.price - a.price
            }
            else if (sorting === 'price') {
                return a.price - b.price
            }
            return moment(b.modified).diff(moment(a.modified))
        })


        return <FilesList
            appBar={<AppBar
                title={fileList.length + " مورد یافت شد"}
                center={false}
                titleVariant="h6"
                autoLeading={true}
                leading={<Leading Icon={FilterAltIcon} onClick={() => { setFileList([]) }} title="جستجوی مجدد" />}
                bottom={
                    <Grid container spacing={1} justifyContent="space-between" alignItems="center" sx={{ mb: 1 }} >
                        <Grid item>
                            <Typography sx={{ fontWeight: 500, }} noWrap variant="subtitle1" color="#111111">
                                مرتب سازی بر اساس:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Select
                                label="Degree"
                                value={sorting}
                                onChange={(e) => setSorting(e.target.value)}
                                disabled={disabled}
                                size="small"
                                sx={{ height: 30, width: 130, background: "#D9D9D9!important", "& .MuiSelect-icon": { color: "white" } }}
                                IconComponent={ExpandCircleDownIcon}
                            >
                                {sortingList.map(({ value, title }) => <MenuItem value={value}>{title}</MenuItem>)}
                            </Select>
                        </Grid>
                    </Grid>
                }
            />}
            files={files}
        />
    }



    return (
        <Zoom in={true} mountOnEnter unmountOnExit style={{ transitionDelay: '100ms' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: '100%', m: 3, }}>
                    <AppBar
                        title={"جستجوی فایل"}
                        center={false}
                        titleVariant="h6"
                        autoLeading={true}
                    />
                    <Grid container direction="column" spacing={3} alignItems="stretch" wrap="nowrap" >
                        <Grid item>
                            <InputLabel
                                focused
                                disableAnimation={true}
                                sx={{ fontSize: ".75rem" }}
                            >
                                محدوده قیمت (هر متر مربع)
                            </InputLabel>
                            <Slider
                                step={2500000}
                                min={minPrice}
                                max={maxPrice}
                                valueLabelDisplay="auto"
                                value={price}
                                onChange={(e, val) => setPrice(val)}
                                disabled={disabled}
                            />
                            <InputLabel
                                focused
                                disableAnimation={true}
                                sx={{ fontSize: ".75rem" }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>
                                        <NumberFormat value={minPrice} displayType={'text'} thousandSeparator={true} />
                                    </span>
                                    <span>
                                        <NumberFormat value={maxPrice} displayType={'text'} thousandSeparator={true} />
                                    </span>
                                </div>
                            </InputLabel>
                        </Grid>
                        <Grid item>
                            <SelectOption
                                items={fileTypesList}
                                value={type}
                                onChange={(v) => setType(v)}
                                disabled={disabled}
                                multiple
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
                            <LoadingButton
                                variant="contained"
                                size="large"
                                children="جستجو"
                                onClick={submit}
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





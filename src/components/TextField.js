import { TextField as MUITextField, } from "@mui/material"


const TextField = (props) => {

    return <MUITextField
        InputLabelProps={{ shrink: true, disableAnimation: true, color: 'mainTextColor', focused: true, sx: { ml: 2 } }}
        inputProps={{ style: { direction: 'ltr', } }}
        variant="outlined"
        fullWidth

        {...props}
    />
}

export default TextField
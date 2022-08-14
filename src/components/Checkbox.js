import { Checkbox as MUICheckbox, FormControl, FormGroup, FormControlLabel } from "@mui/material"
import * as React from 'react'




const Checkbox = ({ label, ...others }) => {

    return <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
            <FormControlLabel
                value="top"
                control={<MUICheckbox {...others} />}
                label={label}
                labelPlacement="right"
            />
        </FormGroup>
    </FormControl>
}

export default Checkbox
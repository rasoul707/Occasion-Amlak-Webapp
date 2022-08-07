import { TextField as MUITextField, } from "@mui/material"
import NumberFormat from 'react-number-format';
import * as React from 'react';

const persianNumeral = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
export const PriceFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
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
            customNumerals={persianNumeral}
        />
    );
});

export const JustPersianFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
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
            customNumerals={persianNumeral}
        />
    );
});





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
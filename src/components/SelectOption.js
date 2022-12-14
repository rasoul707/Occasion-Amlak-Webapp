import { Chip, Stack, Tooltip, } from "@mui/material"


const SelectOption = ({ items, disabled, value, onChange, multiple }) => {

    const clickHandler = (v) => {
        if (multiple) {
            if (value.includes(v)) {
                const m = value.filter(s => s !== v)
                onChange(m)
            } else {
                const m = [...value, v]
                onChange(m)
            }
        } else {
            if (value !== v) {
                onChange(v)
            }
        }
    }
    return <Stack direction="row" spacing={1} sx={{ pb: 1, padding: "1px", maxWidth: "398px", width: "calc(100vw - 48px)", overflowX: "scroll", }}>
        {items.map(v => {
            const active = multiple ? value.includes(v) : v === value
            return <Tooltip title={v}>
                <Chip
                    label={v}
                    color={active ? "primary" : "default"}
                    onClick={() => clickHandler(v)}
                    clickable
                    disabled={disabled}
                />
            </Tooltip>
        })}
    </Stack>
}

export default SelectOption

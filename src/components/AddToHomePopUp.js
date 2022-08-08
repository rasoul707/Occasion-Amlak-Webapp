/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Dialog, DialogTitle, DialogContent, } from "@mui/material"
import * as React from 'react';



const AddToHomePopUp = ({ close }) => {
    return <Dialog
        open={true}
        keepMounted
        onClose={close}
    >
        <DialogTitle>افزودن به صفحه اصلی</DialogTitle>
        <DialogContent >
            <Typography>
                لطفا برای بهبود عملکرد اپلیکیشن را از طریق Add to home به صفحه اصلی اضافه کنید
            </Typography>
        </DialogContent>
    </Dialog>

}

export default AddToHomePopUp
import { SwipeableDrawer, Button, IconButton, Box, Typography, Grid, ImageList, ImageListItem, } from "@mui/material"
import * as React from 'react';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

const ImageChooser = ({ pictures, setPictures, thumb, setThumb, uploaded, uploading, disabled }) => {

    const [open, setOpen] = React.useState(false)




    const handleChooseImage = async (ev) => {
        const files = ev.target.files;
        if (!files.length) return;

        let pics = []
        for (let i = 0; i <= Object.keys(files).length; i++) {
            if (!files[i]) continue
            pics.push(files[i])
        }
        setPictures([...pictures, ...pics])
        setThumb(0)
    }




    const handleThumb = (index) => {
        setThumb(index)
    }

    const remove = (index) => {
        setPictures(pictures.filter((v, ind) => index !== ind))
        if (index === thumb) handleThumb(0)
        if (index < thumb) handleThumb(--thumb)
        if (pictures.length === 0) handleThumb(null)
    }


    let mainButton = "انتخاب تصاویر"
    if (pictures.length > 0) {
        mainButton = pictures.length + " تصویر انتخاب شد"
        if (uploading) {
            mainButton = "در حال آپلود (" + uploaded.length + "/" + pictures.length + ")"
        }
        if (uploaded.length === pictures.length) {
            mainButton = "تکمیل آپلود"
        }
    }

    disabled = disabled || uploading || (pictures.length > 0 && uploaded.length === pictures.length)


    return <>
        <Button
            variant="contained"
            size="large"
            color="secondary"
            children={mainButton}
            startIcon={<PhotoLibraryIcon />}
            onClick={() => setOpen(true)}
            fullWidth
        />
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            disableSwipeToOpen
            PaperProps={{ sx: { borderTopRightRadius: 30, borderTopLeftRadius: 30 } }}
        >

            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: 400, }}>
                    <Box sx={{ m: 3, }}>
                        <Typography align="center" noWrap variant="h5" sx={{ fontWeight: 700, color: "#111111" }}>
                            تصاویر {pictures.length > 0 && "(" + pictures.length + ")"}
                        </Typography>
                        <Grid container direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    component="label"
                                    fullWidth
                                    disabled={disabled}
                                >
                                    از دوربین
                                    <input accept="image/*" type="file" style={{ display: "none" }} capture="camera" multiple onChange={handleChooseImage} disabled={disabled} />
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    component="label"
                                    fullWidth
                                    disabled={disabled}
                                >
                                    از گالری
                                    <input accept="image/*" type="file" style={{ display: "none" }} multiple onChange={handleChooseImage} disabled={disabled} />
                                </Button>
                            </Grid>
                        </Grid>

                        {pictures.length === 0 &&
                            <Typography sx={{ mt: 10, mb: 10 }} textAlign="center">
                                شما هنوز هیچ تصویری اضافه نکرده اید
                            </Typography>
                        }

                        {pictures.length > 0 &&
                            <ImageList cols={3} sx={{ maxHeight: 300, }}>
                                {pictures.map((file, index) => {
                                    const path = URL.createObjectURL(file)
                                    return (
                                        <ImageListItem
                                            key={path}
                                            sx={{ aspectRatio: "1" }}
                                        >
                                            <img
                                                src={`${path}`}
                                                srcSet={`${path}`}
                                                alt={file.name}
                                                loading="lazy"
                                                sx={{ objectFit: "fill", cursor: "pointer", aspectRatio: 1 }}
                                            />

                                            {disabled ? null :
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: 'rgba(244, 67, 54, 1)',
                                                        position: 'absolute',
                                                        p: 0.25,
                                                        left: 0,
                                                        top: 0
                                                    }}
                                                    onClick={() => remove(index)}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            }



                                            {thumb === index
                                                ?
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: 'rgba(241, 181, 0, 1)',
                                                        position: 'absolute',
                                                        p: 0.25,
                                                        right: 0,
                                                        bottom: 0
                                                    }}
                                                >
                                                    <StarIcon />
                                                </IconButton>
                                                :

                                                disabled ? null : <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: 'rgba(124, 124, 124, 1)',
                                                        position: 'absolute',
                                                        p: 0.25,
                                                        right: 0,
                                                        bottom: 0
                                                    }}
                                                    onClick={() => handleThumb(index)}
                                                >
                                                    <StarOutlineIcon />
                                                </IconButton>
                                            }


                                        </ImageListItem>
                                    )
                                })}
                            </ImageList>
                        }
                        {pictures.length > 0 &&
                            <Button
                                variant="contained"
                                size="large"
                                children={disabled ? "بستن" : "تایید"}
                                onClick={() => setOpen(false)}
                                fullWidth
                            />
                        }

                    </Box>
                </Box>
            </Box>
        </SwipeableDrawer>

    </>
}

export default ImageChooser

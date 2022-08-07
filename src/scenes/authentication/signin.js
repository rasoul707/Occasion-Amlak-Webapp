import * as React from "react"
import { Typography, Grid, Box } from "@mui/material"
import { LoadingButton } from '@mui/lab'
import { useState } from "react";
import Logo from "../../components/Logo"
import * as API from "../../api";
import { useSnackbar } from 'notistack';
import validex from 'validex'

import TextField from "../../components/TextField"
import { useDispatch, } from "react-redux";

const SignIn = () => {

    const { enqueueSnackbar } = useSnackbar()


    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch()
    const appLoader = (payload) => dispatch({ type: 'BACKDROP', payload: { backdrop: payload } })
    React.useState(() => { appLoader(false) }, [])


    const submit = async () => {

        const data = {
            username: username,
            password: password
        }
        const schema = {
            username: {
                nameAlias: "نام کاربری",
                required: [true, new Error("$field الزامی است")],
                type: 'string',
            },
            password: {
                nameAlias: "رمز اکانت",
                required: [true, new Error("$field الزامی است")],
                type: 'string'
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

        try {
            const response = await API.POST(false)('jwt-auth/v1/token', data)

            localStorage.setItem("access_token", 'Bearer ' + response.data.token);
            enqueueSnackbar("خوش آمدید 😉🤝", { variant: 'success' })

            setTimeout(() => {
                window.location.reload();
            }, 1000)

            setLoading(false)

        } catch (error) {
            API.ResponseError(enqueueSnackbar, error)
            setDisabled(false)
            setLoading(false)
        }

    }



    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: 400, width: 400, }}>
                <Box sx={{ p: 3, }}>
                    <Grid container direction="column" spacing={4} alignItems="stretch" justifyContent="center">
                        <Grid item xs={12}>
                            <Logo />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5" sx={{ fontWeight: 900, mt: 6, mb: 3, color: "#111111" }}>فرم ورود</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="نام کاربری"
                                autoComplete="true"
                                type="text"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="رمز اکانت"
                                autoComplete="true"
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                disabled={disabled}
                                onKeyDown={(e) => e.key === 'Enter' && submit()}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton
                                variant="contained"
                                size="large"
                                sx={{ mt: 5 }}
                                children="ورود به سامانه"
                                onClick={submit}
                                disabled={disabled}
                                loading={loading}
                                fullWidth
                            />
                        </Grid>



                    </Grid>
                </Box>
            </Box>
        </Box>
    );


}
export default SignIn; 
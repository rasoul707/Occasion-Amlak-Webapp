import axios from "axios";
import { APIBaseUrl as baseUrl } from "../config/server"


const headers = () => { return { headers: { Authorization: `${localStorage.getItem('access_token')}` } } }
const defaultConfig = () => { return { timeout: 30000 } }

export const POST = (withToken = true, config = {}) => async (url = '', data = {}) => {
    if (!config) config = {}
    config = { ...defaultConfig(), ...config }
    if (withToken) config = { ...headers(), ...config, }
    return await axios.post(`${baseUrl}${url}`, data, config).catch((error) => { throw error.response })
}

export const GET = (withToken = true, config = {}) => async (url = '') => {
    if (!config) config = {}
    config = { ...defaultConfig(), ...config }
    if (withToken) config = { ...headers(), ...config, }
    return await axios.get(`${baseUrl}${url}`, config).catch((error) => { throw error.response })
}

export const PUT = (withToken = true, config = {}) => async (url = '', data = {}) => {
    if (!config) config = {}
    config = { ...defaultConfig(), ...config }
    if (withToken) config = { ...headers(), ...config, }
    return await axios.put(`${baseUrl}${url}`, data, config).catch((error) => { throw error.response })
}

export const PATCH = (withToken = true, config = {}) => async (url = '', data = {}) => {
    if (!config) config = {}
    config = { ...defaultConfig(), ...config }
    if (withToken) config = { ...headers(), ...config, }
    return await axios.patch(`${baseUrl}${url}`, data, config).catch((error) => { throw error.response })
}

export const DELETE = (withToken = true, config = {}) => async (url = '') => {
    if (!config) config = {}
    config = { ...defaultConfig(), ...config }
    if (withToken) config = { ...headers(), ...config, }
    return await axios.delete(`${baseUrl}${url}`, config).catch((error) => { throw error.response })
}


export const ResponseError = (snackbar, error) => {
    if (error && error.data && (error.data.message || error.data.code || error.statusText)) {
        // const reqUrl = error.request.responseURL.toString().replace(baseUrl, "").split("/")
        // const title = ("[" + reqUrl[0] + ' > ' + reqUrl[1] + "]: ").toUpperCase()
        const content = error.data.message ? error.data.message : error.data.code ?? error.statusText
        snackbar(content, { variant: 'error' })
    }
}
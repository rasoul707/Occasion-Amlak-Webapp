/* eslint-disable react-hooks/exhaustive-deps */
import { Card, IconButton, Box, Button } from "@mui/material"
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import * as React from 'react';
import MapMarker from "../assets/images/map_marker.png"
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import L from "leaflet"



const LocationChooser = ({ location, setLocation, disabled, fullMap }) => {
    return <Card sx={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <Map {...{ location, setLocation, disabled }} />
        <IconButton sx={{ position: "absolute", top: 10, right: 10, zIndex: 999, bgcolor: "#fff" }} onClick={fullMap} disabled={disabled}>
            <FullscreenIcon />
        </IconButton>
    </Card>
}

export default LocationChooser



const Map = ({ location, setLocation, disabled, locate = true }) => {

    return <>
        <MapContainer
            center={[location[0], location[1]]}
            zoom={location[2]}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ width: '100%', height: '100%', }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationEvent {...{ setLocation, disabled, location, locate }} />
        </MapContainer>
        <img
            src={MapMarker}
            alt="map_marker"
            style={{ position: "absolute", width: "20px", zIndex: 999 }}
        />
    </>
}



export const FullMap = (props) => {

    const [locate, setLocate] = React.useState(false)
    const [tempLocation, setTempLocation] = React.useState(props.location)


    return <div style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Map
            location={tempLocation}
            setLocation={setTempLocation}
            disabled={props.disabled}
            locate={locate}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', bottom: 0, position: 'absolute', zIndex: 999 }}>
            <Box sx={{ maxWidth: 400, width: '100%', m: 3 }}>
                <Button
                    variant="contained"
                    size="large"
                    color="inherit"
                    children="موقعیت فعلی من"
                    onClick={() => setLocate([true])}
                    fullWidth
                />
                <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 1.5 }}
                    children="تایید"
                    onClick={() => {
                        props.setLocation(tempLocation)
                        props.close()
                    }}
                    fullWidth
                />
                <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 1.5 }}
                    color="inherit"
                    children="برگشت"
                    onClick={() => props.close()}
                    fullWidth
                />
            </Box>
        </Box>
    </div>
}




function LocationEvent({ location, setLocation, disabled, locate }) {
    React.useEffect(() => {
        if (locate) {
            map.locate()
        }
    }, [locate])


    React.useEffect(() => {
        map._handlers.forEach(function (handler) {
            if (disabled) handler.disable();
            else handler.enable()
        })
    }, [disabled])


    React.useEffect(() => {
        if (location && location?.length === 3) {
            map.panTo(new L.LatLng(location[0], location[1]), location[2])
        }
    }, [location])

    const map = useMapEvents({
        locationfound(e) {
            // map.panTo(e.latlng, 15)
            setLocation([e.latlng?.lat, e.latlng?.lng, map.getZoom()])
        },
        moveend(e) {
            const c = map.getCenter()
            setLocation([c.lat, c.lng, map.getZoom()])
        }
    })
    return null
}





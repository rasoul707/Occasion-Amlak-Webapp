/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@mui/material"
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import * as React from 'react';
import MapMarker from "../assets/images/map_marker.png"


const LocationChooser = ({ location, setLocation, disabled }) => {


    return <Card sx={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <MapContainer

            center={[location[0], location[1]]}
            zoom={location[2]}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ width: '100%', height: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationEvent {...{ setLocation, disabled }} />

        </MapContainer>

        <img
            src={MapMarker}
            alt="map_marker"
            style={{ position: "absolute", width: "20px", zIndex: 999 }}
        />
    </Card>
}

export default LocationChooser



function LocationEvent({ setLocation, disabled }) {
    React.useEffect(() => {
        map.locate()
    }, [])

    React.useEffect(() => {
        map._handlers.forEach(function (handler) {
            if (disabled) handler.disable();
            else handler.enable()
        })
    }, [disabled])


    const map = useMapEvents({
        locationfound(e) {
            map.panTo(e.latlng, 15)
            setLocation([e.latlng?.lat, e.latlng?.lng, map.getZoom()])
        },
        moveend(e) {
            const c = map.getCenter()
            setLocation([c.lat, c.lng, map.getZoom()])
        }
    })
    return null
}





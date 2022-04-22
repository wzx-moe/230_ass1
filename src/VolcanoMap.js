import {Map, Marker, ZoomControl} from "pigeon-maps";
import {useState} from "react";

export default function VolcanoMap(props) {
    const latitude = parseFloat(props.latitude);
    const longitude = parseFloat(props.longitude);
    const position = [latitude, longitude];
    const [center, setCenter] = useState(position)
    return (
        <Map center={center}
             defaultZoom={5}
             onBoundsChanged={({center}) => {
                 setCenter(center)
             }}>
            <Marker anchor={position}/>
            <ZoomControl/>
        </Map>
    )
}
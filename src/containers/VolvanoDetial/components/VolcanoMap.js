import logo from "../../../components/logo.svg";
import {Map, Overlay, ZoomControl} from "pigeon-maps";
import {useState} from "react";

export default function VolcanoMap(props) {
    const latitude = parseFloat(props.latitude);
    const longitude = parseFloat(props.longitude);
    const position = [latitude, longitude];
    const [center, setCenter] = useState(position)
    return (
        <Map center={center}
             defaultZoom={6}
             onBoundsChanged={({center}) => {
                 setCenter(center)
             }}>
            {/*<Marker anchor={position}/>*/}
            <Overlay anchor={position} offset={[25, 42.5]}>
                <img src={logo} width={50} height={50} alt=''/>
            </Overlay>
            <ZoomControl/>
        </Map>
    )
}
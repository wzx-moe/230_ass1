import {Alert, Button, Col, Row, Spinner} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "./useFetch";
import VolcanoMap from "./VolcanoMap";
import VolcanoBar from "./VolcanoBar";

export default function VolcanoDetail() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const {id} = useParams();
    const {
        data: volcano,
        isPending,
        error,
        errorCode
    } = useFetch('GET', 'http://sefdb02.qut.edu.au:3001/volcano/' + id);

    return (<div className="volcanoDetail container" style={{height: '100%'}}>
            {(error || errorCode) &&
                <div className="justify-content-center p-5 text-center"><Alert color="warning">
                    <h3>{errorCode} {error}</h3><p></p>
                    <Button
                        color="warning" outline onClick={() => navigate(-1)}>Back</Button></Alert></div>}
            {isPending &&
                <div className="d-flex justify-content-center p-5 text-center"><Spinner>Loading...</Spinner></div>}
            {volcano && <div className="detail" style={{height: '100%'}}>
                <div className="justify-content-center p-4 px-5" style={{height: '100%'}}>
                    <h1 className="text-center">Volcano Detail</h1>
                    <Row className="pt-4" style={{height: '100%'}}>
                        <Col md={6} sm={12}>
                            <h2>{volcano.name}</h2>
                            <div className="pt-4">
                                <h5>Country: {volcano.country}</h5>
                                <h5>Region: {volcano.region}</h5>
                                <h5>Subregion: {volcano.subregion}</h5>
                                <h5>Last eruption: {volcano.last_eruption}</h5>
                                <h5>Summit: {volcano.summit}</h5>
                                <h5>Elevation: {volcano.elevation}</h5>
                                <h5>Latitude: {volcano.latitude}</h5>
                                <h5>Longitude: {volcano.longitude}</h5>
                            </div>
                            {!token &&
                                <div className="pt-4"><Button onClick={() => navigate("/login")}>Login to get more
                                    detail! </Button></div>}
                            {token &&
                                <div className="pt-4">
                                    <h5>Population 5km: {volcano.population_5km}</h5>
                                    <h5>Population 10km: {volcano.population_10km}</h5>
                                    <h5>Population 30km: {volcano.population_30km}</h5>
                                    <h5>Population 100km: {volcano.population_100km}</h5>
                                </div>
                            }

                        </Col>
                        <Col md={6} sm={12} style={{height: '100%'}}>
                            <VolcanoMap latitude={volcano.latitude} longitude={volcano.longitude}/>
                        </Col>
                        {token && <VolcanoBar volcano={volcano}/>}
                    </Row>
                </div>
            </div>}
        </div>
    )
}
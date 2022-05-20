import './VolcanoDetail.css';
import {Alert, Button, Card, CardBody, CardFooter, CardGroup, CardHeader, CardText, Spinner} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import VolcanoMap from "./components/VolcanoMap";
import VolcanoBar from "./components/VolcanoBar";

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

    return (<div className="volcanoDetail p-4 px-5">
            <h2 className="text-center">Volcano Detail</h2>
            {(error || errorCode) &&
                <div className="justify-content-center p-3 text-center"><Alert color="warning">
                    <h3>{errorCode} {error}</h3><p></p>
                    <Button
                        color="warning" outline onClick={() => navigate(-1)}>Back</Button></Alert></div>}
            {isPending &&
                <div className="d-flex justify-content-center p-3 text-center"><Spinner>Loading...</Spinner></div>}
            {volcano &&
                <div className="detail justify-content-center">
                    <CardGroup className="pt-3">
                        <Card>
                            <CardHeader tag="h4">
                                {volcano.name}
                            </CardHeader>
                            <CardBody>
                                <CardText tag="h6">
                                    <p>Country: {volcano.country}</p>
                                    <p>Region: {volcano.region}</p>
                                    <p>Subregion: {volcano.subregion}</p>
                                    <p>Last eruption: {volcano.last_eruption}</p>
                                    <p>Summit: {volcano.summit}</p>
                                    <p>Elevation: {volcano.elevation}</p>
                                    <p>Latitude: {volcano.latitude}</p>
                                    <p>Longitude: {volcano.longitude}</p>
                                </CardText>
                                {token &&
                                    <CardText tag="h6">
                                        <p>Population 5km: {volcano.population_5km}</p>
                                        <p>Population 10km: {volcano.population_10km}</p>
                                        <p>Population 30km: {volcano.population_30km}</p>
                                        <p>Population 100km: {volcano.population_100km}</p>
                                    </CardText>
                                }
                                {token &&
                                    <VolcanoBar volcano={volcano}/>}
                            </CardBody>
                            {!token && <CardFooter> <Button onClick={() => navigate("/login")}>Login
                                to get more
                                detail! </Button> </CardFooter>}
                        </Card>
                        <Card>
                            <CardBody>
                                <VolcanoMap latitude={volcano.latitude} longitude={volcano.longitude}/>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </div>}
        </div>
    )
}
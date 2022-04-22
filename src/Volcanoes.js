import useFetch from "./useFetch";
import VolcanoesSearch from "./VolcanoesSearch";
import {Alert, Button, Spinner} from "reactstrap";
import {useNavigate} from "react-router-dom";

export default function Volcanoes() {
    const navigate = useNavigate();
    const {data: countries, isPending, error, errorCode} = useFetch('GET', 'http://sefdb02.qut.edu.au:3001/countries')

    return (
        <div className="volcanoSearch" style={{width: '100%', height: '100%'}}>
            {(error || errorCode) &&
                <div className="justify-content-center p-5 text-center"><Alert color="warning">
                    <h3>{errorCode} {error}</h3><p></p>
                    <Button
                        color="warning" outline onClick={() => navigate(-1)}>Back</Button></Alert></div>}
            {isPending &&
                <div className="d-flex justify-content-center p-5 text-center"><Spinner>Loading...</Spinner></div>}
            {countries && <VolcanoesSearch countries={countries}/>}
        </div>
    );
}
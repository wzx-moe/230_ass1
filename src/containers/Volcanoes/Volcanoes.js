import './Volcanoes.css';
import useFetch from "../../hooks/useFetch";
import VolcanoesSearch from "./components/VolcanoesSearch";
import {Alert, Button, Spinner} from "reactstrap";
import {useNavigate} from "react-router-dom";

export default function Volcanoes() {
    const navigate = useNavigate();
    const {data: countries, isPending, error, errorCode} = useFetch('GET', 'http://sefdb02.qut.edu.au:3001/countries')

    return (
        <div className="volcanoes justify-content-center p-4 px-5" style={{width: '100%', height: 'auto'}}>
            <h2 className="text-center">Volcano Search</h2>
            {(error || errorCode) &&
                <div className="error justify-content-center p-3 text-center"><Alert color="warning">
                    <h3>{errorCode} {error}</h3><p></p>
                    <Button
                        color="warning" outline onClick={() => navigate(-1)}>Back</Button></Alert></div>}
            {isPending &&
                <div className="pending d-flex justify-content-center p-3 text-center"><Spinner>Loading...</Spinner>
                </div>}
            {countries && <VolcanoesSearch countries={countries}/>}
        </div>
    );
}
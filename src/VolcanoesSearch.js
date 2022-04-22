import {Alert, Button, Col, FormGroup, Row, Spinner} from "reactstrap";
import {useState} from "react";
import Select from 'react-select';
import useFetch from "./useFetch";
import VolcanoesList from "./VolcanoesList";


export default function VolcanoesSearch(props) {
    const countries = props.countries;
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedPopulatedWithin, setSelectedPopulatedWithin] = useState("");
    const [url, setUrl] = useState(null);

    const {data: countryLists, isPending, error, errorCode} = useFetch('GET', url)

    const countryOptions = countries && countries.map((country) => {
            const rObj = {};
            rObj["value"] = country;
            rObj["label"] = country;
            return rObj;
        })

    const populatedWithinOptions = [
        { value: '', label: 'None' },
        { value: '5km', label: '5km' },
        { value: '10km', label: '10km' },
        { value: '30km', label: '30km' },
        { value: '100km', label: '100km' }
    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl('http://sefdb02.qut.edu.au:3001/volcanoes?country=' + selectedCountry + '&populatedWithin=' + selectedPopulatedWithin);
    }

    return (
        <div className="justify-content-center p-4 px-5" style={{width: '100%', height: '100%'}}>
            <h1 className="text-center">Volcanoes Search</h1>
            <Row className="pt-4" style={{width: '100%'}}>
                <Col md={{size: 'auto'}}>
                    <FormGroup>
                        <h3> Country:</h3>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Select
                            className="basic-single"
                            placeholder="Please choose Country"
                            isSearchable={true}
                            name="Country"
                            options={countryOptions}
                            onChange={(e) => {
                                setSelectedCountry(e.value)
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col md={{size: 'auto'}}>
                    <FormGroup>
                        <h3> Populated Within:</h3>
                    </FormGroup>
                </Col>
                <Col md={{size: 'auto'}}>
                    <FormGroup>
                        <Select
                            className="basic-single"
                            name="Country"
                            options={populatedWithinOptions}
                            placeholder="Please choose distance"
                            onChange={(e) => {
                                setSelectedPopulatedWithin(e.value)
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col md={{size: 'auto'}} className="text-center">
                    <FormGroup>
                        <Button onClick={handleSubmit}>
                            Search
                        </Button>
                    </FormGroup>
                </Col>
            </Row>
            <div className="volcanoSearch" style={{width: '100%', height: '100%'}}>
                {(error || errorCode) && <div className="justify-content-center p-2 text-center"><Alert
                    color="warning">{errorCode} {error}</Alert>
                </div>}
                {isPending &&
                    <div className="d-flex justify-content-center p-2 text-center"><Spinner>Loading...</Spinner></div>}
                {countryLists && <VolcanoesList countryLists={countryLists}/>}
            </div>
        </div>
    )
}


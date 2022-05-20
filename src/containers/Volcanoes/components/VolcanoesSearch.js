import {Alert, Button, Col, Form, FormGroup, Label, Spinner} from "reactstrap";
import {useState} from "react";
import Select from 'react-select';
import useFetch from "../../../hooks/useFetch";
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
        {value: '', label: 'None'},
        {value: '5km', label: '5km'},
        {value: '10km', label: '10km'},
        {value: '30km', label: '30km'},
        {value: '100km', label: '100km'}
    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl('http://sefdb02.qut.edu.au:3001/volcanoes?country=' + selectedCountry + '&populatedWithin=' + selectedPopulatedWithin);
    }

    return (
        <div className="volcanoSearch justify-content-center pt-3">
            <Form>
                <FormGroup row>
                    <Label
                        for="country"
                        md={{size: 'auto'}}
                    >
                        Country:
                    </Label>
                    <Col md={4}>
                        <Select
                            id="country"
                            className="basic-single"
                            placeholder="Please choose a Country"
                            isSearchable={true}
                            name="Country"
                            options={countryOptions}
                            onChange={(e) => {
                                setSelectedCountry(e.value)
                            }}
                        />
                    </Col>
                    <Label
                        for="populatedWithin"
                        md={{size: 'auto'}}
                    >
                        Populated Within:
                    </Label>
                    <Col md={3}>
                        <Select
                            id="populatedWithin"
                            className="basic-single"
                            name="Country"
                            options={populatedWithinOptions}
                            placeholder="Please choose a distance"
                            onChange={(e) => {
                                setSelectedPopulatedWithin(e.value)
                            }}
                        />
                    </Col>
                    <Col md={{size: 'auto'}} className="text-center">
                        <Button type="submit" onClick={handleSubmit}>
                            Search
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
            <div className="volcanoList">
                {(error || errorCode) && <div className="error justify-content-center p-3 text-center"><Alert
                    color="warning"><h6>{errorCode} {error}</h6></Alert>
                </div>}
                {isPending &&
                    <div className="pending d-flex justify-content-center p-3 text-center"><Spinner>Loading...</Spinner>
                    </div>}
                {countryLists && <VolcanoesList countryLists={countryLists}/>}
            </div>
        </div>
    )
}


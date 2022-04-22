import {Alert, Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row, Spinner} from "reactstrap";
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import useFetch from "./useFetch";

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailValid, setEmailValid] = useState("")
    const [passwordValid, setPasswordValid] = useState("")
    const [buttonValid, setButtonValid] = useState("")
    const [url, setUrl] = useState(null);
    const {data, isPending, error, errorCode} = useFetch('POST', url, user)
    const [success, setSuccess] = useState(false)


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e.target.value))) {
            setEmailValid("is-invalid")
            setButtonValid("disabled")
        } else {
            setEmailValid("is-valid")
            setButtonValid("")
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (!e.target.value){
            setPasswordValid("is-invalid")
            setButtonValid("disabled")
        } else {
            setPasswordValid("")
            setButtonValid("")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false)
        setUrl('http://sefdb02.qut.edu.au:3001/user/login')
        setUser({email, password});
    }

    useEffect(() => {
        if (data && data.token) {
            localStorage.setItem('token', data.token)
            setSuccess(true)
        }
    }, [data])

    return (
        <div className="Login container p-5">
            {!success && localStorage.getItem('token') && navigate(-1)}
            <h1 className="text-center">Login</h1>
            <Form>
                <Row className="pt-4">
                    <Col md={{offset: 3, size: 6}}>
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Please enter your Email"
                                type="email"
                                required
                                className={emailValid}
                                onChange={(e) => handleEmailChange(e)}
                            />
                            <FormFeedback invalid="true">
                                Email Invalid
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={{offset: 3, size: 6}}>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Please enter your Password"
                                type="password"
                                required
                                className={passwordValid}
                                onChange={(e) => handlePasswordChange(e)}
                            />
                            <FormFeedback invalid="true">
                                Please enter your password
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        {!success && <Button className={buttonValid} onClick={e => handleSubmit(e)}>
                            Submit
                        </Button>}
                        {success && <Button outline onClick={() => navigate(-1)}>Back</Button>}
                    </Col>
                </Row>
            </Form>
            {(error || errorCode) &&
                <div className="justify-content-center p-5 text-center"><Alert color="warning">
                    <h3>{errorCode} {error}</h3><p></p>
                </Alert></div>}
            {isPending &&
                <div className="d-flex justify-content-center p-5 text-center"><Spinner>Loading...</Spinner></div>}
            {data && <h5 className="text-center">{data.message}</h5>}
            {success && <h5 className="text-center p-4">Welcome back! {jwt_decode(data.token).email}</h5>}
        </div>
    )
}
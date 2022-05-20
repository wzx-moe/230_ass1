import jwt_decode from "jwt-decode";
import {Link, useNavigate} from "react-router-dom";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem} from "reactstrap";
import {useState} from "react";

export default function VolcanoNav() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="VolcanoNav">
            <Navbar
                color="light"
                expand="md"
                light
            >
                <NavbarBrand onClick={() => navigate("/")}>
                    Volcano
                </NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <Link className="nav-link" to="/">Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="volcanoes">Volcano Search</Link>
                        </NavItem>
                    </Nav>
                    {!token && <NavbarText>
                        <Link className="nav-link" to="register">Register</Link>
                    </NavbarText>}
                    {!token && <NavbarText>
                        <Link className="nav-link" to="login">Login</Link>
                    </NavbarText>}
                    {token && <NavbarText>
                        {jwt_decode(token).email}
                    </NavbarText>}
                    {token && <NavbarText>
                        <Link className="nav-link" to="logout">Logout</Link>
                    </NavbarText>}
                </Collapse>
            </Navbar>
        </div>
    );
}
import logo from "../../components/logo.svg";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                Use <code>Volcano Search</code> to get information.
            </p>
            <Link to="volcanoes">
                Volcano Search
            </Link>
        </header>
    );
}
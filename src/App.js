import {Routes, Route, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./Home";
import Volcanoes from "./Volcanoes";
import VolcanoNav from "./VolcanoNav";
import VolcanoDetail from "./VolcanoDetail";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";

function App() {
    const navigate = useNavigate();
    return (
        <div className="App">
            <VolcanoNav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="volcanoes" element={<Volcanoes/>}/>
                <Route path="volcano/:id" element={<VolcanoDetail/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="logout" element={<Logout/>}/>
                <Route
                    path="*"
                    element={
                        <main className="text-center pt-4" style={{padding: "1rem"}}>
                            <h3 className="pb-2">There's nothing here!</h3>
                            <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
                        </main>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;

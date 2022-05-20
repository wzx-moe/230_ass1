import {Route, Routes, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./containers/Home/Home";
import Volcanoes from "./containers/Volcanoes/Volcanoes";
import VolcanoNav from "./components/Navbar/VolcanoNav";
import VolcanoDetail from "./containers/VolvanoDetial/VolcanoDetail";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Logout from "./containers/Logout/Logout";

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

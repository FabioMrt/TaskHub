import { Routes,Route } from "react-router-dom";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Admin from "../Pages/Admin";
import Private from "./Private";

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={ <Home/> }></Route>
            <Route path="/cadastro" element= { <Register/> }></Route>

            <Route path="/admin" element= { <Private> <Admin/> </Private> }></Route>
        </Routes>
    )
}

export default RoutesApp;
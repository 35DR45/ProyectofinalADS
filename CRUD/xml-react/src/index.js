import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.css"
import Info from "./components/info";
import Dibujo from "./components/dibujo"
import Login from "./components/login"



const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/2021630285IDPF/">
                    <Login />
                </Route>
                <Route exact path="/2021630285IDPF/Home">
                    <Home />
                </Route>
                <Route exact path="/2021630285IDPF/info">
                    <Info />
                </Route>
                <Route exact path="/2021630285IDPF/formulario">
                    <Dibujo />
                </Route>
                <Route path="*" render={() => <h1>Recurso no encontrado</h1>} />
            </Switch>
        </div>
    );
}
export default App;
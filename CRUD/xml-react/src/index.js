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



const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/Crud/">
                    <Home />
                </Route>
                <Route exact path="/Crud/info">
                    <Info />
                </Route>
                <Route exact path="/Crud/formulario">
                    <Dibujo />
                </Route>
                <Route path="*" render={() => <h1>Recurso no encontrado</h1>} />
            </Switch>
        </div>
    );
}
export default App;
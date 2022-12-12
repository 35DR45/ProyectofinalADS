import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import $ from "jquery"
import { browserHistory } from "react-router";
import ReactDOM from "react-dom"
import Home from "./home"

class Login extends React.Component {

  state = {
    val: false,
  }

  cambiar = () => {
    this.setState((state) => ({
      val: true,
      comp: <Home></Home>
    }))
  }
  validar = (usuario, password) => {
    var datos = {
      User: usuario,
      password: password
    }

    $.get("http://localhost:8080/Proyecto/Login", datos, (resultado) => {
      if (resultado[0].usuario != "error") {
        this.state.val = true;
        this.forceUpdate();
      } else {
        alert("USUARIO NO REGISTRADO")
      }

    })

  }
  render() {
    const styles = {
      padding: '5px'
    }
    const qId = (new URLSearchParams(window.location.search).get("val") == "true") ? true : false;
    const undiv = <div className="center-container" style={styles} id="equis">
      <h1 className="AlignCenter" > LOGIN </h1>
      <div class="form-group">
        <label class="form-label" for="User">Usuario</label>
        <input placeholder="Ingrese el usuario" type="text" id="User" class="form-control" />
      </div>
      <div class="form-group"><label class="form-label" for="password">Password</label>
        <input placeholder="Ingrese su contraseña" type="password" id="password" class="form-control" />

      </div>
      <button className="btn btn-primary" onClick={() => this.validar(document.getElementById("User").value, document.getElementById("password").value)}>
        Sumit
      </button>
    </div>
    const esValido = (this.state.val) || qId ? <Home></Home> : undiv
    return (
      <div>
        {esValido}
        {console.log(esValido)}
      </div>
    )
  }
}
export default Login; 
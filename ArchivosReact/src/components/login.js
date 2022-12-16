import React from "react";
import $ from "jquery"
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
    const undiv = <div class="container w-100" style={styles} id="equis">
      <main class="form-signin w-50 m-auto">
          <h1 class="p-5 AlignCenter">ADS Sketch RNN</h1>
          <div class="pb-3 form-floating">            
            <label for="User">Usuario:</label>
            <input placeholder="Ingrese el usuario" type="text" id="User" class="form-control" />
          </div>
          <div class="pb-3 form-floating">
            <label for="password">Password:</label>
            <input placeholder="Ingrese su contraseña" type="password" id="password" class="form-control" />            
          </div>
          <button class="AlignCenter w-75 btn btn-lg btn-primary" onClick={() => this.validar(document.getElementById("User").value, document.getElementById("password").value)}>
            Ingresar
          </button>
      </main>
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
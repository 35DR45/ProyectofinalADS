import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import $ from "jquery"
import { browserHistory } from "react-router";
import ReactDOM from "react-dom"
import Home from "./home"

class Login extends React.Component {
    
  state={
    val: false,
  }

    cambiar = () =>{
        this.setState((state)=>({
          val:true,
          comp: <Home></Home>
        }))
    }
      validar=(usuario,password) =>{
        var datos={
            User: usuario,
            password: password
        }

        $.get("http://localhost:8080/Proyecto/Login",datos, (resultado)=>{
          if(resultado[0].usuario !="error"){
            this.state.val = true;
            this.forceUpdate();
          }else{
            alert("USUARIO NO REGISTRADO")
          }
          
        })
     
    }
    render() {
      const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;
      const undiv=  <div className = "contenedor1">
              <div className="right">
              <div className="loginContainer">
              <h1 className="AlignCenter" style={{ color: "white" }}>Sketch RNN </h1>
              <hr  style={{ borderColor : "white" }}/>
              <Form>
                      <Form.Group className="mb-3">
                      <Form.Label style={{ color: "rgb(179, 179, 179)" }}>Usuario</Form.Label>
                      <Form.Control type="text" placeholder="Ingrese el usuario" id="User"/>
                      </Form.Group>
                      <Form.Group className="mb-3">
                      <Form.Label style={{ color: "rgb(179, 179, 179)" }}>Contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Ingrese su contraseña" id="password"/>
                      <Form.Text className="text-muted">Nunca compartas tu contraseña con nadie.</Form.Text>
                      </Form.Group>
                      <center>
                      <Button variant="outline-primary" size="lg" className="button" onClick={() => this.validar(document.getElementById("User").value,document.getElementById("password").value)} >Submit</Button>
                      </center>
                    </Form>
                    </div>
              </div>
            </div>
       const esValido = (this.state.val) || qId?<Home></Home>: undiv
        return(
          <div>
            {esValido}
            {console.log(esValido)}
          </div>
        )    
  }
}
export default Login; 
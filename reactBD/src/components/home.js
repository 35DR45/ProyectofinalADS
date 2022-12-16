import React from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends React.Component {

    componentDidMount() 
    {

    }

    render() {
        return (
            <Container className="MarginContainer" >
                <h1 className="AlignCenter" > CREAR, ALTAS, BAJAS Y CAMBIOS </h1>
                <hr style={{ width: "80%" }} />
                
                <Button variant="info" style={{ margin: "12px" }}>
                    <Link to="/Proyecto/registro" className="CustomLink">NUEVA PREGUNTA</Link>
                </Button>
                <Table striped bordered >
                    <thead>
                        <tr>
                            <th>Pregunta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
    
                    </tbody>
                </Table>
            </Container>
        )
    }

}

export default Home;
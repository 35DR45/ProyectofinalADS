import React from "react";
import { Button, Container, Table, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Pregunta from "./pregunta";

class Home extends React.Component {

    state = {
        data: [],
        showAlert: false,
        alertText: ""
    }

    componentDidMount() {
        axios.get("http://localhost:8080/Crud/Preguntas").then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.info(error);
            this.setState({ showAlert: true, alertText: "ERROR EN LA OBTENCION DE DATOS" });
        })
    }

    render() {
        const { data, showAlert, alertText } = this.state;
        console.log(data);
        return (
            <Container className="MarginContainer" fluid>
                <br></br>
                <Card
                    bg='dark'
                    key='Dark'
                    text='white'
                >
                    <Card.Header className="AlignCenter"><h1> Sketch-RNN  </h1></Card.Header>
                    <Card.Body>
                        <hr style={{ width: "80%" }} />
                        {showAlert ?
                            <Alert variant="danger">
                                {alertText}
                            </Alert>
                            : null}
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Modelo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(pregunta => {
                                    return <Pregunta {...pregunta} />;
                                })}
                            </tbody>
                        </Table>
                        <div>

                            <Link to="/Crud/formulario" className="CustomLink">
                                <Button variant="outline-success" style={{ margin: "12px" }}>
                                    Añadir nueva pregunta
                                </Button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/Crud/prueba" className="CustomLink">
                                <Button variant="outline-info" style={{ margin: "12px" }}>
                                    Canvas
                                </Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
                <br /><br />
            </Container>
        )
    }

}

export default Home;
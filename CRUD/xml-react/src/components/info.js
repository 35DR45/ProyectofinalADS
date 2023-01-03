import React from "react";
import { Button, Container, Card, Form, Col, Row } from "react-bootstrap";
import axios from "axios";

class Info extends React.Component {


    state = {
        id: "",
        pregunta: "",
        respuesta: "",
        drags: [],
        targets: []
    }
    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        if (qId) {
            axios.get("http://localhost:8080/Crud/Preguntas?id="+qId).then(response => {
                console.log(response.data.length);
                var index;
                for(var i=0;i<response.data.length;i++){
                    const aux = response.data[i].id;
                    if(aux == qId) index = i;
                }
                console.log(index);
                const question = response.data[index];
                this.setState({ ...question });
            }).catch(error => {
                console.info(error);
                alert("Ha ocurrido un error");
            });
        }
    }
    
    render() {
        const {id, pregunta, respuesta, drags, targets } = this.state;
        const url = "http://localhost:8080/Crud/Imagenes/BD"+new URLSearchParams(window.location.search).get("id")+".PNG";
        return (
            <Container className="MarginContainer" fluid>
                <br></br>
                <Card
                    bg='dark'
                    key='Dark'
                    text='white'
                >
                <Card.Header className="AlignCenter"><h1> Información de la pregunta  </h1></Card.Header>
                <Card.Body>
                <Form>
                <Row>
                        <Col sm={1}>
                        <Form.Label>
                            Pregunta
                        </Form.Label>
                        </Col>
                        <Col sm={5}>
                            <Form.Control type="text" value={pregunta} disabled/>
                        </Col>
                        
                        <Col sm={1}>
                        <Form.Label>
                            Respuesta
                        </Form.Label>
                        </Col>
                        <Col sm={5}>
                            <Form.Control type="text" value={respuesta} disabled/>
                        </Col>
                    </Row>
                </Form>
                <span className="M-6">
                        <img src={url} className="ImageContainer" />
                        <p>HOLA</p>
                </span>
                <img src={url}/>
                <span className="M-6">
                </span>
                <Button variant="outline-primary" onClick={() => window.location.href = "/Crud/"}>
                    Regresar
                </Button>
                </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default Info;
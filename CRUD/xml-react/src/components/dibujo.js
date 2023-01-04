import React from "react";
import Test from "./test";
import { Button, Container, Card, Form} from "react-bootstrap";
const availableModels = ['bird', 'ant','ambulance','angel','alarm_clock',
'antyoga','backpack','barn','basket','bear','bee','beeflower','bicycle',
'book','brain','bridge','bulldozer','bus','butterfly','cactus','calendar',
'castle','cat','catbus','catpig','chair','couch','crab','crabchair',
'crabrabbitfacepig','cruise_ship','diving_board','dog','dogbunny',
'dolphin','duck','elephant','elephantpig','everything','eye','face',
'fan','fire_hydrant','firetruck','flamingo','flower','floweryoga',
'frog','frogsofa','garden','hand','hedgeberry','hedgehog',
'helicopter','kangaroo','key','lantern','lighthouse','lion',
'lionsheep','lobster','map','mermaid','monapassport','monkey',
'mosquito','octopus','owl','paintbrush','palm_tree','parrot',
'passport','peas','penguin','pig','pigsheep','pineapple','pool',
'postcard','power_outlet','rabbit','rabbitturtle','radio',
'radioface','rain','rhinoceros','rifle','roller_coaster',
'sandwich','scorpion','sea_turtle','sheep','skull','snail',
'snowflake','speedboat','spider','squirrel','steak','stove',
'strawberry','swan','swing_set','the_mona_lisa','tiger','toothbrush',
'toothpaste','tractor','trombone','truck','whale','windmill','yoga',
'yogabicycle'];

const handleClickPrueba = (event) => {
    //Eliminar
  const temp = document.getElementById("defaultCanvas0");
  const urldata = temp.toDataURL();
  console.log(urldata);
}

class Canvas extends React.Component{
    render() {
        return (
            <Container className="MarginContainer" fluid>
                <br></br>
                <Card
                    bg='dark'
                    key='Dark'
                    text='white'
                    className="Card1Container"
                >
                <Card.Header className="AlignCenter"><h1> Zona de dibujo </h1></Card.Header>
                <Card.Body>
                <br></br>
                <Form>
                    <Form.Group>
                        <Form.Label className="M-6">
                            Selecciona un modelo:
                        </Form.Label>
                        <Form.Label>
                        <Form.Control as="select" id="selectModels">
                                {availableModels.map((a) => {
                                    return <option> {a} </option>
                                })}
                            </Form.Control>
                        </Form.Label>
                    </Form.Group>
                </Form>
                <div className="AlignCenter1" id="sketch">
                <Test/>
                </div>
                <Button id="btnRetry" variant="outline-primary" className="M-6">
                    Reintentar
                </Button>
                <Button id="btnClear" variant="outline-warning" className="M-6">
                    Limpiar
                </Button>
                <Button variant="outline-danger" className="M-6" onClick={() => window.location.href = "/Crud/"}>
                    Regresar
                </Button>
                <Button variant="outline-success" className="M-6" id="btnSave" onClick={handleClickPrueba}>
                    Crear
                </Button>
                </Card.Body>
                </Card>
            </Container>
            )
        }
    }

export default Canvas;
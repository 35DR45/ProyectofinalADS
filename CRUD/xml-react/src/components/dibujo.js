import React, {useRef} from "react";
import { Button, Container, Card, Form} from "react-bootstrap";
import CanvasDraw from "react-canvas-draw";
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
                        <Form.Control as="select">
                                {availableModels.map((a) => {
                                    return <option> {a} </option>
                                })}
                            </Form.Control>
                        </Form.Label>
                    </Form.Group>
                </Form>
                <div className="AlignCenter">
                <CanvasDraw
                brushRadius={1}
                lazyRadius={0}
                hideGrid={true}
                className="DrawContainer"
                ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                />
                </div>
                <br></br>
                <Button
                onClick={() => {
                    console.log(this.saveableCanvas.getDataURL());
                    }}
                >
                    HOLAAAAAA
                </Button>
                <Button variant="outline-primary" onClick={() => window.location.href = "/Crud/"} className="M-6">
                    Regresar
                    </Button>
                    <Button variant="outline-success" onClick={() => {
                localStorage.setItem( "savedDrawing", this.saveableCanvas.getSaveData() ); }}>
                    Crear
                    </Button>
                </Card.Body>
                </Card>
            </Container>
            )
        }
    }

export default Canvas;
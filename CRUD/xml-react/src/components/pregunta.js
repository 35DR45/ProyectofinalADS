import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Pregunta = ({ id, pregunta }) => {

    const handleClickEliminar = (event) => {
        //Eliminar
        axios.get(`http://localhost:8080/Crud/Eliminar?id=${id}`).then(
            response => {
            console.info(response.data);
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                console.log(response.data.error);
            }
        }).catch(error => {
            console.info(error);
            alert(response.data.message);
        }).finally(() => {
            window.location.href = "/Crud/";
        });
    }

    return (
        <tr>
            <td>                
                <div>
                    <Link to={`/Crud/info?id=${id}`} className="CustomLink" >
                    <Button
                    variant="outline-info"
                    className="M-6"
                    >
                        {id}
                        </Button>
                    </Link>
                </div>
            </td>
            <td>{pregunta}</td>
            <td className="AlignCenter">
                <div>
                    <Link to={`/Crud/formulario?id=${id}`} className="CustomLink" >
                    <Button
                    variant="outline-warning"
                    className="M-6">
                        Editar pregunta
                        </Button>
                    </Link>
                </div>
                <div>
                <Button
                    variant="outline-danger"
                    className="M-6"
                    onClick={handleClickEliminar}>
                    Eliminar pregunta
                </Button>
                </div>
            </td>
        </tr>
    )
}
export default Pregunta;
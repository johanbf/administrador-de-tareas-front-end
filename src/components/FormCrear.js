import { Button, Container, FormControl, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import environment from "../config/environment";

const FormCrear = () =>{ 

    const [ FormTarea , setFormTarea ] = useState({
        nombre: '',
        descripcion: '',
        fecha_realizar: ''
    })

    let history = useHistory();

    const inputChange = e => {
        const { name, value } = e.target;
        setFormTarea((prevState) =>({
            ...prevState,
            [name]: value,
        }))
        console.log(FormTarea);
    }

    const crearTarea = async() => {
        
        let f = new FormData();
        f.append('nombre',FormTarea.nombre);
        f.append('descripcion',FormTarea.descripcion);
        f.append('fecha_realizar',FormTarea.fecha_realizar);
        f.append('METHOD',"POST");
        await axios.post(`${environment.urlServe}tarea`,f).then(response => {
            console.log(response);
            history.push("/");
        })
    }

    return (
        <div>
            <Container maxWidth="sm">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" label="Nombre" variant="outlined" name="nombre" onChange={inputChange}/>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" label="Descripcion" variant="outlined" name="descripcion" onChange={inputChange}/>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" type="datetime-local" label="Fecha a realizar" name="fecha_realizar" variant="outlined" 
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={inputChange}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Button variant="contained"  color="success" onClick={() => crearTarea()}>Crear Tarea</Button>
                </FormControl>
            </Container>
        </div>
    )
}

export default FormCrear
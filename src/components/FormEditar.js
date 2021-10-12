import { Button, Container, FormControl, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import environment from "../config/environment";

const FormEditar = () =>{ 

    const {id} = useParams()

    const [ FormTarea , setFormTarea ] = useState({
        nombre: '',
        descripcion: '',
        fecha_realizar: ''
    })

    const getTareaID = async (id) => {
        await axios.get(`${environment.urlServe}tarea/${id}`).then(response => {
            console.log(response.data)
            setFormTarea(response.data)
        })
    }

    useEffect(() => {
        getTareaID(id);
    },[])

    let history = useHistory();

    const inputChange = e => {
        const { name, value } = e.target;
        setFormTarea((prevState) =>({
            ...prevState,
            [name]: value,
        }))
        console.log(FormTarea);
    }

    const actualizarTarea = async() => {
        
        let f = new FormData();
        f.append('nombre',FormTarea.nombre);
        f.append('descripcion',FormTarea.descripcion);
        f.append('fecha_realizar',FormTarea.fecha_realizar);
        await axios.put(`${environment.urlServe}tarea/${id}`,{
            nombre : FormTarea.nombre,
            descripcion: FormTarea.descripcion,
            fecha_realizar: FormTarea.fecha_realizar
        }).then(response => {
            console.log(response);
            history.push("/");
        })
    }

    const formatoFecha = (texto) => {
        let fecha = texto.split(":");
        FormTarea.fecha_realizar = fecha[0]+":"+fecha[1]
        return fecha[0]+":"+fecha[1];
    }
    console.log(FormTarea.nombre)
    return (
        
        <div>
            <Container maxWidth="sm">
                { FormTarea.nombre ? 
                    <div>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField id="outlined-basic" label="Nombre" variant="outlined" name="nombre" value={FormTarea.nombre} onChange={inputChange}/>
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField id="outlined-basic" label="Descripcion" variant="outlined" name="descripcion" value={FormTarea.descripcion} onChange={inputChange}/>
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField id="outlined-basic" type="datetime-local" label="Fecha a realizar" name="fecha_realizar" value={formatoFecha(FormTarea.fecha_realizar)} variant="outlined" 
                            onChange={inputChange}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <Button variant="contained"  color="success" onClick={() => actualizarTarea()}>Crear Tarea</Button>
                        </FormControl>
                    </div>
                : <div>
                    <p >No se ha encontrado la tarea consultada</p>
                </div>
                }
            </Container>
        </div>
    )
}

export default FormEditar
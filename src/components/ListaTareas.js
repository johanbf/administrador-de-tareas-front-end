import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import environment from "../config/environment";
import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import FormEditar from "./FormEditar";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const ListaTareas = () => {

    const [ tareas , setTareas ] = useState([]);
    const [ tareasBusqueda , setTareasBusqueda ] = useState([]);
   
    const getTareas = async () => {
        await axios.get(`${environment.urlServe}tarea`).then(response => {
            setTareas(response.data)
            setTareasBusqueda(response.data)
        })
    }

    useEffect(() => {
        getTareas();
    },[])

    const eliminarTarea = async(id) => {
        await axios.delete(`${environment.urlServe}tarea/${id}`).then(response => {
            getTareas()
        })
    }

    const finalizarTarea = async(id) => {
        await axios.get(`${environment.urlServe}tarea/finalizar-tarea/${id}`).then(response => {
            getTareas()
        })
    }

    const filtrar = (e) => {
        const { name, value } = e.target;
        console.log(value);
        if(value != ''){
            const newData = tareasBusqueda.filter((item) => {
                const itemData = item.nombre.toUpperCase();
                const textData = value.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            console.log('hola')
            setTareasBusqueda(newData)
        }else{
            setTareasBusqueda(tareas)
        }
       
    }

    const filtrarEstado = (e) => {
        const { name, value } = e.target;
        console.log(value);
        const newData = tareas.filter((item) => {
            if(value == 2){
                return item;
            }else{
                return item.completado == value;
            }
        });
        console.log('hola')
        setTareasBusqueda(newData)
       
    }


    return(
        <React.Fragment>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField id="outlined-basic" label="Buscar" variant="outlined" name="nombre" fullWidth onChange={filtrar}/>
                </Grid>
                <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange={filtrarEstado}
                    >
                         <MenuItem value={2}>Todo</MenuItem>
                        <MenuItem value={1}>Completado</MenuItem>
                        <MenuItem value={0}>Pendiente</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
            </Grid>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>N°</TableCell>
                        <TableCell align="left">Nombre</TableCell>
                        <TableCell align="left">Descripcion</TableCell>
                        <TableCell align="left">Fecha a realizar</TableCell>
                        <TableCell align="left">Estado</TableCell>
                        <TableCell align="left">Opciones</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tareasBusqueda.map((row , index) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="left">{row.nombre}</TableCell>
                            <TableCell align="left">{row.descripcion}</TableCell>
                            <TableCell align="left">{row.fecha_realizar}</TableCell>
                            <TableCell align="left">{(row.completado == 1) ? <Chip label="Completado" color="success" /> :  <Chip label="Pendiente" color="primary" />}</TableCell>
                            <TableCell align="right">
                            <Box sx={{ '& button': { m: 1 } }}>
                                <Link to={`editar-tarea/${row.id}`} className="link-a">
                                    <Button variant="contained"  color="success">
                                        Editar 
                                    </Button>
                                </Link>
                                <Button variant="contained"  color="error" onClick={ () => eliminarTarea(row.id) }>
                                    Eliminar 
                                </Button>  
                                <Button variant="contained"  color="info"  onClick={ () => finalizarTarea(row.id) }>
                                    Finalizar Tarea 
                                </Button>  
                            </Box>            
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default ListaTareas
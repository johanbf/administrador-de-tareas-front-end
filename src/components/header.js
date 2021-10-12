import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Administrador de tareas
                    </Typography>
                    <Link to="/crear-tarea" className="link-a"><Button color="inherit">Crear Tarea</Button></Link>
                    <Link to="/" className="link-a"><Button color="inherit">Listar Tarea</Button></Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
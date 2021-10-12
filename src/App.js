import React from "react";
import Container from '@mui/material/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./components/header";
import ListaTareas from "./components/ListaTareas";
import FormCrear from "./components/FormCrear";
import FormEditar from "./components/FormEditar";

const App = () => {
  return (
    <Router>
      <div>
        <Header/>
        <Container maxWidth="2xl">
          <Switch>
            <Route path="/crear-tarea">
              <div className="mt-5">
                <FormCrear></FormCrear>
              </div>
            </Route>
            <Route path="/editar-tarea/:id">
              <div className="mt-5">
                <FormEditar></FormEditar>
              </div>
            </Route>
            <Route path="/">
              <div className="mt-5">
                <ListaTareas></ListaTareas>
              </div>
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  )
}

export default App;

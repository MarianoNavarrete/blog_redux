import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './menu';
import Usuarios from './usuarios/index';
//import Pokemon from './pruebaReducer';
import Publicaciones from './publicaciones/Index';
import Tareas from './tareas/index';
import Guardar from './tareas/Guardar';
/* const tareas = () => <div>Hola soy una tarea</div> */
const App = () => (
  <BrowserRouter>
    <Menu/>
    <div className="margen">
      <Route exact path='/usuarios' component={Usuarios}/>
      <Route exact path='/tareas' component={Tareas}/>
      <Route exact path='/publicaciones/:key' component={Publicaciones}/>
      <Route exact path='/tareas/guardar' component={Guardar}/>
      <Route exact path='/tareas/guardar/:usu_id/:tar_id' component={Guardar} />
    </div>
  </BrowserRouter>
);

export default App;
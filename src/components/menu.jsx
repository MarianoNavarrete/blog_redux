import React from 'react';
import '../styles/menu.css';
import {Link} from 'react-router-dom';

const Menu = (props) => (
    <nav id = 'menu'>
        <Link to='/usuarios'>Usuarios</Link>
        <Link to='/tareas'>Tareas</Link>
    </nav>
);

export default Menu;
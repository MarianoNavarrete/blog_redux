import React from 'react';
import { connect } from 'react-redux';
import { FaRegEye } from "react-icons/fa";
import {Link} from 'react-router-dom';

const Tabla = (props) => {
    
    const filas = () => (
        props.usuarios.map((usuario, key)=>(
          <tr key = {usuario.id}>
            <td>
              {usuario.name}
            </td>
            <td>
              {usuario.email}
            </td>
            <td>
              {usuario.website}
            </td>
            <td>
                <Link to = {`/publicaciones/${key}`}><FaRegEye /></Link>
            </td>
          </tr>
        ))
    );
    return (
        <div>
            <table className = "tabla">
            <thead>
                <tr>
                <th>
                    Nombre
                </th>
                <th>
                    Correo
                </th>
                <th>
                    Enlace
                </th>
                </tr>
            </thead>
            <tbody>
                {filas()}
            </tbody>
            </table>
        </div>
    )
};

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
  }

export default connect(mapStateToProps)(Tabla);
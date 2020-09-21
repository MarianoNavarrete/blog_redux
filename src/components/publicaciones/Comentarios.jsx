import React from 'react';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import { connect } from 'react-redux';
import '../../styles/texto.css';

const Comentarios = (props) => {
    if(props.com_cargando && props.comentarios.length){
        console.log('com cargando', props.com_cargando)
        return <Spinner />;
    }
    console.log('com cargando', props.com_cargando)
    if(props.com_error){
        return <Fatal mensaje = { props.com_error } />;
    }
    const ponerComentarios = () => (
        props.comentarios.map((comentario) => (
            <li>
                <b>
                    <u>
                        {comentario.email}
                    </u>
                </b>
                <br />
                    {comentario.body}
            </li>
        ))
    );
    return(
        <ul>
            {
                ponerComentarios()
            }
        </ul>
    );
}
const mapStateToProps = ({publicacionesReducer}) => publicacionesReducer;
export default connect(mapStateToProps)(Comentarios);
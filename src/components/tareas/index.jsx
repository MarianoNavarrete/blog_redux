import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import '../../styles/texto.css';
import { Link } from 'react-router-dom';

class Tareas extends Component {
    componentDidMount() {
        if(!Object.keys(this.props.tareas).length){
            this.props.traerTodas();
        }
    }
    componentDidUpdate(){
        if(!Object.keys(this.props.tareas).length){
            this.props.traerTodas();
        }
    }
    mostratContenido () {
        const {tareas, cargando, error } = this.props;
        if(cargando){
            return <Spinner />
        }
        if(error){
            return <Fatal mensaje ={ this.props.error}/>
        }
        
        return Object.keys(tareas).map((usuarios_id) => (
            <div key = {usuarios_id}>
                Usuario {usuarios_id}
                <div className = 'contenedor_tareas'>
                    {this.ponerTareas(usuarios_id)}
                </div>
            </div>
        ));
    }
    ponerTareas = (usu_id) => {
        const {tareas, eliminar } = this.props;
        const por_usuario = {
            ...tareas[usu_id]
        };
        //recorrer objetos
        return Object.keys(por_usuario).map((tarea_id) => (
            <div>
            <input type='checkbox' defaultChecked={por_usuario[tarea_id].completed}
                onChange = { () => (this.props.cambioCheck(usu_id))}
            />
            {
                por_usuario[tarea_id].title
            }
            <button 
            className='m_left'>
                <Link to = {`/tareas/guardar/${usu_id}/${tarea_id}`}>
                    Editar
                </Link>
            </button>
            <button className='m_left'
                onClick = { () => eliminar(tarea_id)}
            >
                Eliminar
            </button>
            </div>
        ));
    }
    clickear(){
        console.log('clock')
    }
    render(){
        console.log(this.props.tareas);
        return (
            <div>
                <button onClick = {this.clickear}><Link to='/tareas/guardar'>
                    Agregar
                </Link></button>
                {this.mostratContenido()}
            </div>
        );
    }

}

const mapStateToProps = ({tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
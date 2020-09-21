import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import {Redirect} from 'react-router-dom';

class Guardar extends Component{
    componentDidMount() {
        const {
            match: { params:{usu_id, tar_id}},
            tareas,
            cambiarUsuarioId,
            cambiarTitulo 
        } = this.props;

        if(usu_id && tar_id) {
            const tarea = tareas[usu_id][tar_id];
            cambiarUsuarioId(tarea.userId);
            cambiarTitulo(tarea.title);
        }
    }
    cambiarUsuarioId = (event) => {
        this.props.cambiarUsuarioId(event.target.value);
    }
    cambiarTitulo = (event) => {
        this.props.cambiarTitulo(event.target.value);
    }
    guardar=()=> {
        const {
            match: { params:{usu_id, tar_id}},
            usuario_id, 
            titulo,
            agregar,
            tareas,
            editar
        } = this.props;

        const nuevaTarea = {
            userId: usuario_id,
            titulo: titulo,
            completed: false
        };
        
        if(usu_id && tar_id){
            const tarea = tareas[usu_id][tar_id];
            const tarea_editada = {
                ...nuevaTarea,
                completed: tarea.completed,
                id:tarea.id
            }
            editar(tarea_editada);
        } else {
            agregar(nuevaTarea);
        }

        
    }
    mostrarAccion = () => {
        const {error, cargando } = this.props;
        if(cargando){
            return <Spinner />
        }
        if(error){
            return <Fatal />
        }
    }
    deshabilitar = () => {
        const {usuario_id, titulo, cargando} = this.props;

        if(cargando){
            return true;
        }
        if(!usuario_id || !titulo){
            return true;
        }
        return false;
    }

    render(){
        return(
            <div>
                {
                   
                    (this.props.regresar) ? <Redirect to = '/tareas'/> : ''
                }
                <h1>
                    Guardar Tarea
                </h1>
                Usuario id:
                <input 
                    type='number'
                    value={this.props.usuario_id}
                    onChange = {this.cambiarUsuarioId}
                />
                {console.log(this.props.usuario_id)}
                <br /><br />
                Titulo:
                <input 
                    value={this.props.titulo}
                    onChange = {this.cambiarTitulo}
                />
                {console.log(this.props.titulo)}
                <br /><br />
                <button
                    onClick = {this.guardar}
                >
                    Guardar
                </button>
                {this.mostrarAccion}
            </div>
        );
    }

}

const mapStateToProps = ({tareasReducer}) => (tareasReducer);
export default connect(mapStateToProps, tareasActions)(Guardar);
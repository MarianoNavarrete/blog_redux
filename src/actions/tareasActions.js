import axios from 'axios';
import {TRAER_TODAS, CARGANDO, ERROR, CAMBIO_ID, CAMBIO_TITULO, TAREA_AGRAGADA, ACTUALIZAR, LIMPIAR} from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {
    dispatch({
        type: CARGANDO,
    })
    try{
        const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const tareas = {};
        responseUsers.data.map((tarea) => (
            tareas[tarea.userId] = {
                ...tareas[tarea.userId],//se esta incluyendo todo los atributos que ya contenia
                [tarea.id] : {//se agrega una nueva propiedad
                    ...tarea
                }
            }
        ));
       
        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'algo salio mal, intenta mas tarde',
        })
        
    }
}

export const cambiarUsuarioId = (value) => (dispatch) => {
    dispatch({
        type: CAMBIO_ID,
        payload: value
    });
}

export const cambiarTitulo = (value) => (dispatch) => {
    dispatch({
        type: CAMBIO_TITULO,
        payload: value
    });
}

export const agregar = (nuevaTarea) => async(dispatch) => {
    dispatch({
        type: CARGANDO
    })

    try{
        const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos',
        nuevaTarea);
        
        dispatch({
            type: TAREA_AGRAGADA
        });
    } catch (error) {
        
        dispatch({
            type: ERROR,
            payload: 'intente mas tarde'
        })
    }
}

export const editar = (tarea_editada) => async(dispatch) => {
    dispatch({
        type: CARGANDO
    })

    try{
        const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
        tarea_editada);
        
        dispatch({
            type: TAREA_AGRAGADA
        });
    } catch (error) {
        
        dispatch({
            type: ERROR,
            payload: 'intente mas tarde'
        })
    }
}

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
    const {tareas} = getState().tareasReducer;
    const seleccionada = tareas[usu_id][tar_id];

    const actualizadas = {
        ...tareas
    };
    actualizadas[usu_id] = {
        ...tareas[usu_id]
    }
    actualizadas[usu_id][tar_id] = {
        ...tareas[usu_id][tar_id],
        completed: !seleccionada.completed
    }

    dispatch({
        type: ACTUALIZAR,
        payload: actualizadas
    })
}

export const eliminar = (tar_id) => async(dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try{
        const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);
        dispatch({
            type: TRAER_TODAS,
            payload:{}
        });
    } catch(error){
        dispatch({
            type: ERROR,
            payload: 'el servicio no esta disponible'
        });
    }
}

export const limpiarForma = () =>(dispatch) => {
    dispatch({
        type: LIMPIAR
    });
}
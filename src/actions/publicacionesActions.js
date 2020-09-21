import axios from 'axios';
import {ACTUALIZAR, 
    CARGANDO, 
    ERROR, 
    COM_ERROR,
    COM_ACTUALIZAR} from '../types/publicacionesTypes';

import * as usuariosTypes from '../types/userTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes; 

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO,

    })
    try{
        const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({
            type: ACTUALIZAR,
            payload: responseUsers.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'algo salio mal, intenta mas tarde',
        })
        console.log('error',error.message);
    }
}

export const traerUsuario = (id) => async(dispatch, getState) => {
    dispatch({
        type: CARGANDO,

    })
    
    try{
        const { usuarios } = getState().usuariosReducer;
        const { publicaciones } = getState().publicacionesReducer;
        const usuario_id = usuarios[id].id;
        const responseUser = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);
        
        const nuevas = responseUser.data.map((publicacion) => ({
            ...publicacion,
            comentarios: [],
            abierto: false
        }));

        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ];
        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [
            ...usuarios,
        ];
        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        });
        usuarios_actualizados[id] = {
            ...usuarios[id],
            publicaciones_key
        }
        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        });
        }catch(error) {
            dispatch({
                type: ERROR,
                payload: 'publicaciones no disponibles',
            })
            
        }
}

export const abrirCerrar = (publicaciones_key, com_key) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[publicaciones_key][com_key];
    console.log(seleccionada.abierto)
    const actualizada = {
        ...seleccionada,
            abierto: !seleccionada.abierto
    }
    //inmutabilidad
    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[publicaciones_key] = [
        ...publicaciones[publicaciones_key]
    ];
    publicaciones_actualizadas[publicaciones_key][com_key] = actualizada;
    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    });

}

export const traerComentarios = (pub_key, com_key) => async(dispatch, getState) => {
    
    
    
    try {
        
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key];
    
    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`);
    const actualizada = {
        ...seleccionada,
        comentarios: respuesta.data
    }

    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];
    publicaciones_actualizadas[pub_key][com_key] = actualizada;
    
    dispatch({
        type: COM_ACTUALIZAR,
        payload: publicaciones_actualizadas
        
    });
    } catch(error){
        console.log(error.message);
        dispatch({
            type: COM_ERROR,
            payload: 'Comentarios no disponibles'
        });
    }
}
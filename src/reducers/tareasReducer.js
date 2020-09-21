import {TRAER_TODAS, CARGANDO, ERROR, CAMBIO_ID, CAMBIO_TITULO, TAREA_AGRAGADA, ACTUALIZAR, LIMPIAR} from '../types/tareasTypes';

const INITIAL_STATE = {
    tareas: {},
    cargando: false,
    error: '',
    usuario_id: '',
    titulo: '',
    regresar: ''
};

export default (state = INITIAL_STATE, action) => { 
    switch(action.type){
        case TRAER_TODAS:
            return{...state, tareas: action.payload, cargando: false, regresar: false};
        case CARGANDO:
            return {...state, cargando: true};
        case ERROR:
            return{...state, error: action.payload, cargando: false}
        case CAMBIO_ID:
            return{...state, usuario_id: action.payload}
        case CAMBIO_TITULO:
            return{...state, titulo: action.payload}
        case TAREA_AGRAGADA:
            return{...state, tareas:{}, cargando:false, error: '', regresar: true, titulo: '', usuario_id: ''}
        case ACTUALIZAR:
            return {...state, tareas: action.payload}
        case LIMPIAR:
            return {...state, titulo: '', usuario_id:''}
            default: 
            return state;
    }
}
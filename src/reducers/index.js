import {combineReducers} from 'redux';
import usuariosReducer from './userReducer';
import pokemonReducer from './pokemonReducer';
import publicacionesReducer from './publicacionesReducer';
import tareasReducer from './tareasReducer';

export default combineReducers({
    usuariosReducer,
    pokemonReducer,
    publicacionesReducer,
    tareasReducer
});
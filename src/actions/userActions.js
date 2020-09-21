import axios from 'axios';
import {TRAER_TODOS, CARGANDO, ERROR} from '../types/userTypes';
export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO,

    })
    try{
        const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({
            type: TRAER_TODOS,
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
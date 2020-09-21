import axios from 'axios';

export const cargarPokemon = () => async (dispatch) => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    dispatch({
        type: 'traer_pokemon',
        payload:response.data.results
    });
}
const INITIAL_STATE = {
    pokemon: []
}

export default (state= INITIAL_STATE, action) => {
    switch(action.type){
        case 'traer_pokemon':
            return {...state,pokemon: action.payload}
        default:
            return state;
    }
}
import React from 'react';
import {connect} from 'react-redux';
import * as cualquierNombre from '../actions/pokemonActions';

class ShowPokemon extends React.Component {
    componentDidMount (){
        this.props.cargarPokemon();//nombre de la funcion del action
    }
    filas = () => (
        
        this.props.pokemon.map((pok) => (
            <tr>
                <td>{pok.name}</td>
                <td>{pok.url}</td>
            </tr>
        ))
    );
    render(){
        
        console.log(this.props);
        return(
            <table>
                <thead>
                    <tr>
                        <td>nombre</td>
                        <td>URL</td>
                    </tr>
                </thead>
                <tbody>
                    {this.filas()}
                    
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (reducers) => {
    return reducers.pokemonReducer;
}

export default connect( mapStateToProps, cualquierNombre )(ShowPokemon);
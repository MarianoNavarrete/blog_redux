import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import * as postActions from '../../actions/publicacionesActions'; 

import Fatal from '../general/Fatal';
import Spinner from '../general/Spinner';
import Card from 'react-bootstrap/Card';
import Comentarios from './Comentarios';

//esto se hace cuando tenemos ambiguedades
//cuando tenemos una misma funcion que hace lo mismo en diferetes reducers y actions reducers
//como por ejemplo el traer todos tiene el mismo nombre y el mismo nombre del type
const { traerTodos: traerTodosUsuarios } = userActions;
const { traerUsuario: traerUnUsuario,
abrirCerrar,
traerComentarios } = postActions;

class Publicaciones extends React.Component {
    
    async componentDidMount (){
        //desdestrucutrar el props
        const {
            traerTodosUsuarios,
            traerUnUsuario,
            match: {params: {key}}
        } = this.props;
        //si no existe usuario cargados, cargo los usuarios
        if(!this.props.usuariosReducer.usuarios.length){
            //cuando se tiene dos o mas reducers activos se tieene que especificar en las props el que estamos utilizando
            await traerTodosUsuarios();
        }
        //el usuario no existe hasta que se ejecuta la funcion
        //por eso debemos verificar si existe un error
        if(this.props.usuariosReducer.error){
            return console.log('hubo un error');
        }
        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
            await traerUnUsuario(key);
        }
    }
    ponerUsuario = () => {
        const {usuariosReducer,
        match: {params:{key}}
        } = this.props;
        if (!usuariosReducer.usuarios.length || usuariosReducer.cargando){
            return <Spinner/>
        }
        if(this.props.publicacionesReducer.error){
            return <Fatal mensaje={usuariosReducer.error}/>
        }
        const nombre = usuariosReducer.usuarios[key].name;
        return (<h1>nombre de el usuario {nombre}</h1>);
    }
    ponerPublicaciones(){
        const { usuariosReducer,
            usuariosReducer:{usuarios},
            publicacionesReducer,
            publicacionesReducer:{publicaciones},
            match: {params: {key}}
        } = this.props;

        if(!usuarios.length){
            return;
        }
        if(usuariosReducer.error){
            return;
        }
        if(publicacionesReducer.cargando){
            return <Spinner />;
        }
        if(publicacionesReducer.error){
            return <Fatal mensaje={publicacionesReducer.error} />;
        }
        if(!publicaciones.length){
            return;
        }
        if(!('publicaciones_key' in usuarios[key])){
            return;
        }
        const { publicaciones_key } = usuarios[key];
        
        return this.mostrarInfor(publicaciones[publicaciones_key],publicaciones_key)
        
    }
    mostrarComentarios = (pub_key, com_key, comentarios) => {
        this.props.abrirCerrar(pub_key, com_key);
        if(!comentarios.length){
            this.props.traerComentarios(pub_key, com_key);
        }
    }
    mostrarInfor = (publicaciones, publicaciones_key) => 
        publicaciones.map((publicacion,com_key) => (
            <div key = {publicacion.id}
                onClick = { () => this.mostrarComentarios(publicaciones_key, com_key, publicacion.comentarios)}
            >
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{publicacion.title}</Card.Title>
                        <Card.Text>
                            {publicacion.body}
                        </Card.Text>
                        <Card.Text>
                        {
                            (publicacion.abierto ? <Comentarios comentarios = {publicacion.comentarios}/> : '')
                        }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        ));
    
    render () {
        console.log(this.props)
        return (
            <div>
                <h1>Publicaciones</h1>
                {this.ponerUsuario()}
                {this.ponerPublicaciones()}
                
            </div>
        );
    }
}
const mapStateToProps = ({usuariosReducer, publicacionesReducer}/*desestructuro cuando necesito enviar mas de dos reducers*/) => {
    return {
        usuariosReducer,
        publicacionesReducer
    };
}
//cuando tenemos dos o mas actions es necesario hacer un mapDispatchToProps
const mapDispatchToProps = {
    traerTodosUsuarios,
    traerUnUsuario,
    abrirCerrar,
    traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);

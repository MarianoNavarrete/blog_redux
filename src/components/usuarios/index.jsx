import React from 'react';
import '../../App.css';
import {connect} from 'react-redux';
import  * as userActions from '../../actions/userActions';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Tabla from '../usuarios/Tabla';

class Usuarios extends React.Component {
  /* constructor() {
    super();
    this.state = {
      users:[]
    }
  } */
  /* async componentDidMount(){
   const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
   
    this.setState(
      {
        users: responseUsers.data
      }
    );
  } */
  
  componentDidMount() {
    if(!this.props.usuarios.length){
      this.props.traerTodos();
    }
  }

  render(){
    console.log(this.props.cargando);
    console.log(this.props.error);
    if(this.props.cargando === true){
      return <Spinner />;
    }
    if(this.props.error){
      return <Fatal mensaje = {this.props.error}/>;
    }
    return <Tabla />
      
  }
  
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;//usuarios reducers sale del index donde utilizamos el combinereducers
}

export default connect(mapStateToProps /**reducers */,userActions/**actions */)(Usuarios);

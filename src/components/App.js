import React from 'react';
import '../App.css';
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users:[]
    }
  }
  async componentDidMount(){
   const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
   console.log(responseUsers);
    this.setState(
      {
        users: responseUsers.data
      }
    );
  }
  
  filas = () => (
    this.state.users.map((usuario)=>(
      
      <tr key = {usuario.id}>
        <td>
          {usuario.name}
        </td>
        <td>
          {usuario.email}
        </td>
        <td>
          {usuario.website}
        </td>
      </tr>
    ))
  );
  render(){
    console.log(this.state.users);
    return (
      <div className="App margen">
        <table className = "tabla">
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Correo
              </th>
              <th>
                Enlace
              </th>
            </tr>
          </thead>
          <tbody>
            {this.filas()}
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default App;

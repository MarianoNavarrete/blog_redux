import React from 'react';
import '../App.css';


function App() {
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
          <tr>
            <td>Jose</td>
            <td>jose@mail.com</td>
            <td>jose.com</td>
          </tr>
          <tr>
            <td>Ana</td>
            <td>ana@mail.com</td>
            <td>ana.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;

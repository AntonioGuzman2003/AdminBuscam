import React from "react";
import "./Principal.css";
import logo from "../assets/logo2.png"; 
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="main-container">
      <div className="logo">
          <img src={logo} alt="Logo" className="logoimage" />
      </div>
        <div className="admin-panel">
          <h1>Buscam</h1>
          <h2>Administrar</h2>
          <div className="contenedor">
            <Link to="/Usuario" className="btn btn-3">Usuarios</Link>
            <Link to="/Anuncio" className="btn btn-3">Productos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

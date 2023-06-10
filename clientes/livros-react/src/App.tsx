import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LivroLista from './LivroLista.js'
import LivroDados from './LivroDados.js'
import './App.css';

function App() {
  return (
<Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Catálogo
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dados" className="nav-link">
              Novo
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<LivroLista />} />
        <Route path="/dados" element={<LivroDados />} />
      </Routes>
    </Router>
  );
}

export default App;

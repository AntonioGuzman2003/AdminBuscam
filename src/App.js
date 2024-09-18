import './App.css';
import Usuario from './components/Usuario';
import Principal from './components/Principal';
import Edit from './components/Edit';
import Create from './components/Create';

import Anuncio from './components/Anuncio';
import CreateAnuncio from './components/CreateAnuncio';
import EditAnuncio from './components/EditAnuncio';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Principal />}/>
        <Route path='/Usuario' element={<Usuario />}/>
        <Route path='/Usuario/create' element={<Create />}/>
        <Route path='/Usuario/edit/:userId' element={<Edit />}/>
        //Anuncio
        <Route path='/Anuncio' element={<Anuncio />}/>
        <Route path='/Anuncio/CreateAnuncio' element={<CreateAnuncio />}/>
        <Route path='/Anuncio/EditAnuncio/:AnuncioId' element={<EditAnuncio />}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

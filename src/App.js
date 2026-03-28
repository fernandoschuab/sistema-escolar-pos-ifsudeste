import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import CadastrarAlunos from "./pages/CadastrarAlunos";
import CadastrarLivros from "./pages/CadastrarLivros";
import Alunos from './pages/Alunos';
import Biblioteca from './pages/Biblioteca';
import Dashboard from './pages/Dashboard';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
      <BrowserRouter>

        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main>
          <Routes>
            <Route path='/' element={<Home darkMode={darkMode}/>} />
            <Route path='/cadastarAlunos' element={<CadastrarAlunos/>} />
            <Route path='/cadastrarLivros' element={<CadastrarLivros/>} />
            <Route path='/Alunos' element={<Alunos/>} />
            <Route path='/Biblioteca' element={<Biblioteca/>} />
            <Route path='/Dashboard' element={<Dashboard/>} />
          </Routes>
        </main>

        <Footer/>

      </BrowserRouter>
  );
}

export default App;

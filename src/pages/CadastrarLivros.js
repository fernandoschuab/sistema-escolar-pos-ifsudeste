import { useState, useEffect } from "react";
import styles from './CadastrarLivros.module.css'
import LivroForm from "../components/LivroForm";
import LivroList from "../components/LivroList";

function CadastrarLivros(){

    const [mensagem, setMensagem] = useState('');
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        let storedLivros;
        try {
            storedLivros = JSON.parse(localStorage.getItem('livros'));
            if (!Array.isArray(storedLivros)) storedLivros = [];
        } catch (e) {
            storedLivros = [];
        }
        setLivros(storedLivros);
    }, []);

    function adicionarLivro(titulo, autor){
        const novoId = livros.length > 0 ? Math.max(...livros.map(l => Number(l.id))) + 1 : 1;
        const novoLivro = { id: novoId, titulo, autor };

        const novosLivros = [...livros, novoLivro];
        setLivros(novosLivros);
        localStorage.setItem('livros', JSON.stringify(novosLivros));
        
        setMensagem('Livro salvo com sucesso!');
        setTimeout(() => setMensagem(''), 3000);
    }

    function removerLivro(id){
        const novosLivros = livros.filter(livro => livro.id !== id);
        setLivros(novosLivros);
        localStorage.setItem('livros', JSON.stringify(novosLivros));
    }

    return (       
        <div className={styles.container}>
            <h1>Cadastrar Livros</h1>

            {mensagem && <p className={styles.sucesso} >{mensagem}</p>}

            <LivroForm adicionarLivro={adicionarLivro} />
            <LivroList livros={livros} removerLivro={removerLivro}/>
        </div>
    );
}

export default CadastrarLivros;

import { useState, useEffect } from "react";
import styles from './CadastrarLivros.module.css'
import LivroForm from "../components/LivroForm";
import LivroList from "../components/LivroList";

function CadastrarLivros(){

    const [mensagem, setMensagem] = useState('');
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/livros")
            .then((resp) => resp.json())
            .then((data) => setLivros(data))
            .catch((err) => console.log(err));
    }, []);

    function adicionarLivro(titulo, autor){
        const novoId = livros.length > 0 ? Math.max(...livros.map(l => Number(l.id))) + 1 : 1;
        const novoLivro = { id: novoId, titulo, autor };

        fetch("http://localhost:5001/livros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoLivro)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setLivros([...livros, data]);
            setMensagem('Livro salvo com sucesso no db.json!');
            setTimeout(() => setMensagem(''), 3000);
        })
        .catch((err) => console.log(err));
    }

    function removerLivro(id){
        fetch(`http://localhost:5001/livros/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setLivros(livros.filter(livro => livro.id !== id));
        })
        .catch((err) => console.log(err));
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

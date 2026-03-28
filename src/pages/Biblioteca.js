import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Biblioteca.module.css'


function Biblioteca() {

    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setTimeout(() => {
            let dadosLivros;
            try {
                dadosLivros = JSON.parse(localStorage.getItem("livros"));
                if (!Array.isArray(dadosLivros)) dadosLivros = [];
            } catch (e) {
                dadosLivros = [];
            }

            if (dadosLivros.length === 0) {
                const defaultLivros = [
                    {
                        "id": 1,
                        "titulo": "Fundamentos de React",
                        "autor": "Maria da Silva"
                    },
                    {
                        "id": 2,
                        "titulo": "React na prática",
                        "autor": "Joãp Souza"
                    },
                    {
                        "id": 3,
                        "titulo": "Linguagens de Programação",
                        "autor": "Ana Costa Ribeiro"
                    },
                    {
                        "id": 4,
                        "titulo": "Front End com React",
                        "autor": "Fernando da Silva"
                    },
                    {
                        "id": 5,
                        "titulo": "Desenvolviemnto web",
                        "autor": "Fernando José"
                    },
                    {
                        "id": 6,
                        "titulo": "Dom Casmurro",
                        "autor": "machado de Assis"
                    }
                ];
                localStorage.setItem("livros", JSON.stringify(defaultLivros));
                setLivros(defaultLivros);
            } else {
                setLivros(dadosLivros);
            }
            setLoading(false);
        }, 1000);

    }, []);

    if (loading) {
        return <p>Carregando livros...</p>
    }

    return (
        <div className={styles.container}>
            <h1>Lista de Livros</h1>

            <Link to="/cadastrarLivros" className={styles.botao}>Cadastrar Novo Livro</Link>

            {livros.length === 0 ? (<p>Nenhum livro encontrado</p>)
                : (
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Autor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map(livro => (
                                <tr key={livro.id}>
                                    <td>{livro.id}</td>
                                    <td>{livro.titulo}</td>
                                    <td>{livro.autor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>
    );

}

export default Biblioteca;
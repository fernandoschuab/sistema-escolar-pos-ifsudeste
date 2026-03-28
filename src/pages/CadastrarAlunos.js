import { useState, useEffect } from "react";
import styles from './CadastrarAlunos.module.css'
import AlunoForm from "../components/AlunoForm";
import AlunoList from "../components/AlunoList";

function CadastrarAlunos(){

    const [mensagem, setMensagem] = useState('');
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        let storedAlunos;
        try {
            storedAlunos = JSON.parse(localStorage.getItem('alunos'));
            if (!Array.isArray(storedAlunos)) storedAlunos = [];
        } catch (e) {
            storedAlunos = [];
        }
        setAlunos(storedAlunos);
    }, []);

    function adicionarAluno(nome){
        const novoId = alunos.length > 0 ? Math.max(...alunos.map(a => Number(a.id))) + 1 : 1;
        const novoAluno = { id: novoId, nome, curso: 'Informática' };
        
        const novosAlunos = [...alunos, novoAluno];
        setAlunos(novosAlunos);
        localStorage.setItem('alunos', JSON.stringify(novosAlunos));
        
        setMensagem('Aluno cadastrado com sucesso!');
        setTimeout(() => setMensagem(''), 3000);
    }

    function removerAluno(id){
        const novosAlunos = alunos.filter(aluno => aluno.id !== id);
        setAlunos(novosAlunos);
        localStorage.setItem('alunos', JSON.stringify(novosAlunos));
    }

    return (       
        <div className={styles.container}>
            <h1>Cadastrar Alunos</h1>

            {mensagem && <p className={styles.sucesso} >{mensagem}</p>}

            <AlunoForm adicionarAluno={adicionarAluno} />
            <AlunoList alunos={alunos} removerAluno={removerAluno}/>
        </div>
    );
}

export default CadastrarAlunos;
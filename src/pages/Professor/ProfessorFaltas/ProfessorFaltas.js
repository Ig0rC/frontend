import React, { useEffect, useState, useContext } from 'react';
import Menu from '../../../Components/Professor/header/headerProfessor';
import { Context } from '../../../Context/ProfessorNotaContext';
import api from '../../../services/api';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';







export default function ProfessorFaltas(){
    
    const { idTurma, semestreC, anoC, idDisciplina } = useContext(Context);
    const [ faltas, setFaltas ] = useState(0);
    const [ aluno, setAluno ] = useState([]);
    const [cpf, setCPF ] = useState('0');

    useEffect( ()=>{
        (async() =>{
          
            
            await api.put(`/professor/lanca-notas`,{
                cpfAluno: cpf,
                idTurma: idTurma,
                idDisciplina: idDisciplina,
                quantidade:faltas
            })
      
        })();
        }, [faltas])

    useEffect(() => {
        (async () => {
            console.debug('id turm', idTurma, 'id_disciplina' ,idDisciplina)
            const response = await api.get(`/professor/alunos/faltas/${idDisciplina}/${idTurma}`)
            setAluno(response.data);
            console.debug('response: ', response)
        }
        )();
    },[]);

    

    console.log(aluno)
    return(
        <>
        <Menu />
        <div class="cadastrar-curso-a-instituicao-titulo">
        <h1>Sistema de Gerenciamento da Turma</h1>
        </div>
        {aluno.map(aluno => (
             <div className="Professor-notas-Alunos">
             <div className="tabela-professor-nota">
                 <div>
                     <p>CPF: {aluno.cpf_aluno}</p>
                     <p>Nome: {aluno.nome}</p>
                     <p>Semestre: {semestreC}</p>
                     <p>Ano: {anoC}</p>
                 </div>
                 <div className="inputs-professor-notas">
                     <p>Faltas: </p>
                    
                     <input 
                        defaultValue={aluno.quantidade}
                        onChange={
                            ( { target: {value} } ) => setFaltas(value)
                        }
                        //setando valor na variavel CPF
                        onSelect={() => setCPF(aluno.cpf_aluno)}
                        className="input-nota-entrada" type="number" 
                    />
                 </div>
             </div> 
         </div>
        ))}
       
        </>
    )
}
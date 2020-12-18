import React, { useEffect, useState, useContext } from 'react';
import Menu from '../../../Components/Professor/header/headerProfessor';

import { Context } from '../../../Context/ProfessorNotaContext';
import api from '../../../services/api';
import MenuAdministrador from '../../../Components/administrador/header/header.js'


import './ProfessorFaltas.css';







export default function ProfessorFaltas(){
    
    const { idTurma, semestreC, anoC, idDisciplina, ProfessorOuAdministrador } = useContext(Context);
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
            if(ProfessorOuAdministrador === '1'){
                const response = await api.get(`/administrador/lanca/faltas/alunos/${idDisciplina}/${idTurma}`)
                setAluno(response.data);
                console.log(response.data)
            }
            else{
                console.log('entrou aqui')
                const response = await api.get(`/professor/alunos/faltas/${idDisciplina}/${idTurma}`)
                setAluno(response.data);
            }
        }
        )();
    },[]);

    if(ProfessorOuAdministrador === '1'){
        return(
            <>
             <MenuAdministrador />
                <div class="cadastrar-curso-a-instituicao-titulo">
                
                <h1>Lançamento de Faltas</h1>
                </div>
                <section className="section-professor-faltas-Alunos">
                    {aluno.map(aluno => (
                        <div className="div-professor-faltas-Alunos">
                        <div className="tabela-professor-faltas-aluno">
                            <div>
                                <p><strong>CPF: </strong>{aluno.cpf_aluno}</p>
                                <p><strong>Nome: </strong> {aluno.nome}</p>
                                <p><strong>Semestre:</strong> {semestreC}</p>
                                <p><strong>Ano: </strong>{anoC}</p>
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
                                    className="input-nota-entrada-professor-faltas" type="number" 
                                />
                            </div>
                        </div> 
                    </div>
                    ))}
                </section>
            </>
        )
    }

    return(
        <>
        <Menu />
        <div class="cadastrar-curso-a-instituicao-titulo">
        <h1>Lançamento de Faltas</h1>
        </div>
        <section className="section-professor-faltas-Alunos">
            {aluno.map(aluno => (
                <div className="div-professor-faltas-Alunos">
                <div className="tabela-professor-faltas-aluno">
                    <div>
                        <p><strong>CPF: </strong>{aluno.cpf_aluno}</p>
                        <p><strong>Nome: </strong> {aluno.nome}</p>
                        <p><strong>Semestre:</strong> {semestreC}</p>
                        <p><strong>Ano: </strong>{anoC}</p>
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
                            className="input-nota-entrada-professor-faltas" type="number" 
                        />
                    </div>
                </div> 
            </div>
            ))}
        </section>
        </>
    )
}
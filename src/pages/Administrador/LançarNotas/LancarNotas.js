import React, { useState, useEffect, useRef, useContext } from 'react';
import api from '../../../services/api';
import Menu from '../../../Components/administrador/header/header.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../../Context/ProfessorNotaContext.js';
import './LancarNotas.css'



export default function LancarNotas (){

    const { SelecionaTurmaNota } = useContext(Context)
    const [turmas, setTurmas] = useState([]);

    //NO MOMENTO QUE TERMINA O CARREGAMENTO DA PAGE ELE VAI SE EXECUTAR
    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/administrador/buscar/leciona/alunos`);
                console.log(data)
                setTurmas(data)
            } catch (error) {
                console.log(error)
            }
        })(); 
    }, []);

    
    return(
        <>
        <Menu />
        <div className="perfil-instituicao-bg" >
                <div className="perfil-titulo">
                    <h2>Lançamentos</h2>
                </div>
            </div>
            <section className="section-destkop-professor-turma">
            <div className="list-cursos-all-bg">
            <table >
                    <tr>
                        <th scope="col">
                            Código Turma
                        </th>
                        <th scope="col">
                            Nome Turma
                        </th>
                        <th scope="col">
                            Nome Disciplina
                        </th>
                        <th scope="col">
                            Horário Aula 
                        </th>
                        <th scope="col">
                            Semestre
                        </th>
                        <th scope="col">
                            Ano
                        </th>
                        <th scope="col">
                           Lançar Nota        
                        </th>
                        <th scope="col">
                            Lançar Falta        
                        </th>
                    </tr>
                {turmas.map( turmas => (
                        <tr key={turmas.id_turma}>
                        <td>{turmas.id_turma}</td>
                        <td>{turmas.nome_turma}</td>
                        <td>{turmas.nome_disciplina}</td>
                        <td>{turmas.horario_aula}</td>
                        <td>{turmas.semestre}</td>
                        <td>{turmas.ano}</td>
                        <td>
                            <a 
                                onClick={() => 
                                        SelecionaTurmaNota(
                                            turmas.id_turma,
                                            turmas.semestre,
                                            turmas.ano,
                                            turmas.id_disciplina,
                                            1,
                                            1
                                        )}
                            >
                                <FontAwesomeIcon icon={faEdit} color="#0060EB" />
                            </a>
                        </td>
                        <td>
                            <a  
                            onClick={() => 
                                        SelecionaTurmaNota(
                                            turmas.id_turma,
                                            turmas.semestre,
                                            turmas.ano,
                                            turmas.id_disciplina,
                                            0,
                                            1
                            )}
                            >
                                <FontAwesomeIcon icon={faMapPin} color="#0060EB" />
                            </a>
                        </td>
                  </tr>
                ))}
            </table> 
        </div>
        </section>

        <section className="mobile-section-lancar-notas">
            <div>
            {turmas.map( turmas => (
                <div key={turmas.id_turma} className="mobile-div-lancar-notas">
                    <p><strong>Código da Turma:</strong>  {turmas.id_turma}</p>
                    <p><strong>Nome da Turma:</strong> {turmas.nome_turma}</p>
                    <p><strong>Nome da Disciplina:</strong> {turmas.nome_disciplina} </p>
                    <p><strong>Horário Aula:</strong> {turmas.horario_aula}</p>
                    <p><strong>Semestre:</strong>  {turmas.semestre} </p>
                    <p><strong>Ano: </strong>{turmas.ano} </p>
                    <div className="option-lancar-notas">
                        <div >
                            <p><strong>Lançar Falta:</strong> </p>
                            <a 
                                onClick={() => 
                                        SelecionaTurmaNota(
                                            turmas.id_turma,
                                            turmas.semestre,
                                            turmas.ano,
                                            turmas.id_disciplina,
                                            1,
                                            1
                                        )}
                            >
                                <FontAwesomeIcon icon={faEdit} color="#0060EB" />
                            </a>
                        </div>
                        <div >
                            <p><strong>Lançar Nota:</strong></p>
                            <a  
                            onClick={() => 
                                        SelecionaTurmaNota(
                                            turmas.id_turma,
                                            turmas.semestre,
                                            turmas.ano,
                                            turmas.id_disciplina,
                                            0,
                                            1
                            )}
                            >
                                <FontAwesomeIcon icon={faMapPin} color="#0060EB" />
                            </a>
                        </div>
                    </div>     
                </div>
            ))}
            </div>
        </section>
        </>
    )
}
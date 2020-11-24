import React, {useEffect, useState} from 'react';
import Menu from '../../../Components/Professor/header/headerProfessor';
import api from '../../../services/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faMapPin } from '@fortawesome/free-solid-svg-icons'




export default function ProfessorTurma(){
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/professor/leciona/materia`);
                setTurmas(data)
            } catch (error) {
                console.log(error)
            }
        })(); 
    }, [])

    return(
        <>
            <Menu />
            <div class="list-cursos-all-bg">
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
                            <a href="/professor-turma-notas">
                                <FontAwesomeIcon icon={faEdit} color="#0060EB" />
                            </a>
                        </td>
                        <td>
                            <a href="/professor-turma-notas">
                                <FontAwesomeIcon icon={faMapPin} color="#0060EB" />
                            </a>
                        </td>
                  </tr>
                ))}
            </table> 
        </div>
        </>
    )
}
import React, { useState, useEffect, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header.js';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ContextLeciona } from '../../../Context/LecionaContext';
import './BuscarLeciona.css'





export default function BuscarLeciona (){

    const { SelecionarLeciona } = useContext(ContextLeciona)
    const [ leciona, setLeciona ] = useState([]);

    useEffect(() => {

        (async() =>{
            const { data } = await api.get('/buscar/professores/lecionados/administradores')
            setLeciona(data);
        })();
        
    }, [])
    return(
        <>
            <Menu />
            <div className="flex-list-all-bg">
                <div className="flex-pesq-list-all">
                    <div className="tamanho-pesq-atributos">
                        <p className="titulo-aluno-list-all">Leciona</p>
                    </div>
                </div>
            </div>
            <section className="section-destkop-professor-turma">
            <div class="list-cursos-all-bg">
            <table >
                    <tr>
                        <th scope="col">
                            Código Turma
                        </th>
                        <th scope="col">
                            Nome do Professor
                        </th>
                        <th scope="col">
                            Nome da Disciplina
                        </th>
                        <th scope="col">
                            Nome da Turma 
                        </th>
                        <th scope="col">
                            Semestre
                        </th>
                        <th scope="col">
                            Ano
                        </th>
                        <th scope="col">
                            Editar || Visualizar 
                        </th>
                    </tr>
                 {leciona.map( leciona => (
                        <tr key={leciona.id_turma}>
                        <td>{leciona.id_turma}</td>
                        <td>{leciona.nome}</td>
                        <td>{leciona.nome_disciplina}</td>
                        <td>{leciona.nome_turma}</td>
                        <td>{leciona.semestre}</td>
                        <td>{leciona.ano}</td>
                        <td>
                            <a 
                                onClick={() => 
                                    SelecionarLeciona(
                                            leciona.cpf_professor,
                                            leciona.id_disciplina,
                                            leciona.id_turma,
                                        )}
                            >
                                <FontAwesomeIcon icon={faEdit} size="lg" color="#0060EB" />
                            </a>
                        </td>
                  </tr>
                ))} 
            </table> 
        </div>
        </section>

        <section className="section-buscar-leciona">
        {leciona.map( leciona => (
            <div  className="div-buscar-leciona" key={leciona.id_turma}>
                <p><strong>Código da turma:</strong> {leciona.id_turma}</p>
                <p><strong>Nome do Professor:</strong> {leciona.nome}</p>
                <p><strong>Nome da Disciplina:</strong> {leciona.nome_disciplina}</p>
                <p><strong>Nome da Turma:</strong> {leciona.nome_turma}</p>
                <p><strong>Semestre:</strong> {leciona.semestre} </p>
                <p><strong>Ano:</strong> {leciona.ano} </p>
              
                <div className="option-buscar-leciona"> 
                <p><strong>Editar || Visualizar:</strong></p>
                    <a 
                        onClick={() => 
                            SelecionarLeciona(
                                leciona.cpf_professor,
                                leciona.id_disciplina,
                                leciona.id_turma,
                                    )}
                                >
                        <FontAwesomeIcon icon={faEdit} size="lg" color="#0060EB" />
                    </a>
                </div>
            </div>
         ))} 
        </section>
        </>
    )
}
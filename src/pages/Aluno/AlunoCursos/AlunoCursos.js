import React, { useEffect, useState, useContext } from 'react';
import Menu from '../../../Components/Aluno/AlunoHeader';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AlunoInfoContext } from '../../../Context/AlunoInfoCursoContext';
import './AlunoCursos.css'



function AlunoCursos(){

    const { selecionaCurso  } = useContext(AlunoInfoContext)



    const [ curso, setCursos] = useState([]);


    // ARROW FUNCTION 
    useEffect(() => {

        (async () => {
            //CONST É UMA VARIAVEL 
            const response = await api.get(`/alunos/buscar/cursos`);
            setCursos(response.data)
            console.debug('resposta', response.data)
    
        })();
        
    }, [])

    
    


    return(
        <>
        <Menu />
        
        <section className="Aluno-cursos-desktop">
            <div className="list-instituicao-all-bg">
                    <table>
                            <tr >
                                <th scope="col">
                                    Curso
                                </th>
                                <th scope="col">
                                    Carga Horária 
                                </th>
                                <th scope="col">
                                    Nível
                                </th>
                                <th scope="col">
                                    Nome Instituição
                                </th>
                                <th scope="col">
                                    Cidade | Estado
                                </th>
                                <th scope="col">
                                    Informações
                                </th>
                            </tr>
                            {curso.map(curso => (
                                <tr>
                                    <th key={curso.nome_curso}>{curso.nome_curso}</th>
                                    <td>{curso.carga_horaria}</td>
                                    <td>{curso.nivel}</td>
                                    <td>{curso.nome_instituicao}</td>
                                    <td>{curso.cidade} | {curso.estado}</td>
                                    <td>
                                        <a 
                                        onClick={() => selecionaCurso(curso.id_curso, curso.id_instituicao)}
                                        >
                                            <FontAwesomeIcon icon={faInfoCircle} size="lg" color="green" /> 
                                        </a>
                                    </td>
                                
                                </tr>
                            ))} 
                    </table> 
                </div>
        </section>
        {/* MOBILE */}

        <section className="Aluno-Cursos-mobile">
        {curso.map(curso => (
            <div key={curso.nome_curso}className="Aluno-cursos-mobile-div">
                <p><strong>Nome Curso: </strong> {curso.nome_curso}</p>
                <p><strong>Carga Horária: </strong>{curso.carga_horaria}</p>
                <p><strong>Nível: </strong> {curso.nivel} </p>
                <p><strong>Nome Instituição: </strong>  {curso.nome_instituicao} </p>
                <p><strong>Cidade | Estado: </strong> {curso.cidade} | {curso.estado} </p>
                <div className="Aluno-cursos-mobile-informacao">
                    <p><strong>Informações: </strong>   
                    
                    </p>
                    <a 
                            onClick={() => selecionaCurso(curso.id_curso, curso.id_instituicao)}>
                            <FontAwesomeIcon icon={faInfoCircle} size="lg" color="green" /> 
                    </a>
                </div>
            </div>
        ))} 
        </section>
        </>
    )
}



export default AlunoCursos;
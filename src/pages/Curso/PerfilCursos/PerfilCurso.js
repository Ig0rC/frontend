import React, { useContext, useEffect, useState } from 'react';
import Menu from '../../../Components/administrador/header/header';
import { Context } from '../../../Context/CursoContext';
import api from '../../../services/api';
import './PerfilCurso.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';





export default function PerfilCurso() {
    const [curso, setCurso] = useState([]);
    const [turma, setTurma] = useState([]);
    const [turmasVinculadas, setTurmasVinculadas ] = useState([])
    const { idc } = useContext(Context);
    const [escolhaTurma, setEscolhaTurma] = useState(0);
    const [escolhaTurno, setEscolhaTurno] = useState('');
    const [ reload , setReload] = useState(true)
    const [disciplinasVinculadas, setDisciplinasVinculadas ] = useState([])
    const [ disciplinas, setDisciplinas ] = useState([]);
    const [escolhaDisciplina, setEscolhaDisciplina ] = useState(0);
    const [realoadDisciplinas, setReloadDisciplinas ] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await api.get(`cursos/seleciona/${idc}`);
            setCurso(response.data)
            const responseTurma = await api.get(`turma`)
            console.debug('turma', turma)
            setTurma(responseTurma.data)
            const responseTableTurma = await api.get(`/turma/curso/${idc}`)
            setTurmasVinculadas(responseTableTurma.data);
            const responseDisciplinas = await api.get(`/disciplinas/cursos`);
            setDisciplinas(responseDisciplinas.data)
            const responseDisciplinasVinculadas = await api.get(`/disciplinacurso/${idc}`)
            setDisciplinasVinculadas(responseDisciplinasVinculadas.data);
        })();
    }, [idc])
    

    useEffect(() =>{
        (async() =>{
            const responseTableTurma = await api.get(`/turma/curso/${idc}`)
            setTurmasVinculadas(responseTableTurma.data);
         
        })();
    }, [reload])

    useEffect(() =>{
        (async() =>{
            const responseDisciplinasVinculadas = await api.get(`/disciplinacurso/${idc}`)
            setDisciplinasVinculadas(responseDisciplinasVinculadas.data);
         
        })();
    }, [realoadDisciplinas])

    async function vincularCursoaTurma() {
        console.log(escolhaTurno, escolhaTurma)
        try {
            await api.post(`turmacurso/${escolhaTurma}/${idc}/${escolhaTurno}`);
            alert('Vinculado');
            if(reload === false){
                return setReload(true); 
            }
            return setReload(false); 
        } catch (error) {
            console.log(error)
            alert('error! Verifique os campos.')
        }

    }
    async function desvincularTurmadoCurso(idTurma){
        try {
           await api.delete(`turmacurso/${idTurma}/${idc}`);
            alert('Apagado com Sucesso');
            if(reload === false){
                return setReload(true); 
            }
            return setReload(false); 
        } catch (error) {
            alert('Error')
        }
    }

    async function VincularDisciplina(){
        try {
            await api.post(`/disciplinacurso/${escolhaDisciplina}/${idc}`)
            alert('Vinculado');
            if(realoadDisciplinas === false ){
                return setReloadDisciplinas(true);
            }
            return setReloadDisciplinas(false);
        } catch (error) {
            alert('error')
        }
    }

    async function DesvincularDisciplina(idD){
        try {
            await api.delete(`/disciplinacurso/${idD}/${idc}`)
            alert('Deleteado')
            if(realoadDisciplinas === true ){
                return setReloadDisciplinas(false);
            }
            return setReloadDisciplinas(true)
        } catch (error) {
            alert('error')
        }
    }
    return (
        <>
            <Menu />
            <div>
                <div class="perfil-instituicao-bg" >

                    <div class="perfil-titulo">

                        <h2>Dados do Curso</h2>
                    </div>
                </div>


                {curso.map(curso => (
                    <section>


                        <div key={curso.id_curso} class="perfil-curso-div-center">


                            <p>Código do Curso: <strong>{curso.id_curso}</strong></p>
                            <p>Resposável: </p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                defaultValue={curso.nome_curso}
                            // onChange={({ target: { value } }) => setNome(value)}
                            />
                            <p>Duração do Curso em Semestre: </p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                defaultValue={curso.duracao_semestres}

                            />
                            <p>Período: </p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                defaultValue={curso.periodo}

                            />
                            <p>Nível: </p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                defaultValue={curso.nivel}
                            />
                            <p>Carga Horária: </p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                defaultValue={curso.carga_horaria}

                            />
                        </div>


                    </section>
                ))}
            <div class="linha-separado-instituicao-perfil">
            </div>
            <div class="cadastrar-curso-a-instituicao-titulo">
                <h1>Vincular turma</h1>
            </div>
            </div>
            <div class="input-cadastrar-curso-a-instituicao">
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Turma:</p>
                    <select
                        class="input-styles-IT text-aling-center-cadastrar-curso"
                        onChange={({ target: { value } }) => setEscolhaTurma(value)}
                    >
                        <option></option>
                        {turma.map(turma => (
                            <option value={turma.id_turma}>
                                Código: {turma.id_turma} ||
                                                Nome: {turma.nome_turma}

                            </option>
                        ))}



                    </select>
                </div>
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Turno:</p>

                         <select
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value } }) => setEscolhaTurno(value)}
                        >
                            <option></option>
                            <option value="Matutino">Matutino</option>
                            <option value="Vespertino">Vespertino</option>
                            <option value="Noturno">Noturno</option>

                        </select>
                     
                </div>

            </div>
            <div class="button-cadastrar-curso-a-instituicao-div">
                <button 
                    onClick={vincularCursoaTurma}
                    class="button-cadastrar-semestre-env">Cadastrar</button>
            </div>
            <div class="linha-separado-instituicao-perfil">
            </div>
            <div class="cadastrar-curso-a-instituicao-titulo">
                    <h1>Turmas</h1>
            </div>
            <section>
                <div class="list-cursos-all-bg">
                    <table >
                        <tr>
                            <th scope="col">
                                Código da Turma
                            </th>
                            <th scope="col">
                                Nome da Turma
                            </th>
                            <th scope="col">
                                Turno
                            </th>
                            <th scope="col">
                                Data Ingresso
                            </th>
                            <th scope="col">
                                Excluir
                            </th>
                            <th scope="col">
                                Visualizar
                            </th>
                        </tr>

                        
                        {turmasVinculadas.map(turmasVinculadas => (
                            <tr key={turmasVinculadas.id_turma}>
                            <td>{turmasVinculadas.id_turma}</td>
                            <td>{turmasVinculadas.nome_turma}</td>
                            <td>{turmasVinculadas.turno}</td>
                            <td>{turmasVinculadas.data_ingresso}</td>
                            <td> 
                                <a onClick={() => desvincularTurmadoCurso(turmasVinculadas.id_turma)}>
                                    <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                                </a>
                            </td>
                            <td> 
                                <a>
                                    <FontAwesomeIcon icon={faEdit} size="lg" color="green" />
                                </a>
                            </td>
                            </tr> 
                        ))}
                    </table>
                </div>
            </section>

            <section>
                <div class="linha-separado-instituicao-perfil">
                </div>
                <div class="cadastrar-curso-a-instituicao-titulo">
                    <h1>Vincular Disciplinas</h1>
                </div>
                <div class="input-cadastrar-curso-a-instituicao">
                    <div class="input-cadastrar-curso-a-instituicao-div">
                        <p>Disciplinas:</p>
                        <select
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value } }) => setEscolhaDisciplina(value)}
                        >
                            <option></option>
                            {disciplinas.map(disciplinas => (
                                <option value={disciplinas.id_disciplina}>
                                    Código: {disciplinas.id_disciplina} ||
                                                    Nome: {disciplinas.nome_disciplina}

                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div class="button-cadastrar-curso-a-instituicao-div">
                    <button 
                        onClick={VincularDisciplina}
                        class="button-cadastrar-semestre-env">Cadastrar
                    </button>
                </div>
                <section>
                <div class="linha-separado-instituicao-perfil">
                </div>
                <div class="list-cursos-all-bg">
                    <table >
                        <tr>
                            <th scope="col">
                                Código
                            </th>
                            <th scope="col">
                                Nome
                            </th>
                            <th scope="col">
                                Horário da Aula
                            </th>
                            <th scope="col">
                                Semana
                            </th>
                            <th scope="col">
                                Professor 
                            </th>
                            <th scope="col">
                                Excluir
                            </th>
                            <th scope="col">
                                Visualizar
                            </th>
                        </tr>

                        
                        {disciplinasVinculadas.map(disciplinasVinculadas => (
                            <tr key={disciplinasVinculadas.id_disciplina}>
                            <td>{disciplinasVinculadas.id_disciplina}</td>
                            <td>{disciplinasVinculadas.nome_disciplina}</td>
                            <td>{disciplinasVinculadas.horario_aula}</td>
                            <td>{disciplinasVinculadas.diasemana}</td>
                            <td>{disciplinasVinculadas.horas}</td>
                            <td> 
                                <a onClick={() => DesvincularDisciplina(disciplinasVinculadas.id_disciplina)}>
                                    <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                                </a>
                            </td>
                            <td> 
                                <a>
                                    <FontAwesomeIcon icon={faEdit} size="lg" color="green" />
                                </a>
                            </td>
                            </tr> 
                        ))}
                    </table>
                </div>
            </section>
            </section>
        </>

    )
}
import React, { useContext, useEffect, useState, useRef } from 'react';
import Menu from '../../../Components/administrador/header/header';
import { Context } from '../../../Context/CursoContext';
import api from '../../../services/api';
import './PerfilCurso.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { ContextDisciplina } from '../../../Context/DisciplinaContext';





export default function PerfilCurso() {
    const [curso, setCurso] = useState([]);
   
    const { idc } = useContext(Context);
    const { SelecionaDisciplina } = useContext(ContextDisciplina);
 
    const [disciplinasVinculadas, setDisciplinasVinculadas ] = useState([])
    const [ disciplinas, setDisciplinas ] = useState([]);
    const [escolhaDisciplina, setEscolhaDisciplina ] = useState(0);
    const [realoadDisciplinas, setReloadDisciplinas ] = useState(false);
    const [time, setTime ] = useState([]);


    useEffect(() => {
        (async () => {
            const response = await api.get(`cursos/seleciona/${idc}`);
            setCurso(response.data)
       
            const responseDisciplinas = await api.get(`/disciplinas/cursos`);
            setDisciplinas(responseDisciplinas.data)
            const responseDisciplinasVinculadas = await api.get(`/disciplinacurso/${idc}`)
            setDisciplinasVinculadas(responseDisciplinasVinculadas.data);
            
            const time = await api.get('/searchHorario');
            setTime(time.data)

        })();
    }, [idc])


    useEffect(() =>{
        (async() =>{
            const responseDisciplinasVinculadas = await api.get(`/disciplinacurso/${idc}`)
            setDisciplinasVinculadas(responseDisciplinasVinculadas.data);
         
        })();
    }, [realoadDisciplinas])


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
            alert('Excluído com sucesso')
            if(realoadDisciplinas === true ){
                return setReloadDisciplinas(false);
            }
            return setReloadDisciplinas(true)
        } catch (error) {
            alert('error')
        }
    }

    const nomeCurso = useRef(null);
    const duracaoSemestre = useRef(null);
    const periodo = useRef(null);
    const nivelRef = useRef(null);
    const cargaHoraria = useRef(null);

    async function updateCurso(){
        try {
           await api.put(`/cursos/atualizar/dados/${idc}`,{
                nome_curso: nomeCurso.current.value,
                duracao_semestres: duracaoSemestre.current.value,
                periodo: periodo.current.value,
                nivel: nivelRef.current.value,
                carga_horaria: cargaHoraria.current.value
            });
            window.alert("Atualizado Com sucesso")
        } catch (error) {
            console.log(error)
        }
    }

    async function maxLengthCheck (object) {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }

    return (
        <>
            <Menu />
            <div>
                <div className="perfil-instituicao-bg" >

                    <div className="perfil-titulo">

                        <h2>Dados do Curso</h2>
                    </div>
                </div>
                </div>
                <section>
                {curso.map(curso => (
          


                        <div key={curso.id_curso} className="perfil-curso-div-center">


                            <p>Código do Curso: <strong>{curso.id_curso}</strong></p>
                            <p>Nome Curso: </p>
                            <input
                                ref={nomeCurso}
                                className="input-curso-entrada"
                                type="text"
                                defaultValue={curso.nome_curso}
                            />
                            <p>Duração do Curso em Semestre: </p>
                            <input
                                ref={duracaoSemestre}
                                className="input-curso-entrada"
                                type="number"
                                onInput={maxLengthCheck}
                                maxLength={3}
                                defaultValue={curso.duracao_semestres}

                            />
                            <p>Período: </p>
                            <input
                                ref={periodo}
                                className="input-curso-entrada"
                                type="text"
                                defaultValue={curso.periodo}

                            />
                            <p>Nível: </p>
                            <input
                                ref={nivelRef}
                                className="input-curso-entrada"
                                type="text"
                                defaultValue={curso.nivel}
                            />
                            <p>Carga Horária: </p>
                            <select 
                            class="input-curso-entrada"
                            ref={cargaHoraria}
                            > 
                            <option defaultValue={curso.carga_horaria}>{curso.carga_horaria}</option>
                               {time.map(time =>(
                                   <option>{time.horas}</option>
                               ))}   
                          </select>
                        </div>


                
                ))}
         
         
        
            </section>
            <section>
                <div className="option-update-curso-perfil">
                     <div>
                         <a 
                            onClick={updateCurso}
                        >
                             <FontAwesomeIcon icon={faSave} size="3x" color="green" />
                         </a>
                     </div>   
                </div>
            </section>
            <section>
                <div className="linha-separado-instituicao-perfil">
                </div>
                <div className="cadastrar-curso-a-instituicao-titulo">
                        <h1>Vincular Disciplinas</h1>
                </div>
                <div className="input-cadastrar-curso-a-instituicao">
                    <div className="input-cadastrar-curso-a-instituicao-div">
                        <p>Disciplinas:</p>
                        <select
                            className="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value } }) => setEscolhaDisciplina(value)}
                        >
                            <option></option>
                            {disciplinas.map(disciplinas => (
                                <option key={disciplinas.id_disciplina}
                                    value={disciplinas.id_disciplina}>
                                    Código: {disciplinas.id_disciplina} ||
                                                    Nome: {disciplinas.nome_disciplina}

                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="button-cadastrar-curso-a-instituicao-div">
                    <button 
                        onClick={VincularDisciplina}
                        className="button-cadastrar-semestre-env">Cadastrar
                    </button>
                </div>
            </section>  

            <section className="desktop-on-off-perfil-turma">
                <div className="linha-separado-instituicao-perfil">
                </div>
                <div className="list-cursos-all-bg">
                    <table >
                        <tr>
                            <th scope="col">
                                Código
                            </th>
                            <th scope="col">
                                Nome
                            </th>
                            <th scope="col">
                                Carga Horária 
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
                            <td>{disciplinasVinculadas.horas}</td>
                            <td> 
                                <a onClick={() => DesvincularDisciplina(disciplinasVinculadas.id_disciplina)}>
                                    <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                                </a>
                            </td>
                            <td> 
                                <a onClick={() => SelecionaDisciplina(disciplinasVinculadas.id_disciplina)}>
                                    <FontAwesomeIcon icon={faEdit} size="lg" color="green" />
                                </a>
                            </td>
                            </tr> 
                        ))}
                    </table>
                </div>
            </section>

            <section className="mobile-section-on-off-perfil-curso">
            {disciplinasVinculadas.map(disciplinasVinculadas => (
                <div className="div-mobile-perfil-curso"key={disciplinasVinculadas.id_disciplina}>
                    <p>Código: {disciplinasVinculadas.id_disciplina}</p>
                    <p>Nome: {disciplinasVinculadas.nome_disciplina} </p>
                    <p>Carga Horária:{disciplinasVinculadas.horas} </p>
                    <div className="div-mobile-option-perfil-curso">
                        <div>
                            <p>Excluir: </p>
                            <a onClick={() => DesvincularDisciplina(disciplinasVinculadas.id_disciplina)}>
                                    <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                            </a>
                        </div>
                        <div>
                            <p>Visualizar: </p>
                            <a>
                                    <FontAwesomeIcon icon={faEdit} size="lg" color="green" />
                            </a>
                        </div>
                    </div>
                   
                </div>
            ))}
            </section>
        </>

    )
}
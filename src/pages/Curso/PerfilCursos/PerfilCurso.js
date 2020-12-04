import React, { useContext, useEffect, useState, useRef } from 'react';
import Menu from '../../../Components/administrador/header/header';
import { Context } from '../../../Context/CursoContext';
import api from '../../../services/api';
import './PerfilCurso.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';





export default function PerfilCurso() {
    const [curso, setCurso] = useState([]);
   
    const { idc } = useContext(Context);
 
    const [ reload , setReload] = useState(true)
    const [disciplinasVinculadas, setDisciplinasVinculadas ] = useState([])
    const [ disciplinas, setDisciplinas ] = useState([]);
    const [escolhaDisciplina, setEscolhaDisciplina ] = useState(0);
    const [realoadDisciplinas, setReloadDisciplinas ] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await api.get(`cursos/seleciona/${idc}`);
            setCurso(response.data)
       
            const responseDisciplinas = await api.get(`/disciplinas/cursos`);
            setDisciplinas(responseDisciplinas.data)
            const responseDisciplinasVinculadas = await api.get(`/disciplinacurso/${idc}`)
            setDisciplinasVinculadas(responseDisciplinasVinculadas.data);
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
            alert('Deleteado')
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
                            <p>Nome Curso: </p>
                            <input
                                ref={nomeCurso}
                                class="input-styles-IT"
                                type="text"
                                defaultValue={curso.nome_curso}
                            />
                            <p>Duração do Curso em Semestre: </p>
                            <input
                                ref={duracaoSemestre}
                                class="input-styles-IT"
                                type="text"
                                defaultValue={curso.duracao_semestres}

                            />
                            <p>Período: </p>
                            <input
                                ref={periodo}
                                class="input-styles-IT"
                                type="text"
                                defaultValue={curso.periodo}

                            />
                            <p>Nível: </p>
                            <input
                                ref={nivelRef}
                                class="input-styles-IT"
                                type="text"
                                defaultValue={curso.nivel}
                            />
                            <p>Carga Horária: </p>
                            <input
                                ref={cargaHoraria}
                                class="input-styles-IT"
                                type="text"
                                defaultValue={curso.carga_horaria}

                            />
                        </div>


                    </section>
                ))}
         
         
            </div>
            <section>
                <div className="icon-lixeira-perfil">
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
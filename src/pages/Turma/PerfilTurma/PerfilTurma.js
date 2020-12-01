import React, { useEffect, useContext, useState } from 'react';
import Menu from '../../../Components/administrador/header/header';
import { ContextTurma } from '../../../Context/TurmaContext';
import api from '../../../services/api'


export default function PerfilTurma() {

    const { id } = useContext(ContextTurma);
    const [ dadosTurma, setDadosTUrma ] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await api.get(`/turma/seleciona/${id}`)
            setDadosTUrma(response.data)
            console.log(response.data)
        })();

    }, [id])

    return (
        <>
            <Menu />
            <div class="perfil-instituicao-bg" >
                <div class="perfil-titulo">
                    <h2>Dados da Turma</h2>
                </div>
            </div>
            <section>
            {dadosTurma.map(turma => (
                <div  class="perfil-curso-div-center">
                    <p>Código da Turma: </p>
                       <input
                           class="input-styles-IT"
                           type="text"
                           value={turma.id_turma}
                       />
                    <p>Nome da Turma: </p>
                       <input
                           class="input-styles-IT"
                           type="text"
                           defaultValue={turma.nome_turma}
                       />
                    <p>Data Ingresso: </p>
                       <input
                           class="input-styles-IT"
                           type="text"
                            defaultValue={turma.data_ingresso}
                       />
               </div>

            ))}
            </section>
            <div class="linha-separado-instituicao-perfil">
            </div>
            <div class="cadastrar-curso-a-instituicao-titulo">
                    <h1>Alunos Vinculados a Turma</h1>
            </div>

            {/* table */}
            <section>
                <div class="linha-separado-instituicao-perfil">
                </div>
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

                        
                        {/* {turmasVinculadas.map(turmasVinculadas => (
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
                        ))} */}
                    </table>
                </div>
            </section>
        </>
    )
}
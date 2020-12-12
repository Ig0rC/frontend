import React, { useEffect, useContext, useState, useRef } from 'react';
import Menu from '../../../Components/administrador/header/header';
import { ContextTurma } from '../../../Context/TurmaContext';
import api from '../../../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../../Context/AlunoContext';
import './PerfilTurma.css'


export default function PerfilTurma() {

    const { selecionarAluno } = useContext(Context);
    const { id } = useContext(ContextTurma);
    const [ dadosTurma, setDadosTUrma ] = useState([]);
    const [alunos, setAlunos ] = useState([])

    useEffect(() => {
        (async () => {
            const response = await api.get(`/turma/seleciona/${id}`)
            setDadosTUrma(response.data)
            const responseAlunos = await api.get(`/turma/alunos/${id}`)
            setAlunos(responseAlunos.data)
        })();
    }, [id])

    const turmaEnv = useRef(null);
    const data_ingresso = useRef(null);

    async function Atualizar(){
        try {
            const response = await api.put(`/turma/${id}`,{
                nome_turma: turmaEnv.current.value,
                data_ingresso: data_ingresso.current.value
            });
            console.log(response)
            alert("Atualizado")
        } catch (error) {
            alert(error)
        }
    }

    async function excluir(){
        try {
            const resposta =  window.confirm('Tem certeza que quer excluir ?');
            if(resposta === true){
                const response = await api.delete(`/turma/${id}`)
                console.log(response)
                alert("Excluido")
            }
        } catch (error) {
            alert('Ele pertence a alguma Instituição')
        }
    }
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
                            readOnly={turma.id_turma}
                           class="input-perfil-turma"
                           type="text"
                           value={turma.id_turma}
                       />
                    <p>Nome da Turma: </p>
                       <input
                           class="input-perfil-turma"
                           type="text"
                           ref={turmaEnv}
                           defaultValue={turma.nome_turma}
                       />
                    <p>Data Ingresso: </p>
                       <input
                           class="input-perfil-turma"
                           type="text"
                           ref={data_ingresso}
                           defaultValue={turma.data_ingresso}
                       />
               </div>
               

            ))}
            </section>
            <section>
                <div className="icon-lixeira-perfil">
                     <div>
                         <a 
                            onClick={excluir} 
                          >
                             <FontAwesomeIcon icon={faTrash} size="3x" color="red" />
                         </a>
                     </div>
                     <div>
                         <a 
                            onClick={Atualizar}
                        >
                             <FontAwesomeIcon icon={faSave} size="3x" color="green" />
                         </a>
                     </div>   
                </div>
            </section>
            <div class="linha-separado-instituicao-perfil">
            </div>
            <div class="cadastrar-curso-a-instituicao-titulo">
                    <h1>Alunos Vinculados a Turma</h1>
            </div>

            {/* table */}
            <section className="desktop-section-off-on-perfil-turma">
                <div class="linha-separado-instituicao-perfil">
                </div>
                <div class="list-cursos-all-bg">
                    <table >
                        <tr>
                            <th scope="col">
                                Código da Turma
                            </th>
                            <th scope="col">
                                Nome 
                            </th>
                            <th scope="col">
                                E-mail
                            </th>
                            <th scope="col">
                                Telefone
                            </th>
                            <th scope="col">
                                Visualizar
                            </th>
                        </tr>

                        
                       {alunos.map(alunos => (
                            <tr key={alunos.cpf_aluno}>
                            <td>{alunos.cpf_aluno}</td>
                            <td>{alunos.nome}</td>
                            <td>{alunos.email}</td>
                            <td> ({alunos.ddd}){alunos.numero_telefone} </td>
                          
                            <td> 
                                <a onClick={() => selecionarAluno(alunos.cpf_aluno)}>
                                    <FontAwesomeIcon icon={faEdit} size="lg" color="green" />
                                </a>
                            </td>
                            </tr> 
                        ))} 
                    </table>
                </div>
            </section>

            <section className="mobile-section-off-on">
            {alunos.map(alunos => (
                <div className="mobile-div-styles-perfil-turma">
                    <p>CPF: {alunos.cpf_aluno}</p>
                    <p>Nome: {alunos.nome}</p>
                    <p>E-mail: {alunos.email}</p>
                    <p>Telefone: ({alunos.ddd}) {alunos.numero_telefone} </p>
                    <div>
                        <p>Visualizar: </p>
                        <a onClick={() => selecionarAluno(alunos.cpf_aluno)}>
                            <FontAwesomeIcon icon={faEdit} size="lg" color="green" />
                        </a>
                    </div>
                </div>
            ))}
            </section>
        </>
    )
}
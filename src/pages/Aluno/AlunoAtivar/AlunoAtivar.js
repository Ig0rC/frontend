import React, { useEffect , useState } from 'react';
import Menu from '../../../Components/administrador/header/header';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash, faSearch, faUserLock } from '@fortawesome/free-solid-svg-icons';






export default function AlunoAtivar() {

    const [alunos, setAlunos ] = useState([]);
    const [ reload, setReload ] = useState(false);

    useEffect(() =>{
        try {

            if(reload === false){
                setReload(true)
            }else{
                setReload(false)
            }
            (async ()=> {
                const response = await api.get(`/alunos/inativados/${1}`);

                return setAlunos(response.data)
            })();
        } catch (error) {
            console.log(error)
        }
    }, [reload])

    async function ativarAluno(cpf) {
        try {
            const response = await api.put(`/usuarios/${cpf}/true`);
            console.log(response.status)
            alert('deu certo')
        } catch (error) {
            console.log(error)
        }
       
    }
    return(
        <>
            <Menu />
            <div class="flex-list-all-bg">
                    <div class="flex-pesq-list-all">
                            <div class="tamanho-pesq-atributos">
                                <p class="titulo-aluno-list-all">Alunos Inativados</p>
                            </div>
                            <div class="tamanho-pesq-atributos">
                                <input
                                    placeholder="Pesquisar"
                                    class="pesquisa-aluno-list-all" />
                            </div>
                            <div class="tamanho-pesq-atributos">
                                
                            </div>
                    </div>
            </div>
            <div class="list-instituicao-all-bg">
                <table>
                        <tr >
                            <th scope="col">
                                CPF
                            </th>
                            <th scope="col">
                                Nome 
                            </th>
                            <th scope="col">
                                Telefone
                            </th>
                            <th scope="col">
                                Email
                            </th>
                            <th scope="col">
                                Situação
                            </th>
                            <th scope="col">
                                Ativar / Inativar
                            </th>
                            <th scope="col">
                                Editar / Visualizar           
                            </th>
                        </tr>
                        {alunos.map( alunos => (
                            <tr key={alunos.cpf}>
                                <th>{alunos.cpf}</th>
                                <td>{alunos.nome}</td>
                                <td>{alunos.numero_telefone}</td>
                                <td>{alunos.email}</td>
                                <td>{alunos.situacao}</td>
                                <td>
                                    <a onClick={() => ativarAluno(alunos.cpf)}>
                                        <FontAwesomeIcon icon={faUserLock} size="lg" color="green" />
                                    </a>
                                </td>
                                <td>
                                    <a>
                                        <FontAwesomeIcon icon={faSearch} size="lg" color="green" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                </table> 
            </div>
        </>
    )
}
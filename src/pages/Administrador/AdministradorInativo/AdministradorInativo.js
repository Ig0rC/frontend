import React, {useContext, useEffect, useState } from 'react';
import Menu from '../../../Components/administrador/header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash, faSearch, faUserLock } from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api'
import { AdministradorContext  } from '../../../Context/AdministradorPerfilContext';







export default function AdministradorInativo(){

    const { SelecionarAdministrador  } = useContext(AdministradorContext);
    const [ administrador, setAdministrador ] = useState([]);
    const [reload , setReload ] = useState(false);

    
    useEffect(() => {
        (async ()=> {
            const response = await api.get('/administrador');
            setAdministrador(response.data)
            if(reload === false){
                setReload(true)
            }else{
                setReload(false)
            }
        })();
    }, [reload])

    // async function ativar(cpf){}
    const ativar = async (cpf) =>{ 
        await api.put(`/usuarios/${cpf}/true`);
        alert('Ativado com sucesso')
    }
    return(
        <>
            <Menu />
            <div class="flex-list-all-bg">
                <div class="flex-pesq-list-all">
                    <div class="tamanho-pesq-atributos">
                        <p class="titulo-aluno-list-all">Administradores Inativados</p>
                    </div>
                </div>
            </div>
            <div class="list-instituicao-all-bg display-none-desktop">
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
                        {administrador.map( administrador => (
                            <tr>
                                <th key={administrador.cpf}>{administrador.cpf}</th>
                                <td>{administrador.nome}</td>
                                <td>{administrador.numero_telefone}</td>
                                <td>{administrador.email}</td>
                                <td>
                                    {
                                    administrador.situacao === false ? "Inativo" : "Ativo"
                                    }
                                </td>
                                <td>
                                    <a onClick={() => ativar(administrador.cpf)}>
                                        <FontAwesomeIcon icon={faUserLock} size="lg" color="green" />
                                    </a>
                                </td>
                                <td>
                                    <a onClick={() => SelecionarAdministrador(administrador.cpf)}>
                                        <FontAwesomeIcon icon={faSearch} size="lg" color="green" />
                                    </a>
                                </td>
                            </tr>
                        ))} 
                </table> 
            </div>

            <section className="diplay-none-mobile">
                {administrador.map(administrador => (
                    <div className="mobile-table">
                        <div>
                            <p><strong>CPF: </strong>{administrador.cpf}</p>
                        </div>
                        <div>
                            <p><strong>Nome:</strong> {administrador.nome}</p>
                        </div>
                        <div>
                            <p><strong>Telefone:</strong> ({administrador.ddd}) {administrador.numero_telefone}</p>
                        </div>
                        <div>
                            <p><strong>E-mail:</strong> {administrador.email}</p>
                        </div>

                        <div class="editar-instituicao-mobile">
                            <p className="border-none-instituicao">
                                <strong>Editar / Visualizar:  </strong>
                            </p>
                            <a
                                onClick={() => SelecionarAdministrador(administrador.id_disciplina)}>
                                <FontAwesomeIcon size="lg" icon={faEdit} color="#0060EB" />
                            </a>
                        </div>
                    </div>
                ))}

            </section>
          
        
        </>
    )
}
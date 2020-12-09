import React, { useState, useEffect, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header.js';
import api from '../../../services/api';
import { AdministradorContext } from '../../../Context/AdministradorPerfilContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faUserLock } from '@fortawesome/free-solid-svg-icons';



export default function ListaAdministrador() {

    const { SelecionarAdministrador } = useContext(AdministradorContext);

    const [administrador, setAdministrador] = useState([]);

    useEffect(() => {
        (async () => {

            const response = await api.get('/administrador/ativos/buscar');
            setAdministrador(response.data)

        })();
    }, []);


    return (
        <>
            <Menu />
            <div class="flex-list-all-bg">
                <div class="flex-pesq-list-all">
                    <div class="tamanho-pesq-atributos">
                        <p class="titulo-aluno-list-all">Administrador</p>
                    </div>
                </div>
            </div>
            <section className="display-none-desktop">
                <div class="list-instituicao-all-bg ">
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
                                Editar / Visualizar
                            </th>
                        </tr>
                        {administrador.map(administrador => (
                            <tr>
                                <th key={administrador.cpf}>{administrador.cpf}</th>
                                <td>{administrador.nome}</td>
                                <td>({administrador.ddd}) {administrador.numero_telefone}</td>
                                <td>{administrador.email}</td>
                                <td>
                                    <a onClick={() => SelecionarAdministrador(administrador.cpf)}>
                                        <FontAwesomeIcon icon={faSearch} size="lg" color="green" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <div class="bg-footer">
                        <div class="flex-next-prev-list">
                            <button
                                // onClick={prevDisciplina}
                                class="back-button-list-all btn-list-color-voltar">
                                Voltar
                            </button>
                            <button
                                //   onClick={nextDisciplina} 
                                class="back-button-list-all btn-list-color-proximo">
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>

            </section>
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

                <div className="mobile-teste-global">
                    <div class="bg-footer">
                        <div class="flex-next-prev-list">
                            <button
                                // onClick={prevDisciplina}
                                class="back-button-list-all btn-list-color-voltar">
                                Voltar
                        </button>
                            <button
                                //   onClick={nextDisciplina} 
                                class="back-button-list-all btn-list-color-proximo">
                                Próximo
                        </button>
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}
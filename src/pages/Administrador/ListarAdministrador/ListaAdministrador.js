import React, { useState, useEffect, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header.js';
import api from '../../../services/api';
import { AdministradorContext } from '../../../Context/AdministradorPerfilContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash, faSearch, faUserLock } from '@fortawesome/free-solid-svg-icons';



export default function ListaAdministrador () {

    const { SelecionarAdministrador } = useContext(AdministradorContext);

    const [administrador, setAdministrador ] = useState([]);

    useEffect(() =>{
        (async () => {

            const response = await api.get('/administrador/ativos/buscar');
            setAdministrador(response.data)

        })();
    }, []);

 
    return(
        <>
            <Menu />
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
                            Editar / Visualizar           
                        </th>
                    </tr>
                         {administrador.map( administrador => (
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
            </div>
        </>
    )
}
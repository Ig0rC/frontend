import React, { useEffect, useState } from 'react';
import Menu from '../../../Components/administrador/header/header.js'
import api from '../../../services/api'
import './BuscarCurso.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


export default function BuscarCurso(){

    const [ resultado, setResultado ] = useState([]);
    const [page, setPage] = useState(2);
    const cont = 2;



    //  function nextPage(){
    //     if(page ==)
    //      const response = await api.get(`/cursos/${page}`)
    //      setResultado(response.data);
    // }
    useEffect(() => {

        async function BuscarServer(){
            const response = await api.get(`/cursos`)
            setResultado(response.data);

        }

        BuscarServer();
    }, []);

    return(
        <>
        <Menu />
        <div class="list-cursos-all-bg">
        <table >
                    <tr>
                        <th scope="col">
                            Código
                        </th>
                        <th scope="col">
                            Nome Curso
                        </th>
                        <th scope="col">
                            Semestres 
                        </th>
                        <th scope="col">
                            Carga
                        </th>
                        <th scope="col">
                           Editar / Visulizar          
                        </th>
                    </tr>
           
                 {resultado.map(resultado => (
              
                    <tr key={resultado.id_curso}>
                        <td>{resultado.id_curso}</td>
                        <td>{resultado.nome_curso}</td>
                        <td>{resultado.duracao_semestres}</td>
                        <td>{resultado.carga_horaria}</td>
                        <td><FontAwesomeIcon icon={faEdit} color="#0060EB" /></td>
                    </tr>
       
                ))} 
                  </table> 
        </div>
        <div class="bg-footer">
                    
                    <div class="flex-next-prev-list">
                        <button class="back-button-list-all btn-list-color-voltar">
                            Voltar
                        </button>
                        <button class="back-button-list-all btn-list-color-proximo">
                            Próximo
                        </button>
                    </div>
            </div>


        </>
    )
}
import React, { useEffect, useState } from 'react';
import Menu from '../../../Components/administrador/header/header.js';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'







export default function ListarAlunos(){

    const [ alunos, setAlunos ] = useState([]);
    const [ count , setCount ] = useState(0);
    const [page , setPage ] = useState(1);
    const [totalPage, setTotalPage ] = useState(0)


    useEffect(() => {
        let paginacao = count / 5;
        let decidir = count % 2 === 0;
        if(decidir === false ){
            let save = paginacao + 1
            paginacao = Math.round(save);
            setTotalPage(paginacao)
        }else{
            setTotalPage(paginacao)
        }
    }, [count])


    async function nextPage(){
        console.log(totalPage)
        console.log('entrou')
        if(page < totalPage){
            console.log('entrou next')
            let next = await page + 1;
            setPage(next);
            const {data} = await api.get(`/alunos/${next}`);
            setAlunos(data)
        }else if(page === totalPage){
            alert('ja chegou')
        }
      
    }

    useEffect(() => {
        async function BuscarAlunos(){
            const { data, headers} = await api.get(`/alunos/${1}`);
            setCount(headers.count)
            setAlunos(data)
        }
        BuscarAlunos();

    }, []);


    
    return(
        <>
        <Menu />
        <div class="flex-list-all-bg">
                    <div class="flex-pesq-list-all">
                            <div class="tamanho-pesq-atributos">
                                <p class="titulo-aluno-list-all">Curso</p>
                            </div>
                            <div class="tamanho-pesq-atributos">
                                <input
                                    placeholder="Pesquisar"
                                    class="pesquisa-aluno-list-all" />
                            </div>
                            <div class="tamanho-pesq-atributos">
                                <button class="back-button-list-all btn-list-color-proximo">
                                        Próximo
                                    </button>
                            </div>
                    </div>
        </div>
        <div class="list-instituicao-all-bg">
        <table >
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


                    {alunos.map(alunos =>(
                        <tr>
                            <th>{alunos.cpf}</th>
                            <td>{alunos.nome}</td>
                            <td>{alunos.numero_telefone}</td>
                            <td>{alunos.email}</td>
                            <td><FontAwesomeIcon icon={faEdit} color="#0060EB" /></td>
                        </tr>
                    ))}

                  </table> 
        </div>
       
                  <div class="bg-footer">
                    
                    <div class="flex-next-prev-list">
                        <button 
                            //  onClick={() =>PrevInstituicao()}
                            class="back-button-list-all btn-list-color-voltar">
                            Voltar
                        </button>
                        <button onClick={nextPage}
                        class="back-button-list-all btn-list-color-proximo">
                            Próximo
                        </button>
                    </div>
            </div>
        </>
    )
}
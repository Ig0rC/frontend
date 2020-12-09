import React, { useEffect, useState, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header.js';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../../Context/AlunoContext';








export default function ListarAlunos(){

    const { selecionarAluno } = useContext(Context);

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

    async function prevPage(){
        if(page === 1){
          return  alert('inicio')
        }
        else{
            let prev = await page - 1;
            setPage(prev);
            const {data} = await api.get(`/alunos/${prev}`);
            setAlunos(data)
        }

    }

    useEffect(() => {
        async function BuscarAlunos(){
            const { data, headers} = await api.get(`/alunos/${1}`);
            setCount(headers.count)
            setAlunos(data)
            console.log(data)
        }
        BuscarAlunos();

    }, []);


    
    return(
        <>
        <Menu />
        <div class="flex-list-all-bg">
                    <div class="flex-pesq-list-all">
                            <div class="tamanho-pesq-atributos">
                                <p class="titulo-aluno-list-all">Alunos</p>
                            </div>
                    </div>
        </div>
        <section class=" display-none-desktop">
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
                                <td>
                                    <a onClick={() => selecionarAluno(alunos.cpf)}>
                                        <FontAwesomeIcon icon={faEdit} color="#0060EB" />
                                    </a>
                                </td>
                            </tr>
                        ))}

                    </table> 
                    <div class="bg-footer">
                    
                    <div class="flex-next-prev-list">
                        <button 
                            onClick={prevPage}
                            class="back-button-list-all btn-list-color-voltar">
                            Voltar
                        </button>
                        <button onClick={nextPage}
                        class="back-button-list-all btn-list-color-proximo">
                            Próximo
                        </button>
                    </div>
            </div>
            </div>
        </section>


        <section className="diplay-none-mobile">
            {alunos.map(alunos => (
                <div  className="mobile-table">
                    <div>
                        <p><strong>Código: </strong>{alunos.cpf}</p>
                    </div>
                    <div>
                        <p><strong>Nome Instituição:</strong> {alunos.nome}</p>
                    </div>
                    <div>
                        <p><strong>Unidade:</strong> {alunos.numero_telefone}</p>
                    </div>
                    <div>
                        <p><strong>Unidade:</strong> {alunos.email}</p>
                    </div>
                    <div class="editar-instituicao-mobile">
                        <p className="border-none-instituicao">
                            <strong>Editar / Visualizar:  </strong>
                        </p>
                        <a
                           onClick={() => selecionarAluno(alunos.cpf)}>
                           <FontAwesomeIcon size="lg" icon={faEdit} color="#0060EB" />
                        </a> 
                    </div>
                </div>
            ))}

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
            </section>
        </>
    )
}
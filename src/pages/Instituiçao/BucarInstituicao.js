import React, { useEffect, useState } from 'react';
import Menu from '../../Components/administrador/header/header.js';
import Container from '../../Components/ContainerList/containerlist.js';
import './BuscarInstituicao.css';
import api from '../../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'



export default function BuscarInstituicoes() {
    const [ i, setI] = useState(0);
    const [instituicao, setInstituicao] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage ] = useState();
    const [teste, setTeste ] = useState([]);

    useEffect(() => {

        async function BuscarAll() {
            
            const response = await api.get(`/instituicao/${1}`)
            setInstituicao(response.data)
            setTotalPage(response.headers.count);
        
        
        };

        BuscarAll();
   
        
    }, []);

    useEffect(() => {
        let paginacao = totalPage / 5;
        let Numeracao = totalPage %  5 === 0;
        if(Numeracao === false){
            let salve = paginacao + 1
            paginacao = Math.round(salve)
        } 
        setI(paginacao)

    }, [totalPage])
    console.log(instituicao)
    async function nextInstituicao(){
        console.log(i, 'next')
        if(page < i) {
                let next = await page + 1;
                setPage(next);
                const response = await api.get(`/instituicao/${next}`)
                setInstituicao(response.data)
        }else if(page === i){
            alert('Já Chegou no Final')
        }
    }
    
    async function PrevInstituicao(){
       console.log(page)
       if(page === 1){
           return alert('inicio')
       }else{
           let prev = await page - 1;
           setPage(prev);
           const response = await api.get(`/instituicao/${prev}`)
           setInstituicao(response.data)
       }
    }
   



    return (
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
                            Código
                        </th>
                        <th scope="col">
                            Nome Instituição 
                        </th>
                        <th scope="col">
                           Unidade
                        </th>
                        <th scope="col">
                            Responsável
                        </th>
                        <th scope="col">
                            Editar / Visualizar           
                        </th>
                    </tr>


                    {instituicao.map(instituicao =>(
                        <tr>
                            <th>{instituicao.id_instituicao}</th>
                            <td>{instituicao.nome}</td>
                            <td>{instituicao.unidade}</td>
                            <td>{instituicao.responsavel}</td>
                            <td><FontAwesomeIcon icon={faEdit} color="#0060EB" /></td>
                        </tr>


                    ))}
           

                  </table> 
        </div>
       
                  <div class="bg-footer">
                    
                    <div class="flex-next-prev-list">
                        <button 
                             onClick={() =>PrevInstituicao()}
                            class="back-button-list-all btn-list-color-voltar">
                            Voltar
                        </button>
                        <button onClick={() => nextInstituicao()}
                        class="back-button-list-all btn-list-color-proximo">
                            Próximo
                        </button>
                    </div>
            </div>



        </>
    );
}
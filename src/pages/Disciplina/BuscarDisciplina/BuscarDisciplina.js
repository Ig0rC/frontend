import React, { useEffect, useState, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header';
import api from '../../../services/api';
import './BuscarDisciplina.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../../Context/DisciplinaContext';



export default function BuscarDisciplinas(){


    const { SelecionaDisciplina, id } = useContext(Context)

    const [ i, setI] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage ] = useState();

    useEffect(() => {
        let paginacao = totalPage / 16;
        let Numeracao = totalPage %  16 === 0;
        if(Numeracao === false){
            let salve = paginacao + 1
            paginacao = Math.round(salve)
        } 
        setI(paginacao)

    }, [totalPage])
 

    const [disciplina, setDisciplina] = useState([])
    
    useEffect(() =>{
        (async () =>{
            const {data , headers} = await api.get(`/disciplina/${1}`)
            setTotalPage(headers.count)
            console.log(headers.count)
            setDisciplina(data)
        })()
    
        
    }, [])

    async function nextDisciplina(){
        console.debug('page', page)
        console.debug('i', i)
        if(page < i) {
                let next = await page + 1;
                setPage(next);
                const { data } = await api.get(`/disciplina/${next}`)
                setDisciplina(data);
        }else if(page === i){
            alert('Já Chegou no Final')
        }
    }

    async function prevDisciplina(){
        if(page === 1) {
                return alert('Inicio')
        }else{
           let prev = await page - 1
           setPage(prev)
           const { data } = await api.get(`disciplina/${prev}`)
           setDisciplina(data)
        }
    }


    return (
        <>
            <Menu />
            <div class="flex-list-all-bg">
                    <div class="flex-pesq-list-all">
                            <div class="tamanho-pesq-atributos">
                                <p class="titulo-aluno-list-all">Disciplinas</p>
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
        <div class="list-cursos-all-bg">
        <table >
                    <tr >
                        <th scope="col">
                            Código
                        </th>
                        <th scope="col">
                            Nome Disciplina
                        </th>
                        <th scope="col">
                            Hórario aula
                        </th>
                        <th scope="col">
                            Data
                        </th>
                        <th scope="col">
                            Horas           
                        </th>
                        <th scope="col">
                            Editar / Visualizar           
                        </th>
                    </tr>


                     {disciplina.map(disciplina =>(
                        <tr>
                            <th>{disciplina.id_disciplina}</th>
                            <td>{disciplina.nome_disciplina}</td>
                            <td>{disciplina.horario_aula}</td>
                            <td>{disciplina.data}</td>
                            <td>{disciplina.horas}</td>
                            <td>
                                <a onClick={() => SelecionaDisciplina(disciplina.id_disciplina)}>
                                    <FontAwesomeIcon icon={faEdit} color="#0060EB" />
                                </a>
                            </td>
                        </tr>


                    ))} 
           

                  </table> 
               
        </div>
        <div class="bg-footer">
                    
                    <div class="flex-next-prev-list">
                        <button 
                            onClick={prevDisciplina}
                            class="back-button-list-all btn-list-color-voltar">
                            Voltar
                        </button>
                         <button 
                          onClick={nextDisciplina} 
                        class="back-button-list-all btn-list-color-proximo">
                            Próximo
                        </button>
                    </div>
        </div>
        </>
    )
}
import React, { useEffect , useState } from 'react';
import Menu from '../../../Components/administrador/header/header';
import api from '../../../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash, faSearch, faUserLock } from '@fortawesome/free-solid-svg-icons';


export default function AtivarProfessor(){

    const [ professorInativados, setProfessoresInativados ] = useState([]);
    const [ reload, setReload ] = useState(false);
    const [ totalPage, setTotalPage ] = useState(false);
    const [indice, setIndice ] = useState(0);
    const [page, setPage ] = useState(1);
    
    useEffect(() =>{
        (async () =>{
            const { data, headers } = await api.get(`/professor/inativados/${page}`);
            setProfessoresInativados(data)
            setTotalPage(headers.count)
            console.log(data)
        })();
    }, [reload])

    useEffect(() =>{
        let paginacao = totalPage / 5;
        let save = totalPage % 5 === 0;
        if(save === false){
            paginacao+= paginacao
            paginacao = Math.round(paginacao)
        }
        setIndice(paginacao)
        console.log('ok', paginacao)
    }, [totalPage])


    async function AtivarProfessor(id){
        try {
            await api.put(`/usuarios/${id}/true`)
            alert('liberado');
            if(reload === false){
                return setReload(true)
            }
            return setReload(false)
        } catch (error) {
            alert('error')
        }
    }


    async function nextPage(){
        if( page < indice ){
            let next = await page + 1;
            setPage(next)
            const { data } = await api.get(`/professor/inativados/${next}`);
            setProfessoresInativados(data) 
        }
        else if(page === indice){
            alert('fim')
        }
    }
    async function prevPage(){
        console.log('page', page)
        if(page === 1){
            return alert('inicio')
        }
        let prev = await page - 1;
        await setPage(prev)
        const { data } = await api.get(`/professor/inativados/${prev}`);
        setProfessoresInativados(data) 
    }

    return(
        <>
            <Menu />
            <div class="flex-list-all-bg">
                    <div class="flex-pesq-list-all">
                            <div class="tamanho-pesq-atributos">
                                <p class="titulo-aluno-list-all">Professores Inativados</p>
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
                         {professorInativados.map( professor => (
                            <tr>
                                <th key={professor.cpf}>{professor.cpf}</th>
                                <td>{professor.nome}</td>
                                <td>{professor.numero_telefone}</td>
                                <td>{professor.email}</td>
                                <td>{professor.situacao}</td>
                                <td>
                                    <a 
                                        onClick={() => AtivarProfessor(professor.cpf)}
                                    >
                                        <FontAwesomeIcon icon={faUserLock} size="lg" color="green" />
                                    </a>
                                </td>
                                <td>
                                    <a 
                                        // onClick={() => selecionarAluno(professor.cpf)}
                                    >
                                        <FontAwesomeIcon icon={faSearch} size="lg" color="green" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                </table> 
            </div>
            
            <div class="bg-footer">
                    
                    <div class="flex-next-prev-list">
                        <button 
                            onClick={prevPage}
                            class="back-button-list-all btn-list-color-voltar">
                            Voltar
                        </button>
                        <button 
                            onClick={nextPage}
                        class="back-button-list-all btn-list-color-proximo">
                            Próximo
                        </button>
                    </div>
            </div>
        </>
    )
}
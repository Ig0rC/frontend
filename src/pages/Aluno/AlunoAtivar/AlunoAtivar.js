import React, { useEffect , useState, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash, faSearch, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../../Context/AlunoContext';






export default function AlunoAtivar() {

    const { selecionarAluno } = useContext(Context);

    const [ totalPage, setTotalPage  ] = useState(0);
    const [alunos, setAlunos ] = useState([]);
    const [ reload, setReload ] = useState(false);
    const [ indice, setIndicie ] = useState(0);
    const [page, setPage ] = useState(1);

    useEffect(() =>{
        try {
            (async ()=> {
                const response = await api.get(`/alunos/inativados/${1}`);
                setTotalPage(response.headers.count)
                console.debug('totalPage', response.headers.count)
                setAlunos(response.data)
            })();
        } catch (error) {
            console.log(error)
        }
    }, [reload])

    useEffect( () => {
        let paginacao = totalPage / 5;
        let numeracao = totalPage % 5 === 0;
        if(numeracao === false){
            let save = paginacao + 1
            paginacao = Math.round(save)
        }
        setIndicie(paginacao)
    }, [totalPage]);


    async function nextPage(){
        console.log(page, indice)
        if(page < indice){
            console.log('entrou')
            let next = await page + 1;
            setPage(next)
            const { data } = await api.get(`/alunos/inativados/${next}`);
            setAlunos(data)
        }
        else if(page === 1)
        {
            alert('fim')
        }
    }
    async function prevPage(){
        if(page === 1){
            alert('ínicio')
        }
        else{
            let prev = await page - 1
            setPage(prev);
            const { data  } = await api.get(`/alunos/inativados/${prev}`);
            setAlunos(data)
        }
    }


    async function ativarAluno(cpf) {
        try {
            if(reload === false){
                setReload(true)
            }else{
                setReload(false)
            }
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
                            <tr>
                                <th key={alunos.cpf}>{alunos.cpf}</th>
                                <td>{alunos.nome}</td>
                                <td>{alunos.numero_telefone}</td>
                                <td>{alunos.email}</td>
                                <td>
                                    {
                                    alunos.situacao === false ? "Inativo" : "Ativo"
                                    }
                                </td>
                                <td>
                                    <a onClick={() => ativarAluno(alunos.cpf)}>
                                        <FontAwesomeIcon icon={faUserLock} size="lg" color="green" />
                                    </a>
                                </td>
                                <td>
                                    <a onClick={() => selecionarAluno(alunos.cpf)}>
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
                        <button onClick={nextPage}
                        class="back-button-list-all btn-list-color-proximo">
                            Próximo
                        </button>
                    </div>
            </div>
        </>
    )
}
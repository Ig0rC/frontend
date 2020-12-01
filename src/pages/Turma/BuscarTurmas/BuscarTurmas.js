import React, { useEffect, useState, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header';
import './BuscarTurmas.css';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ContextTurma } from '../../../Context/TurmaContext';




export default function BuscarTurmas() {
    const [i, setI] = useState(0);
    const [turmas, setTurmas] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [ pesq, setPesq] = useState('');
    const { SelecionaTurma } = useContext(ContextTurma)

    useEffect(() => {
        async function BuscarAll() {

            const response = await api.get(`/turma/${1}`)

            setTurmas(response.data)
            setTotalPage(response.headers.count);

        };
        BuscarAll();


    }, []);

    useEffect(() => {
        (async () => {
            const response = await api.get(`/turma/${1}`,{
                pesq: pesq 
            })
            setTurmas(response.data)
        })();
    }, [pesq])

    // useEffect(() => {
    //     let paginacao = totalPage / 5;
    //     let Numeracao = totalPage % 5 === 0;
    //     if (Numeracao === false) {
    //         let salve = paginacao + 1
    //         paginacao = Math.round(salve)
    //     }
    //     setI(paginacao)

    // }, [totalPage])


    async function nextTurma() {
        console.log(i, 'next')
        if (page < i) {
            let next = await page + 1;
            setPage(next);
            const response = await api.get(`/turma/${1}`)
            setTurmas(response.data)
        } else if (page === i) {
            alert('Já Chegou no Final')
        }
    }

    // async function PrevInstituicao(){
    //    console.log(page)
    //    if(page === 1){
    //        return alert('inicio')
    //    }else{
    //        let prev = await page - 1;
    //        setPage(prev);
    //        const response = await api.get(`/instituicao/${prev}`)
    //        setInstituicao(response.data)
    //    }
    // }
    return (
        <>
            <Menu />
            <div class="flex-list-all-bg">
                <div class="flex-pesq-list-all">
                    <div class="tamanho-pesq-atributos">
                        <p class="titulo-aluno-list-all">Turmas</p>
                    </div>
                    <div class="tamanho-pesq-atributos">
                        <input
                            // onChange={ ({ target: { value }}) => setPesq(value)}
                            placeholder="Pesquisar"
                            class="pesquisa-aluno-list-all" />
                    </div>
                    <div class="tamanho-pesq-atributos">
                    </div>
                </div>
            </div>
            <div class="list-instituicao-all-bg">
                <table >
                    <tr >
                        <th scope="col">
                            Código turma
                        </th>
                        <th scope="col">
                            Nome Turma
                        </th>
                        <th scope="col">
                            Data Ingresso
                        </th>
                        <th scope="col">
                            Editar / Visualizar
                        </th>
                    </tr>

                    {turmas.map(turmas => (
                        <tr>
                            <th>{turmas.id_turma}</th>
                            <td>{turmas.nome_turma}</td>
                            <td>{turmas.data_ingresso}</td>
                            <td>
                            <a onClick={() => SelecionaTurma(turmas.id_turma)} >
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
                        class="back-button-list-all btn-list-color-voltar">
                        Voltar
                    </button>
                    <button
                        class="back-button-list-all btn-list-color-proximo">
                        Próximo
                    </button>
                </div>
            </div>

        </>
    );
}
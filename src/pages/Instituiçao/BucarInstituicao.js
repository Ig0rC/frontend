import React, { useEffect, useState, useContext } from 'react';
import Menu from '../../Components/administrador/header/header.js';
import Container from '../../Components/ContainerList/containerlist.js';
import './BuscarInstituicao.css';
import { ContextInstituicao } from '../../Context/InstituicaoContext'
import api from '../../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'



export default function BuscarInstituicoes() {

    const { SaveID, id } = useContext(ContextInstituicao)

    const [i, setI] = useState(0);
    const [instituicao, setInstituicao] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [ pesq, setPesq ] = useState('');



    useEffect(() => {

        async function BuscarAll() {
            const response = await api.get(`/instituicao/${1}/null`)
            setInstituicao(response.data)
            setTotalPage(response.headers.count);


        };

        BuscarAll();


    }, []);
    console.log(pesq)
    useEffect(() => {
        (async () => {
            const response = await api.get(`/instituicao/${1}/${pesq}`)

            await setInstituicao(response.data)
            console.log(response.data)
        })();
     
    }, [pesq])

    useEffect(() => {
        let paginacao = totalPage / 5;
        let Numeracao = totalPage % 5 === 0;
        if (Numeracao === false) {
            let salve = paginacao + 1
            paginacao = Math.round(salve)
        }
        setI(paginacao)

    }, [totalPage])
    async function nextInstituicao() {
        console.log(i, 'next')
        if (page < i) {
            let next = await page + 1;
            setPage(next);
            const response = await api.get(`/instituicao/${next}`)
            setInstituicao(response.data)
        } else if (page === i) {
            alert('Já Chegou no Final')
        }
    }

    async function PrevInstituicao() {
        console.log(page)
        if (page === 1) {
            return alert('inicio')
        } else {
            let prev = await page - 1;
            setPage(prev);
            const response = await api.get(`/instituicao/${prev}`)
            setInstituicao(response.data)
        }
    }




    return (
        <>
            <Menu />
            <div className="flex-list-all-bg">
                <div className="flex-pesq-list-all">
                    <div className="tamanho-pesq-atributos">
                        <p className="titulo-aluno-list-all">Instituições</p>
                    </div>
                </div>
            </div>
            <div className="list-instituicao-all-bg">
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


                    {instituicao.map(instituicao => (
                        <tr>
                            <th>{instituicao.id_instituicao}</th>
                            <td>{instituicao.nome_instituicao}</td>
                            <td>{instituicao.unidade}</td>
                            <td>{instituicao.responsavel}</td>
                            <td>
                                <a
                                    onClick={() => SaveID(instituicao.id_instituicao)}>
                                    <FontAwesomeIcon icon={faEdit} color="#0060EB" />
                                </a>
                            </td>
                        </tr>


                    ))}


                </table>
            </div>

            <div className="bg-footer">

                <div className="flex-next-prev-list">
                    <button
                        onClick={() => PrevInstituicao()}
                        className="back-button-list-all btn-list-color-voltar">
                        Voltar
                        </button>
                    <button onClick={() => nextInstituicao()}
                        className="back-button-list-all btn-list-color-proximo">
                        Próximo
                        </button>
                </div>
            </div>



        </>
    );
}
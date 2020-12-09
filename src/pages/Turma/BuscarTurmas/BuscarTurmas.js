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
    const { SelecionaTurma } = useContext(ContextTurma)

    useEffect(() => {
        async function BuscarAll() {

            const response = await api.get(`/turma/${1}`)

            setTurmas(response.data)
            setTotalPage(response.headers.count);
            console.debug('total', response.headers.count)

        };
        BuscarAll();


    }, []);

    useEffect(() => {
        let paginacao = totalPage / 5;
        let Numeracao = totalPage % 5 === 0;
        if (Numeracao === false) {
            let salve = paginacao + 1
            paginacao = Math.round(salve)
        }
        setI(paginacao)

    }, [totalPage])


    async function nextTurma() {
        console.log(i, 'next')
        if (page < i) {
            let next = await page + 1;
            setPage(next);
            const response = await api.get(`/turma/${next}`)
            setTurmas(response.data)
        } else if (page === i) {
            alert('Já Chegou no Final')
        }
    }

    async function prevTurma() {
        if (page === 1) {
            return alert('inicio')
        } else {
            let prev = await page - 1;
            setPage(prev);
            const response = await api.get(`/turma/${prev}`)
            setTurmas(response.data)
        }
    }

    return (
        <>
            <Menu />
            <div class="flex-list-all-bg">
                <div class="flex-pesq-list-all">
                    <div class="tamanho-pesq-atributos">
                        <p class="titulo-aluno-list-all">Turmas</p>
                    </div>
                </div>
            </div>
            <div class="list-instituicao-all-bg display-none-desktop">
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
                <div class="bg-footer">
                    <div class="flex-next-prev-list">
                        <button
                            onClick={prevTurma}
                            class="back-button-list-all btn-list-color-voltar">
                            Voltar
                    </button>
                        <button
                            onClick={nextTurma}
                            class="back-button-list-all btn-list-color-proximo">
                            Próximo
                    </button>
                    </div>
                </div>
            </div>

            <section className="diplay-none-mobile">
                {turmas.map(turmas => (
                    <div className="mobile-table">
                        <div>
                            <p><strong>Código: </strong>{turmas.id_turma}</p>
                        </div>
                        <div>
                            <p><strong>Nome Instituição:</strong> {turmas.nome_turma}</p>
                        </div>
                        <div>
                            <p><strong>Unidade:</strong> {turmas.data_ingresso}</p>
                        </div>
                        <div class="editar-instituicao-mobile">
                            <p className="border-none-instituicao">
                                <strong>Editar / Visualizar:  </strong>
                            </p>
                            <a
                                onClick={() => SelecionaTurma(turmas.id_turmaid_turma)}>
                                <FontAwesomeIcon icon={faEdit} size="lg" color="#0060EB" />
                            </a>
                        </div>
                    </div>
                ))}
                <div class="bg-footer">
                    <div class="flex-next-prev-list">
                        <button
                            onClick={prevTurma}
                            class="back-button-list-all btn-list-color-voltar">
                            Voltar
                    </button>
                        <button
                            onClick={nextTurma}
                            class="back-button-list-all btn-list-color-proximo">
                            Próximo
                    </button>
                    </div>
                </div>

            </section>



        </>
    );
}
import React, { useContext, useEffect, useState } from 'react';
import Menu from '../../../Components/administrador/header/header.js'
import api from '../../../services/api';
import './BuscarCurso.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../../Context/CursoContext'


export default function BuscarCurso() {


    const { perfilCursoIdc } = useContext(Context);


    const [resultado, setResultado] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [next, setNext] = useState(0);



    async function nextPage() {
        console.debug('next', next)
        if (page < next) {
            let next = await page + 1;
            setPage(next);
            const response = await api.get(`/cursos/${next}`);
            setResultado(response.data)

        } else if (page === next) {
            alert('fim')
        }

    }
    async function prevPage() {
        if (page === 1) {
            alert('esta no começo')
        } else {
            let prev = await page - 1;
            setPage(prev)
            const response = await api.get(`/cursos/${prev}`);
            setResultado(response.data)
        }
    }
    useEffect(() => {
        let paginacao = count / 5;
        let logica = count % 2 === 0;
        if (logica === false) {
            let arrendodamento = paginacao + 1
            paginacao = Math.round(arrendodamento);

        }
        setNext(paginacao)
    }, [count]);



    useEffect(() => {

        async function BuscarServer() {
            const response = await api.get(`/cursos/${1}`)
            setResultado(response.data);
            setCount(response.headers.count)

        }

        BuscarServer();
    }, []);

    return (
        <>
            <Menu />
            <div class="flex-list-all-bg">
                <div class="flex-pesq-list-all">
                    <div class="tamanho-pesq-atributos">
                        <p class="titulo-aluno-list-all">Cursos</p>
                    </div>
                </div>
            </div>
            <section className="display-none-desktop">

                <div class="list-instituicao-all-bg ">
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
                                <td>
                                    <a onClick={() => perfilCursoIdc(resultado.id_curso)}>
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
                            <button
                                onClick={nextPage}
                                class="back-button-list-all btn-list-color-proximo">
                                Próximo
                    </button>
                        </div>
                    </div>
                </div>
            </section>


            <section className="diplay-none-mobile">
                {resultado.map(resultado => (
                    <div className="mobile-table">
                        <div>
                            <p><strong>Código: </strong>{resultado.id_curso}</p>
                        </div>
                        <div>
                            <p><strong>Nome Curso:</strong> {resultado.nome_curso}</p>
                        </div>
                        <div>
                            <p><strong>Semestres:</strong>{resultado.duracao_semestres}</p>
                        </div>
                        <div>
                            <p><strong>Carga:</strong>{resultado.carga_horaria}</p>
                        </div>
                        <div class="editar-instituicao-mobile">
                            <p className="border-none-instituicao">
                                <strong>Editar / Visualizar:  </strong>
                            </p>
                            <a
                                onClick={() => perfilCursoIdc(resultado.id_curso)}>
                                <FontAwesomeIcon icon={faEdit} color="#0060EB" />
                            </a>
                        </div>
                    </div>
                ))}

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


            </section>



        </>
    )
}
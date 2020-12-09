import React, { useState, useEffect, useContext } from 'react';
import api from '../../../services/api';
import Menu from '../../../Components/administrador/header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../../Context/ProfessorContext'







export default function BuscarProfessores() {

    const { SelecionarProfessor } = useContext(Context)
    const [professores, setProfessores] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [indice, setIndice] = useState(0);
    const [page, setPage] = useState(1);



    useEffect(() => {
        (async () => {
            const { data, headers } = await api.get(`/professor/${1}`);
            setProfessores(data);
            setTotalPage(headers.count)
        })();
    }, []);

    useEffect(() => {
        let paginacao = totalPage / 5;
        let navegacao = totalPage % 2 === 0
        if (navegacao === false) {
            paginacao = paginacao + 1
            paginacao = Math.round(paginacao)
        }
        setIndice(paginacao)
        console.log('pag', paginacao)
    }, [totalPage]);


    async function nextPage() {
        console.log('ok')
        if (page < indice) {
            let next = page + 1;
            await setPage(next);
            const { data } = await api.get(`/professor/${next}`);
            setProfessores(data);
        } else if (indice === page) {
            alert('fim')
        }
    }
    async function prevPage() {
        if (page === 1) {
            return alert('Ínicio')
        }
        let prev = page - 1;
        await setPage(prev);
        const { data } = await api.get(`/professor/${prev}`);
        return setProfessores(data);
    }
    return (
        <>
            <Menu />

            <div className="flex-list-all-bg">
                <div className="flex-pesq-list-all">
                    <div className="tamanho-pesq-atributos">
                        <p className="titulo-aluno-list-all">Professores</p>
                    </div>
                </div>
            </div>

            <section className="display-none-desktop">
                <div className="list-instituicao-all-bg">
                    <table >
                        <tr >
                            <th scope="col">
                                Código
                        </th>
                            <th scope="col">
                                Nome
                        </th>
                            <th scope="col">
                                Nome Social
                        </th>
                            <th scope="col">
                                Número Telefone
                        </th>
                            <th scope="col">
                                Editar / Visualizar
                        </th>
                        </tr>


                        {professores.map(professores => (
                            <tr>
                                <th>{professores.cpf}</th>
                                <td>{professores.nome}</td>
                                <td>{professores.nome_social}</td>
                                <td>({professores.ddd}){professores.numero_telefone}</td>
                                <td>
                                    <a
                                        onClick={() => SelecionarProfessor(professores.cpf)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} color="#0060EB" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <div className="bg-footer">
                    <div className="flex-next-prev-list">
                        <button
                            onClick={() => prevPage()}
                            className="back-button-list-all btn-list-color-voltar">
                            Voltar
                        </button>
                        <button
                            onClick={() => nextPage()}
                            className="back-button-list-all btn-list-color-proximo">
                            Próximo
                        </button>
                    </div>
                </div>
                </div>
            </section>




            <section className="diplay-none-mobile">
                {professores.map(professores => (
                    <div className="mobile-table">
                        <div>
                            <p><strong>Código: </strong>{professores.cpf}</p>
                        </div>
                        <div>
                            <p><strong>Nome:</strong> {professores.nome}</p>
                        </div>
                        <div>
                            <p><strong>E-mail:</strong>{professores.email}</p>
                        </div>
                        <div>
                            <p><strong>Telefone:</strong> ({professores.ddd}){professores.numero_telefone}</p>
                        </div>

                        <div class="editar-instituicao-mobile">
                            <p className="border-none-instituicao">
                                <strong>Editar / Visualizar:  </strong>
                            </p>
                            <a
                                onClick={() => SelecionarProfessor(professores.cpf)}>
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
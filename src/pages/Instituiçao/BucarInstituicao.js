import React, { useEffect, useState } from 'react';
import Menu from '../../Components/administrador/header/header.js';
import Container from '../../Components/ContainerList/containerlist.js';
import './BuscarInstituicao.css';
import api from '../../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'



export default function BuscarInstituicoes() {
    const [instituicao, setInstituicao] = useState([]);

    useEffect(() => {

        async function BuscarAll() {
            const response = await api.get('/instituicao');
            setInstituicao(response.data)

          

        };

        BuscarAll();

    }, [])

    console.log(instituicao)
    return (
        <>
            <Menu />
        <div class="flex-list-all-bg">
            <div class="flex-pesq-list-all">
                <div class="tamanho-pesq-atributos">
                    <p class="titulo-aluno-list-all">Instituicoes</p>
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


                <div class="perfil-aluno-list-all">
                    <div class="columns-titulos-instituicao">
                        <div class="container-coluna-width-definido">
                            <p>
                                Código
                            </p>
                        </div>
                        <div class="container-coluna-width-definido">
                            <p>
                                Nome
                            </p>
                        </div>
                        <div class="container-coluna-width-definido">
                            <p>
                                Responsável
                            </p>
                        </div>
                        <div class="container-coluna-width-definido">
                            <p>
                                Telefone
                            </p>
                        </div>
                        <div class="container-coluna-width-definido">
                            <p>
                                Editar / Visualizar
                            </p>
                        </div>
                    </div>
                    {instituicao.map(instituicao => (
                        <div key={instituicao.id} class="columns-titulos-instituicao">
                            <div class="container-coluna-width-definido margin-list-instituicao">
                                <p>
                                    {instituicao.id_instituicao}
                                </p>
                            </div>
                            <div class="container-coluna-width-definido margin-list-instituicao">
                                <p>
                                    {instituicao.nome}

                                </p>
                            </div>
                            <div class="container-coluna-width-definido margin-list-instituicao">
                                <p>
                                    {instituicao.responsavel}
                                </p>
                            </div>
                            <div class="container-coluna-width-definido margin-list-instituicao">
                                <p>
                                    {instituicao.unidade}
                                </p>
                            </div>
                            <div class="container-coluna-width-definido">

                                <FontAwesomeIcon icon={faEdit} color="#0060EB" />


                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div class="bg-footer">
                    
                    <div class="flex-next-prev-list">
                        <button class="back-button-list-all btn-list-color-voltar">
                            Voltar
                        </button>
                        <button class="back-button-list-all btn-list-color-proximo">
                            Próximo
                        </button>
                    </div>
            </div>

        </>
    );
}
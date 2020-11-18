import React, { useEffect, useState } from 'react';
import Menu from '../../../Components/administrador/header/header';
import './Instituicao.css';
import api from '../../../services/api'
import { matchPath } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEdit } from '@fortawesome/free-solid-svg-icons'



export default function InstituicaoPerfil() {
    const [result, setResult] = useState([]);

    useEffect( () => {
        try {
            async function SelecionarInstituicao(){
                const response = await api.get(`/instituicao/15`)
                setResult(response.data)
            }

            SelecionarInstituicao();
         
            
        } catch (error) {
            console.log(error)
        }
    }, [])
    console.log(result,' carai')    
    const [nome, setNome] = useState(`${result.nome}`);


    return (
        <>
            <Menu />
            <div class="perfil-instituicao-bg" >
                <div class="perfil-titulo">
                    <h2>Dados do Perfil</h2>
                </div>
            </div>
            {result.map(result => (
                <section key={result.id_instituicao}class="perfil-dados-flex">
                    <div class="flex-1">
                        <p>Nome da Instituição:{nome} </p>
                        <input
                            type="text"
                            value={nome}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Resposável: </p>
                        <p>Unidade: </p>
                        <p>E-mail: </p>
                        <p>DDD: </p>
                        <p>Número Telefone: </p>
                    </div>
                    <div class="flex-1">
                        <p>Estado: </p>
                        <p>Components: </p>
                        <p>Cidade: </p>
                        <p>Bairro: </p>
                        <p>Quadra: </p>
                        <p>Número: </p>
                        <p>Completo: </p>
                    </div>
                </section>
            ))}

        </>
    );
}
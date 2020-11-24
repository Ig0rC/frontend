import React, { useContext, useEffect, useState } from 'react';
import api from '../../../services/api';
import Menu from '../../../Components/administrador/header/header';
import { Context } from '../../../Context/AlunoContext'
import './AlunoPerfil.css'



export default function AlunoPerfil(){
    const { id } = useContext(Context)
    const [dadosAluno, setDadosAluno] = useState([])
    useEffect(() => {

        (async() =>{
            const response = await api.get(`alunos/selecionar/${id}`)
            setDadosAluno(response.data)
        })();

    }, [])


    return(
        <>
            <Menu />
            <div class="perfil-instituicao-bg" >
                    <div class="perfil-titulo">

                        <h2>Dados do Aluno</h2>
                    </div>
            </div>
            {dadosAluno.map(aluno => (
            <div key={aluno.cpf} 
            class="aluno-perfil-styles-flex">
                <div class="aluno-perfil-styles-flex-sub-div">
                    <label>CPF:</label>
                    <input defaultValue={aluno.cpf}class="input-styles-IT"type="text"/>
                    <label>Nome:</label>
                    <input defaultValue={aluno.nome}class="input-styles-IT" type="text"/>
                    <label>Nome Social:</label>
                    <input defaultValue={aluno.nome_social} class="input-styles-IT" type="text"/>
                    <label>Naturalidade:</label>
                    <input defaultValue={aluno.naturalidade}class="input-styles-IT" type="text"/>
                    <label>Nascimento:</label>
                    <input defaultValue={aluno.nascimento} class="input-styles-IT" type="text"/>
                    <label>Sexo:</label>
                    <input defaultValue={aluno.sexo}class="input-styles-IT" type="text"/>
                    <label>Situação:</label>
                    <input defaultValue={aluno.situacao} class="input-styles-IT" type="text"/>
                    <label>E-mail:</label>
                    <input defaultValue={aluno.email} class="input-styles-IT" type="text"/>
                    <label>DDI:</label>
                    <input defaultValue={aluno.ddi}class="input-styles-IT" type="text"/>
                    <label>DDD:</label>
                    <input defaultValue={aluno.ddd}class="input-styles-IT" type="text"/>
                    <label>Número Telefone:</label>
                    <input defaultValue={aluno.numero_telefone}class="input-styles-IT" type="text"/>
                    <label>Tipo Telefone:</label>
                    <input defaultValue={aluno.nome_tipo_telefone} class="input-styles-IT" type="text"/>
                    <label>Número RG:</label>
                    <input defaultValue={aluno.numero_rg} class="input-styles-IT" type="text"/>
                    <label>Orgão de Emissor:</label>
                    <input defaultValue={aluno.orgao_emissor}class="input-styles-IT" type="text"/>
                    <label>UF:</label>
                    <input defaultValue={aluno.uf} class="input-styles-IT" type="text"/>
                    <label>Estado Civil:</label>
                    <input defaultValue={aluno.estado_civil}class="input-styles-IT" type="text"/>
                    <label>Cor:</label>
                    <input defaultValue={aluno.raca} class="input-styles-IT" type="text"/>
                    <label>Filhos:</label>
                    <input defaultValue={aluno.filhos}class="input-styles-IT" type="text"/>
                    <label>Moradia:</label>
                    <input defaultValue={aluno.moradia}class="input-styles-IT" type="text"/>
                    <label>Escolaridade:</label>
                    <input defaultValue={aluno.escolaridade}class="input-styles-IT" type="text"/>
                    <label>Situação Econômica:</label>
                    <input defaultValue={aluno.situacao_economica}class="input-styles-IT" type="text"/>
                    <label>Trabalhando:</label>
                    <input defaultValue={aluno.ocupacao}class="input-styles-IT" type="text"/>
                    <label>Aposentado:</label>
                    <input defaultValue={aluno.aposentado}class="input-styles-IT" type="text"/>
                </div>
                <div class="aluno-perfil-styles-flex-sub-div">
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
                    <label>Nome:</label>
                    <input class="input-styles-IT" type="text"/>
               
                </div>
         
            </div>
            ))}
        </>
    )
}
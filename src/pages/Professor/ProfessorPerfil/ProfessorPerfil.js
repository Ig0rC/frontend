import React, { useState, useEffect, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header'
import api from '../../../services/api';
import { Context } from '../../../Context/ProfessorContext';




export default function ProfessorPerfil() {

    const { id } = useContext(Context)
    console.debug('id', id)
    const [professorPerfil, setProfessorPerfil] = useState([]);

    useEffect(() => {
        (async () => {
            console.log(id, 'ok')
            const response = await api.get(`/professor/selecionar/${id}`);
            setProfessorPerfil(response.data)
            console.log('ok', professorPerfil)
        })();
    }, [id])

    return (
        <>
            <Menu />
            <div class="perfil-instituicao-bg" >
                <div class="perfil-titulo">
                    <h2>Dados do Professor</h2>
                </div>
            </div>
            {professorPerfil.map(professor => (
                <div key={professor.cpf} className="aluno-perfil-styles-flex">
                    <div className="aluno-perfil-styles-flex-sub-div">
                        <label>CPF:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.cpf}
                            />
                        <label>Nome:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.nome}
                            />
                        <label>Nome Social:</label>
                            <input
                                className="input-styles-IT"
                                defaultValue={professor.nome_social}
                            />
                        <label>Naturalidade:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.naturalidade}
                            />
                        <label>Nascimento:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.nascimento}
                            />
                        <label>Sexo:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.sexo}
                            />
                        <label>RG:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.numero_rg}
                            />
                        <label>Orgão Emissor:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.orgao_emissor}
                            />
                        <label>RG UF:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.uf}
                            />
                        <label>Especialização:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.especializacao}
                            />
                        <label>Grau Formação:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.grau_formacao}
                            />
                    </div>
                    <div className="aluno-perfil-styles-flex-sub-div">
                        <label>E-mail:</label>
                        <input
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.email}
                        />
                        <label>Situação:</label>
                        <input
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.situacao}
                        />
                        <label>Cep:</label>
                        <input
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.cep}
                        />
                        <label>Estado:</label>
                        <input
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.estado}
                        />
                        <label>Cidade:</label>
                        <input
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.cidade}
                        />
                        <label>Bairro:</label>
                        <input
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.bairro}
                        />
                        <label>Número Endereço:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.bairro}
                            />
                        <label>Complemento:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.complemento}
                            />
                        <label>DDD:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.ddd}
                            />
                        <label>Número de Telefone:</label>
                            <input
                                className="input-styles-IT"
                                type="text"
                                defaultValue={professor.numero_telefone}
                            />
                    </div>

                </div>

            ))}
        </>
    );
}
import React, { useRef, useState, useEffect } from 'react';
import Menu from '../../../Components/Professor/header/headerProfessor';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api';

import './ProfessorHome.css'



export default function ProfessorHome() {

    const [nascimentoData, setNascimentoData] = React.useState(new Date(''));
    const [professorPerfil, setProfessorPerfil] = useState([]);


    useEffect(() => {
        (async () => {
            const response = await api.get(`/professor/selecionar/${0}`);
            setProfessorPerfil(response.data)
            console.log(response.data)
        })();
    }, [])

    useEffect(() => {
        setNascimentoData(professorPerfil.map(professorPerfil => (
            professorPerfil.nascimento
        )))
    }, [professorPerfil])

    const handleDateChange = (date) => {
        setNascimentoData(date);
    };


    const nomePessoa = useRef(null);
    const nome_social = useRef(null)
    const cpf = useRef(null);
    const sexo = useRef(null);
    const nascimento_ok = useRef(null);
    const cep = useRef(null);
    const cidade = useRef(null);
    const numero_endereco = useRef(null);
    const bairro = useRef(null);
    const complemento = useRef(null);
    const estado = useRef(null);
    const naturalidade = useRef(null);
    const email = useRef(null);
    const ddd = useRef(null);
    const numero_telefone = useRef(null);
    const numero_rg = useRef(null);
    const orgao_emissor = useRef(null);
    const uf = useRef(null);
    const tipo_telefone = useRef(null);
    const especializacao = useRef(null);
    const grau_formacao = useRef(null);
    const quadra = useRef(null);


    async function Atualizar(idTelefone,idRg, idLogin, idEndereco ){
        try {
            const response = await api.put(`/professor/atualizar/cadastro/${0}/${idTelefone}/${idRg}/${idLogin}/${idEndereco}`,{
                naturalidade: naturalidade.current.value,
                name: nomePessoa.current.value,
                nome_social: nome_social.current.value,
                nascimento: nascimentoData,
                cep: cep.current.value,
                cidade: cidade.current.value,
                numero_endereco: numero_endereco.current.value,
                bairro: bairro.current.value,
                complemento: complemento.current.value,
                estado: estado.current.value,
                sexo: sexo.current.value,
                ddd: ddd.current.value,
                numero_telefone: numero_telefone.current.value,
                numero_rg: numero_rg.current.value,
                orgao_emissor: orgao_emissor.current.value,
                quadra: quadra.current.value,
                uf: uf.current.value,
                especializacao: especializacao.current.value,
                graduacao: grau_formacao.current.value,
                email: email.current.value
            })
            alert(response.data)
        } catch (error) {
            alert(error)
        }
    }

    async function maxLengthCheck(object) {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }


    return (
        <>
            <Menu />
            <div className="flex-list-all-bg">
                <div className="flex-pesq-list-all">
                    <div className="tamanho-pesq-atributos">
                        <p className="titulo-aluno-list-all">Seu Perfil</p>
                    </div>
                </div>
            </div>
            <section className="section-professor-home-perfil">
            {professorPerfil.map(professor => (
                <div className="div-professor-home-perfil" >
                    <label>CPF:</label>
                    <input
                        className="input-styles-IT"
                        type="text"
                        value={professor.cpf}
                        readOnly
                    />
                    <label>Nome:</label>
                    <input
                        ref={nomePessoa}
                        className="input-styles-IT"
                        type="text"
                        defaultValue={professor.nome}
                    />
                    <label>Nome Social:</label>
                    <input
                        ref={nome_social}
                        className="input-styles-IT"
                        defaultValue={professor.nome_social}
                    />
                    <label>Naturalidade:</label>
                    <select
                        className="input-styles-IT text-aling-center-cadastrar-curso"
                        ref={naturalidade}
                    >
                        <option value={professor.naturalidade === 'Brasileiro' ? "Brasileiro" : "Estrangeiro"}>
                            {professor.naturalidade === 'Brasileiro' ? "Brasileiro" : "Estrangeiro"}
                        </option>
                        <option value={professor.naturalidade === "Brasileiro" ? "Estrangeiro" : "Brasileiro"}>
                            {professor.naturalidade === "Brasileiro" ? "Estrangeiro" : "Brasileiro"}
                        </option>
                    </select>
                    <label>Nascimento:</label>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                className="input-data"
                                margin="normal"
                                id="date-picker-dialog"
                                format="dd/MM/yyyy"
                                value={nascimentoData}
                                onChange={handleDateChange}
                                ref={nascimento_ok}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <label>Sexo:</label>
                    <select
                        className="input-styles-IT text-aling-center-cadastrar-curso"
                        ref={sexo}
                    >
                        <option value={professor.sexo === 'F' ? "F" : "M"}>
                            {professor.sexo === 'F' ? "F" : "M"}
                        </option>
                        <option value={professor.sexo === 'F' ? "M" : "F"}>
                            {professor.sexo === 'F' ? "M" : "F"}
                        </option>
                    </select>
                    <label>RG:</label>
                    <input

                        ref={numero_rg}
                        className="input-styles-IT"
                        type="number"
                        onInput={maxLengthCheck}
                        maxLength={7}
                        defaultValue={professor.numero_rg}
                    />
                    <label>Orgão Emissor:</label>
                    <input
                        ref={orgao_emissor}
                        className="input-styles-IT"
                        type="text"
                        maxLength={6}
                        defaultValue={professor.orgao_emissor}
                    />
                    <label>RG UF:</label>
                    <input
                        ref={uf}
                        className="input-styles-IT"
                        type="text"
                        maxLength={2}
                        defaultValue={professor.uf}
                    />
                    <label>Especialização:</label>
                    <input
                        ref={especializacao}
                        className="input-styles-IT"
                        type="text"
                        defaultValue={professor.especializacao}
                    />
                    <label>Grau Formação:</label>
                    <input
                        ref={grau_formacao}
                        className="input-styles-IT"
                        type="text"
                        defaultValue={professor.grau_formacao}
                    />
                     <label>E-mail:</label>
                        <input
                            ref={email}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.email}
                        />
                        <label>Cep:</label>
                        <input
                            ref={cep}
                            onInput={maxLengthCheck}
                            maxLength={8}
                            className="input-styles-IT"
                            type="number"
                            defaultValue={professor.cep}
                        />
                        <label>Estado:</label>
                        <input
                            ref={estado}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.estado}
                        />
                        <label>Cidade:</label>
                        <input
                            ref={cidade}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.cidade}
                        />
                        <label>Bairro:</label>
                        <input
                            ref={bairro}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.bairro}
                        />
                          <label>Quadra:</label>
                        <input
                            ref={quadra}
                            defaultValue={professor.quadra}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Número Endereço:</label>
                        <input
                            ref={numero_endereco}
                            className="input-styles-IT"
                            type="number"
                            onInput={maxLengthCheck}
                            maxLength={4}
                            defaultValue={professor.numero_endereco}
                        />
                        <label>Complemento:</label>
                        <input
                            ref={complemento}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.complemento}
                        />
                        <label>DDD:</label>
                        <input
                            ref={ddd}
                            className="input-styles-IT"
                            type="number"
                            onInput={maxLengthCheck}
                            maxLength={3}
                            defaultValue={professor.ddd}
                        />
                        <label>Número de Telefone:</label>
                        <input
                            ref={numero_telefone}
                            className="input-styles-IT"
                            type="number"
                            onInput={maxLengthCheck}
                            maxLength={11}
                            defaultValue={professor.numero_telefone}
                        />
                        {professorPerfil.map(professor => (
                        <div className="icon-lixeira-perfil">
                            <div>
                                <a 
                                    onClick={() => Atualizar(professor.id_telefone, professor.id_rg, professor.login, professor.id_endereco)}
                                    >
                                    <FontAwesomeIcon icon={faSave} size="3x" color="green" />
                                </a>
                            </div>
                        </div>
            ))}
                </div>
                

            ))}
            </section>

        </>
    )
}
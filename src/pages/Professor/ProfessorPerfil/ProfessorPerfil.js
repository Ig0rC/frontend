import React, { useState, useEffect, useContext, useRef } from 'react';
import Menu from '../../../Components/administrador/header/header'
import api from '../../../services/api';
import { Context } from '../../../Context/ProfessorContext';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';





export default function ProfessorPerfil() {

    const [nascimentoData, setNascimentoData] = React.useState(new Date(''));
    const { id } = useContext(Context)
    console.debug('id', id)
    const [professorPerfil, setProfessorPerfil] = useState([]);

    useEffect(() => {
        (async () => {
            console.log(id, 'ok')
            const response = await api.get(`/professor/selecionar/${id}`);
            setProfessorPerfil(response.data)
            console.log('ok', response.data)
        })();
    }, [id])

    useEffect(() => {
        setNascimentoData(professorPerfil.map(professorPerfil => (
            professorPerfil.nascimento
        )))
    }, [professorPerfil])

    const handleDateChange = (date) => {
        setNascimentoData(date);
    };

    //referencias
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
            console.log(nascimentoData)
            const response = await api.put(`/professor/atualizar/cadastro/${id}/${idTelefone}/${idRg}/${idLogin}/${idEndereco}`,{
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
            console.log(nomePessoa.current.value)
            console.log(response)
            alert('atualizado')
        } catch (error) {
            alert(error)
        }
    }

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
                        <input
                            ref={naturalidade}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.naturalidade}
                        />
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
                        <input
                            ref={sexo}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.sexo}
                        />
                        <label>RG:</label>
                        <input
                            ref={numero_rg}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.numero_rg}
                        />
                        <label>Orgão Emissor:</label>
                        <input
                            ref={orgao_emissor}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.orgao_emissor}
                        />
                        <label>RG UF:</label>
                        <input
                            ref={uf}
                            className="input-styles-IT"
                            type="text"
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
                    </div>
                    <div className="aluno-perfil-styles-flex-sub-div">
                        <label>E-mail:</label>
                        <input
                            ref={email}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.email}
                        />
                        <label>Situação:</label>
                        <input
                            className="input-styles-IT"
                            type="text"
                            value={professor.situacao === true ? 'Ativo' : 'Inativo'}
                        />
                        <label>Cep:</label>
                        <input
                            ref={cep}
                            className="input-styles-IT"
                            type="text"
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
                            type="text"
                            defaultValue={professor.bairro}
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
                            type="text"
                            defaultValue={professor.ddd}
                        />
                        <label>Número de Telefone:</label>
                        <input
                            ref={numero_telefone}
                            className="input-styles-IT"
                            type="text"
                            defaultValue={professor.numero_telefone}
                        />
                    </div>

                </div>

            ))}
             {professorPerfil.map(professor => (
                <div className="icon-lixeira-perfil">
                       <div>
                           <a 
                            // onClick={() => Excluir(professor.id_rg, professor.id_login, professor.id_telefone, professor.id_endereco)} 
                            >
                               <FontAwesomeIcon icon={faTrash} size="3x" color="red" />
                           </a>
                       </div>
                       <div>
                           <a 
                             onClick={() => Atualizar(professor.id_telefone, professor.id_rg, professor.login, professor.id_endereco)}
                            >
                               <FontAwesomeIcon icon={faSave} size="3x" color="green" />
                           </a>
                       </div>
                </div>
            ))}
        </>
    );
}
import React, { useState, useEffect, useContext, useRef } from 'react'
import Menu from '../../../Components/administrador/header/header';
import api from '../../../services/api';
import { AdministradorContext } from '../../../Context/AdministradorPerfilContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import '../../../CSS/global.css'





export default function AdministradorPerfil() {

    const { admin } = useContext(AdministradorContext);
    const [administrador, setAdministrador] = useState([]);
    const [reload, setReload] = useState(false);

    const [nascimentoData, setNascimentoData] = React.useState(new Date(''));

    //referencias
    const name = useRef(null);
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

    const handleDateChange = (date) => {
        setNascimentoData(date);
    };

    useEffect(() => {
        (async () => {
            const response = await api.get(`/administrador/${admin}`)
            setAdministrador(response.data)
            console.debug(response.data)
        })();
    }, [reload])

    useEffect( ()=>{
        setNascimentoData(administrador.map(administrador => (
            administrador.nascimento
        )))
    }, [administrador])

    async function enviar() {
        try {
      
            const response = await api.put(`/administrador/${admin}`,{
                nome: name.current.value,
                nome_social: nome_social.current.value,
                sexo: sexo.current.value,
                cep: cep.current.valeu,
                cidade: cidade.current.value,
                numero_endereco: numero_endereco.current.value,
                bairro: bairro.current.value,
                complemento: complemento.current.value,
                estado: estado.current.value,
                naturalidade:  naturalidade.current.value,
                email: email.current.value,
                ddd: ddd.current.value,
                numero_telefone: numero_telefone.current.value,
                numero_rg: numero_rg.current.value,
                orgao_emissor: orgao_emissor.current.value,
                uf: uf.current.value,
                nascimento: nascimentoData
            });
            console.log(response.data)
            alert('Salvo com Sucesso')
        } catch (error) {
            alert(error)
        }
    
    }

    async function excluir(idrg, idlogin, idtelefone, idendereco){
        try {
            let resultado = window.confirm('Desejar excluir esse administrador'+ name.current.value + '?')
            const cpfEnv = cpf.current.value
            console.log('ok', cpfEnv)
            if(resultado === true){
                console.log('idrg', idrg)
                const response = await api.delete(`/administrador/${cpfEnv}/${idrg}/${idlogin}/${idtelefone}/${idendereco}`)
                console.log(response);
            }
        } catch (error) {
           console.log(error) 
        }
    }

    return (
        <>
            <Menu />

            <div className="perfil-instituicao-bg" >
                <div className="perfil-titulo">
                    <h2>Dados do Administrador</h2>
                </div>
            </div>
            {administrador.map(administrador => (

                <div key={administrador.cpf}
                    className="aluno-perfil-styles-flex">
                    <div className="aluno-perfil-styles-flex-sub-div">
                        <label>CPF:</label>
                        <input
                            ref={cpf}
                            defaultValue={administrador.cpf} className="input-styles-IT" type="text" />
                        <label>Nome:</label>
                        <input
                            ref={name}
                            id='name'
                            defaultValue={administrador.nome} className="input-styles-IT" type="text"
                        />
                        <label>Nome Social:</label>
                        <input
                            ref={nome_social}
                            defaultValue={administrador.nome_social}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Naturalidade:</label>
                        <select
                            className="input-styles-IT text-aling-center-cadastrar-curso"
                            ref={naturalidade}
                        >
                            <option value={administrador.naturalidade === 'Brasileiro' ? "Brasileiro" : "Estrangeiro"}>
                                {administrador.naturalidade === 'Brasileiro' ? "Brasileiro" : "Estrangeiro"}
                            </option>
                            <option value={administrador.naturalidade === "Brasileiro" ? "Estrangeiro" : "Brasileiro"}>
                                {administrador.naturalidade === "Brasileiro" ? "Estrangeiro" : "Brasileiro"}
                            </option>
                        </select>
                
                        <label>Estado:</label>
                        <input
                            ref={estado}
                            defaultValue={administrador.estado}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Cep:</label>
                        <input
                            ref={cep}
                            defaultValue={administrador.cep}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Cidade:</label>
                        <input
                            ref={cidade}
                            defaultValue={administrador.cidade}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Número endereço:</label>
                        <input
                            ref={numero_endereco}
                            defaultValue={administrador.numero_endereco}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Bairro:</label>
                        <input
                            ref={bairro}
                            defaultValue={administrador.bairro}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Complemento:</label>
                        <input
                            ref={complemento}
                            defaultValue={administrador.cep}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Quadra:</label>
                        <input
                            // ref={quadra}
                            defaultValue={administrador.quadra}
                            className="input-styles-IT"
                            type="text"
                        />
                    </div>
                    <div className="aluno-perfil-styles-flex-sub-div">
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
                            <option value={administrador.sexo === 'F' ? "F" : "M"}>
                                {administrador.sexo === 'F' ? "F" : "M"}
                            </option>
                            <option value={administrador.sexo === 'F' ? "M" : "F"}>
                                {administrador.sexo === 'F' ? "M" : "F"}
                            </option>
                        </select>
                        <label>Situação:</label>
                        <input
                            value={administrador.situacao === true ? 'Ativo' : 'Inativo'}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>E-mail:</label>
                        <input
                            ref={email}
                            defaultValue={administrador.email}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>DDI:</label>
                        <input
                            value={administrador.ddi}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>DDD:</label>
                        <input
                            ref={ddd}
                            defaultValue={administrador.ddd}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Número Telefone:</label>
                        <input
                            ref={numero_telefone}
                            defaultValue={administrador.numero_telefone}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Tipo Telefone:</label>
                        <select
                            className="input-styles-IT text-aling-center-cadastrar-curso"
                            ref={tipo_telefone}
                        >
                            <option value={administrador.nome_tipo_telefone === 'MOVEL' ? "Móvel" : "Fixo"}>
                                {administrador.nome_tipo_telefone === 'MOVEL' ? "Móvel" : "Fixo"}
                            </option>
                            <option value={administrador.sexo === 'MOVEL' ? "Fixo" : "Móvel"}>
                                {administrador.nome_tipo_telefone === 'MOVEL' ? "Fixo" : "Móvel"}
                            </option>
                        </select>
                        <label>Número RG:</label>
                        <input
                            ref={numero_rg}
                            defaultValue={administrador.numero_rg}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>Orgão de Emissor:</label>
                        <input
                            ref={orgao_emissor}
                            defaultValue={administrador.orgao_emissor}
                            className="input-styles-IT"
                            type="text"
                        />
                        <label>UF:</label>
                        <input
                            ref={uf}
                            defaultValue={administrador.uf}
                            className="input-styles-IT"
                            type="text"
                        />

                    </div>

                </div>

            ))}
            {administrador.map(adm => (
                <div className="icon-lixeira-perfil">
                       <div>
                           <a onClick={() => excluir(adm.id_rg, adm.id_login, adm.id_telefone, adm.id_endereco)} >
                               <FontAwesomeIcon icon={faTrash} size="3x" color="red" />
                           </a>
                       </div>
                       <div>
                           <a onClick={enviar}>
                               <FontAwesomeIcon icon={faSave} size="3x" color="green" />
                           </a>
                       </div>
                </div>
            ))}
        </>
    )
}
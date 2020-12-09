import React, { useContext, useEffect, useState, useRef } from 'react';
import api from '../../../services/api';
import Menu from '../../../Components/administrador/header/header';
import { Context } from '../../../Context/AlunoContext'
import './AlunoPerfil.css';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';



export default function AlunoPerfil() {
    const { id } = useContext(Context)
    const [dadosAluno, setDadosAluno] = useState([]);
    const [CE, setCE] = useState([]);

    const [nascimentoData, setNascimentoData] = React.useState(new Date(''));


    const handleDateChange = (date) => {
        setNascimentoData(date);
    };

    useEffect(() => {

        (async () => {
            const response = await api.get(`alunos/selecionar/${id}`)
            setDadosAluno(response.data)
            console.log(response.data)
            const responseCE = await api.get(`/aluno/contato/emergencial/buscar/${id}`)
            setCE(responseCE.data);

        })();

    }, [id])

    const nome = useRef(null);
    const nome_social= useRef(null);
    const naturalidade = useRef(null);
    const nascimento = useRef(null);
    const sexo = useRef(null);
    const situacao = useRef(null);
    const numero_rg = useRef(null);
    const orgao_emissor = useRef(null);
    const uf = useRef(null);    
    const cep = useRef(null);
    const estado = useRef(null);
    const cidade = useRef(null);
    const bairro = useRef(null);
    const quadra = useRef(null);
    const numero_endereco= useRef(null);
    const complemento = useRef(null);
    const tipo_telefone = useRef(null);
    const ddd = useRef(null);
    const numero_telefone = useRef(null);
    const email = useRef(null);


    async function AtualizarDadosAluno(idrg, idendereco, idtelefone, idlogin) {
        alert(idlogin)
        try {   
            const response = await api.put(`/aluno/perfil/atualizar/dados/${id}/${idrg}/${idendereco}/${idtelefone}/${idlogin}`,{      
            nome: nome.current.value,
            nome_social: nome_social.current.value,
            naturalidade: naturalidade.current.value,
            nascimento: nascimentoData,
            sexo: sexo.current.value, 
            numero_rg: numero_rg.current.value,
            orgao_emissor: orgao_emissor.current.value,
            uf: uf.current.value ,       
            cep : cep.current.value,
            estado : estado.current.value, 
            cidade : cidade.current.value,
            bairro : bairro.current.value,
            quadra : quadra.current.value,
            numero_endereco : numero_endereco.current.value,
            complemento : complemento.current.value,
            tipo_telefone : tipo_telefone.current.value,
            ddd : ddd.current.value ,
            numero_telefone : numero_telefone.current.value,
            email: email.current.value
        });
        alert('Atualizado com Sucesso!')
        console.log(response.data)

        } catch (error) {
            console.log(error)

            
        } 
    }

    useEffect( ()=>{
        setNascimentoData(dadosAluno.map(dadosAluno => (
            dadosAluno.nascimento
        )))
    }, [dadosAluno]);

    async function DesativarAluno(){
        await api.put(`/aluno/perfil/desativar/${id}`)
        alert('Desativado')
    }

    return (
        <>
            <Menu />
            <div className="perfil-instituicao-bg" >
            {dadosAluno.map(aluno => (
                <div className="perfil-titulo">

                    <h2>Dados do Aluno {aluno.nome}</h2>
                </div>
            ))}
            </div>
            {dadosAluno.map(aluno => (
                <div key={aluno.cpf}
                    className="aluno-perfil-styles-flex">
                    <div className="aluno-perfil-styles-flex-sub-div">
                        <label>CPF:</label>
                        <input readOnly={aluno.cpf} value={aluno.cpf} className="input-styles-IT" type="text" />
                        <label>Nome:</label>
                        <input ref={nome} defaultValue={aluno.nome} className="input-styles-IT" type="text" />
                        <label>Nome Social:</label>
                        <input ref={nome_social} defaultValue={aluno.nome_social} className="input-styles-IT" type="text" />
                    
                        <label>Situação:</label>
                        <input  value={aluno.situacao === true ? "Ativo" : "Inativo"} className="input-styles-IT" type="text" />
                        <label>CEP:</label>
                        <input ref={cep} defaultValue={aluno.cep} className="input-styles-IT" type="text" />
                        <label>Estado:</label>
                        <input ref={estado} defaultValue={aluno.estado} className="input-styles-IT" type="text" />
                        <label>Cidade:</label>
                        <input ref={cidade} defaultValue={aluno.cidade} className="input-styles-IT" type="text" />
                        <label>Bairro:</label>
                        <input ref={bairro} defaultValue={aluno.bairro} className="input-styles-IT" type="text" />
                        <label>Quadra:</label>
                        <input ref={quadra} defaultValue={aluno.quadra} className="input-styles-IT" type="text" />
                        <label>Numero_endereco:</label>
                        <input ref={numero_endereco} defaultValue={aluno.numero_endereco} className="input-styles-IT" type="text" />
                        <label>Complemento:</label>
                        <input ref={complemento} defaultValue={aluno.complemento} className="input-styles-IT" type="text" />
                   
                      
                       
                    </div>
                    <div className="aluno-perfil-styles-flex-sub-div">
                        <label>Naturalidade:</label>
                        <select
                            className="input-styles-IT text-aling-center-cadastrar-curso"
                            ref={naturalidade}
                        >
                            <option value={aluno.naturalidade === 'Brasileiro' ? "Brasileiro" : "Estrangeiro"}>
                                {aluno.naturalidade === 'Brasileiro' ? "Brasileiro" : "Estrangeiro"}
                            </option>
                            <option value={aluno.naturalidade === "Brasileiro" ? "Estrangeiro" : "Brasileiro"}>
                                {aluno.naturalidade === "Brasileiro" ? "Estrangeiro" : "Brasileiro"}
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
                                    ref={nascimento}
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
                            <option value={aluno.sexo === 'F' ? "F" : "M"}>
                                {aluno.sexo === 'F' ? "F" : "M"}
                            </option>
                            <option value={aluno .sexo === 'F' ? "M" : "F"}>
                                {aluno.sexo === 'F' ? "M" : "F"}
                            </option>
                        </select>
                        <label>E-mail:</label>
                        <input ref={email} defaultValue={aluno.email} className="input-styles-IT" type="text" />
                        <label>DDI:</label>
                        <input value={aluno.ddi} className="input-styles-IT" type="text" />
                        <label>DDD:</label>
                        <input ref={ddd} defaultValue={aluno.ddd} className="input-styles-IT" type="text" />
                        <label>Número Telefone:</label>
                        <input ref={numero_telefone} defaultValue={aluno.numero_telefone} className="input-styles-IT" type="text" />
                        <label>Tipo Telefone:</label>
                        <select
                            className="input-styles-IT text-aling-center-cadastrar-curso"
                            ref={tipo_telefone}
                        >
                            <option value={aluno.nome_tipo_telefone === 'MOVEL' ? "Móvel" : "Fixo"}>
                                {aluno.nome_tipo_telefone === 'MOVEL' ? "Móvel" : "Fixo"}
                            </option>
                            <option value={aluno.nome_tipo_telefone === 'MOVEL' ? "Fixo" : "Móvel"}>
                                {aluno.nome_tipo_telefone === 'MOVEL' ? "Fixo" : "Móvel"}
                            </option>
                        </select>
                        <label>Número RG:</label>
                        <input ref={numero_rg} defaultValue={aluno.numero_rg} className="input-styles-IT" type="text" />
                        <label>Orgão de Emissor:</label>
                        <input ref={orgao_emissor} defaultValue={aluno.orgao_emissor} className="input-styles-IT" type="text" />
                        <label>UF:</label>
                        <input ref={uf} defaultValue={aluno.uf} className="input-styles-IT" type="text" />
                    
                    </div>

                </div>
            ))}  
            {dadosAluno.map(dadosAluno => (
                <div className="icon-lixeira-perfil">
                       <div>
                           <a onClick={() => DesativarAluno()} >
                               <FontAwesomeIcon icon={faBan} size="3x" color="red" />
                           </a>
                       </div>
                       <div>
                           <a onClick={() => AtualizarDadosAluno(dadosAluno.id_rg, dadosAluno.id_endereco, 
                                dadosAluno.id_telefone, dadosAluno.id_login)}>
                               <FontAwesomeIcon icon={faSave} size="3x" color="green" />
                           </a>
                       </div>
                </div>
            ))}            <div className="perfil-instituicao-bg" >
                <div className="perfil-titulo">

                    <h2>Contato Emergêncial</h2>
                </div>
            </div>
            {CE.map(ce => (
                <div key={ce.id_contato_emergencial}
                    className="aluno-perfil-styles-flex">
                    <div className="aluno-perfil-styles-flex-sub-div">
                        <label>Nome:</label>
                        <input defaultValue={ce.nome} className="input-styles-IT" type="text" />

                    </div>
                    <div className="aluno-perfil-styles-flex-sub-div">
                        <label>Número Telefone:</label>
                        <input defaultValue={ce.numero_telefone} className="input-styles-IT" type="text" />

                    </div>

                </div>
            ))}
            <div className="perfil-instituicao-bg" >
                <div className="perfil-titulo">

                    <h2>Formulário</h2>
                </div>
            </div>
            {dadosAluno.map(aluno => (
                <div key={aluno.cpf}
                    className="aluno-perfil-styles-flex">
                    <div className="aluno-perfil-styles-flex-sub-div">
                        <label>Estado Civil:</label>
                        <input defaultValue={aluno.estado_civil} className="input-styles-IT" type="text" />
                        <label>Cor:</label>
                        <input defaultValue={aluno.raca} className="input-styles-IT" type="text" />
                        <label>Filhos:</label>
                        <input defaultValue={aluno.filhos === true ? "Sim": "Não"} className="input-styles-IT" type="text" />
                        <label>Moradia:</label>
                        <input defaultValue={aluno.moradia} className="input-styles-IT" type="text" />
                        <label>Escolaridade:</label>
                        <input defaultValue={aluno.escolaridade} className="input-styles-IT" type="text" />
                        <label>Situação Econômica:</label>
                        <input defaultValue={aluno.situacao_economica} className="input-styles-IT" type="text" />
                        <label>Trabalhando:</label>
                        <input defaultValue={aluno.ocupacao} className="input-styles-IT" type="text" />
                        <label>Aposentado:</label>
                        <input defaultValue={aluno.aposentado} className="input-styles-IT" type="text" />
                        <label>Locomoção:</label>
                        <input defaultValue={aluno.locomacao} className="input-styles-IT" type="text" />
                        <label>Última Profissão:</label>
                        <input defaultValue={aluno.ultima_profissao} className="input-styles-IT" type="text" />
                    </div>
                    <div className="aluno-perfil-styles-flex-sub-div">

                        <label>Renda Salarial R$ :</label>
                        <input defaultValue={aluno.rendasalarial} className="input-styles-IT" type="text" />
                        <label>Administração Financeira:</label>
                        <input defaultValue={aluno.adm_financeira} className="input-styles-IT" type="text" />
                        <label>Programa Social:</label>
                        <input defaultValue={aluno.prog_social} className="input-styles-IT" type="text" />
                        <label>Atendimento:</label>
                        <input defaultValue={aluno.atendimento} className="input-styles-IT" type="text" />
                        <label>Descrição de Perfil:</label>
                        <input defaultValue={aluno.descricao_perfil} className="input-styles-IT" type="text" />
                        <label>Experiência Profissional:</label>
                        <input defaultValue={aluno.experiencia_profissional} className="input-styles-IT" type="text" />
                        <label>Conhecimento do Curso:</label>
                        <input readOnly={aluno.conhecimento_curso} value={aluno.conhecimento_curso} className="input-styles-IT" type="text" />
                        <label>Sobre Acessibilidade:</label>
                        <input defaultValue={aluno.dado_acessibilidade} className="input-styles-IT" type="text" />
                        <label>Sobre Patologia:</label>
                        <input defaultValue={aluno.dado_patologia} className="input-styles-IT" type="text" />
                        <label>Sobre Autonomia:</label>
                        <input defaultValue={aluno.dado_autonomia} className="input-styles-IT" type="text" />

                    </div>

                </div>
            ))}
              <div className="perfil-instituicao-bg" >
                <div className="perfil-titulo">
                    <h2></h2>
                </div>
            </div>
        </>
    )
}
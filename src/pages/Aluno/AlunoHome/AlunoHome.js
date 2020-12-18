import React, { useEffect, useState, useRef} from 'react';
import api from '../../../services/api.js';
import Menu from '../../../Components/Aluno/AlunoHeader';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import './AlunoHome.css';



function AlunoHome(){

    const [nascimentoData, setNascimentoData] = React.useState(new Date(''));
    const [ myData, setMyData ] = useState([]);
    const [ contatoEmergencial, setContatoEmergencial ] = useState([]);

    
    const handleDateChange = (date) => {
        setNascimentoData(date);
    };

    useEffect(() => {
        (async() =>{
            const id = 0;
            const { data } = await api.get('/buscar/meu/perfi/aluno');
            setMyData(data);

            const responseCE = await api.get(`/aluno/contato/emergencial/buscar/${id}`)
            setContatoEmergencial(responseCE.data);

        })();
    }, [])

    useEffect( ()=>{
        setNascimentoData(myData.map(myData => (
            myData.nascimento
        )))
    }, [myData]);

    // DADOS DO PERFIL
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
        const id = 0;
        try {   

            await api.put(`/aluno/perfil/atualizar/dados/${id}/${idrg}/${idendereco}/${idtelefone}/${idlogin}`,{      
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
        } catch (error) {
            console.log(error)

        } 
    }

    // Dados do contato Emergencial

        
    const nomeContatoEmergencial = useRef(null);
    const DDDContatoEmergencial = useRef(null);
    const numeroTelefoneContatoE = useRef(null);

    async function AtualizarContatoEmergencial(idTelefone, idContatoEmergencial){
        try {
            const {data} = await api.put(`/alunos/update/contato/emergencial`,{
                idTelefone: idTelefone,
                idContatoEmergencial: idContatoEmergencial,
                ddd: DDDContatoEmergencial.current.value,
                numero_telefone: numeroTelefoneContatoE.current.value,
                nome: nomeContatoEmergencial.current.value

            });
            alert(data)
        } catch (error) {
            console.log(error)
        }
    }

    // FIM

    async function maxLengthCheck(object) {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }


    return(
        <>
        <Menu />
        
        <div className="flex-list-all-bg">
                <div className="flex-pesq-list-all">
                    <div className="tamanho-pesq-atributos">
                        <p className="titulo-aluno-list-all">Seu Perfil</p>
                    </div>
                </div>
        </div>
        {/* Section */}

        <section className="aluno-home-section"> 
        {myData.map(perfil => (
            <div key={perfil.cpf_aluno} className="div-aluno-home">

                <p>CPF:</p>
                    <input  className="input-styles-aluno-perfil" value={perfil.cpf_aluno} readOnly type="text"/>

                <p>Nome:</p>
                    <input ref={nome} className="input-styles-aluno-perfil" defaultValue={perfil.nome} type="text"/>
                <p>Nome Social:</p>
                    <input  ref={nome_social} className="input-styles-aluno-perfil" defaultValue={perfil.nome_social} type="text"/>
                <p>CEP:</p>
                    <input 
                        ref={cep}  
                        className="input-styles-aluno-perfil" 
                        maxLength={8}
                        onInput={maxLengthCheck}
                        defaultValue={perfil.cep} type="number"/>
                <p>Estado:</p>
                    <input  ref={estado}  className="input-styles-aluno-perfil" defaultValue={perfil.estado} type="text"/>
                <p>Cidade:</p>
                    <input ref={cidade} className="input-styles-aluno-perfil" defaultValue={perfil.cidade} type="text"/>
                <p>Bairro:</p>
                    <input ref={bairro} className="input-styles-aluno-perfil" defaultValue={perfil.bairro} type="text"/>
                <p>Quadra:</p>
                    <input ref={quadra} className="input-styles-aluno-perfil" defaultValue={perfil.quadra}  type="text"/>
                <p>Número Endereço:</p>
                    <input 
                        ref={numero_endereco}
                        maxLength={2}
                        onInput={maxLengthCheck}
                        className="input-styles-aluno-perfil" 
                        defaultValue={perfil.numero_endereco} 
                        type="number"
                    />
                <p>Complemento:</p>
                    <input ref={complemento} className="input-styles-aluno-perfil" defaultValue={perfil.complemento} type="text"/>

                <p>Naturalidade:</p>
                    <select
                            className="input-styles-aluno-perfil"
                            ref={naturalidade}
                        >
                            <option value={perfil.naturalidade === 'Brasileiro' ? "Brasileiro" : "Estrangeiro"}>
                                {perfil.naturalidade === 'Brasileiro' ? "Brasileiro" : "Estrangeiro"}
                            </option>
                            <option value={perfil.naturalidade === "Brasileiro" ? "Estrangeiro" : "Brasileiro"}>
                                {perfil.naturalidade === "Brasileiro" ? "Estrangeiro" : "Brasileiro"}
                            </option>
                    </select>

                <p>Sexo:</p>
                    <select 
                        className="input-styles-aluno-perfil"
                        ref={sexo}
                    >
                        <option value={perfil.sexo === 'F' ? "F" : "M"}>
                            {perfil.sexo === 'F' ? "F" : "M"}
                        </option>
                        <option value={perfil .sexo === 'F' ? "M" : "F"}>
                            {perfil.sexo === 'F' ? "M" : "F"}
                        </option>
                    </select>

                <p>Nascimento:</p>
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
                       
                <p>E-mail:</p>
                    <input  ref={email} className="input-styles-aluno-perfil" defaultValue={perfil.email} type="text"/>
                    
                <p>DDD:</p>
                    <input  
                        ref={ddd} 
                        className="input-styles-aluno-perfil" 
                        defaultValue={perfil.ddd} 
                        maxLength={3}
                        type="number"
                        onInput={maxLengthCheck}
                    />
                    
                <p>Telefone:</p>
                    <input 
                        ref={numero_telefone} 
                        className="input-styles-aluno-perfil" 
                        defaultValue={perfil.numero_telefone}
                        type="number"
                        maxLength={11}
                        onInput={maxLengthCheck}
                    />

                <p>Tipo Telefone:</p>
                    <select
                        className="input-styles-aluno-perfil"
                        ref={tipo_telefone}
                    >
                        <option value={perfil.nome_tipo_telefone === 'MOVEL' ? "Móvel" : "Fixo"}>
                                {perfil.nome_tipo_telefone === 'MOVEL' ? "Móvel" : "Fixo"}
                        </option>
                        <option value={perfil.nome_tipo_telefone === 'MOVEL' ? "Fixo" : "Móvel"}>
                                {perfil.nome_tipo_telefone === 'MOVEL' ? "Fixo" : "Móvel"}
                        </option>

                    </select>
                
                        
                <p>Número RG:</p>
                    <input 
                        ref={numero_rg} 
                        className="input-styles-aluno-perfil"
                        defaultValue={perfil.numero_rg} 
                        maxLength={7}
                        type="number"
                        onInput={maxLengthCheck}
                    />
                <p>Orgão de Emissor:</p>
                    <input  
                        ref={orgao_emissor} 
                        className="input-styles-aluno-perfil" 
                        defaultValue={perfil.orgao_emissor} 
                        type="text"
                        maxLength={6}
                    
                    />
                <p>UF:</p>
                    <input  
                        ref={uf} 
                        className="input-styles-aluno-perfil" 
                        defaultValue={perfil.uf}
                        maxLength={2}
                        type="text"
                    />


                    <div className="div-save-dados-perfil-aluno">
                        <a onClick={() => AtualizarDadosAluno(perfil.id_rg, perfil.id_endereco, 
                                perfil.id_telefone, perfil.id_login)}>
                            <FontAwesomeIcon icon={faSave} size="3x" color="green" />
                        </a>        
                    </div>      
            </div>
        ))}
        </section>
        
        <div className="flex-list-all-bg">
                <div className="flex-pesq-list-all">
                    <div className="tamanho-pesq-atributos">
                        <p className="titulo-aluno-list-all">Contato Emergêncial</p>
                    </div>
                </div>
        </div>
                            
        <section  className="aluno-home-section">
        {contatoEmergencial.map(CE => (
            <div>
                <p>Nome:</p>
                <input   
                  ref={nomeContatoEmergencial} 
                  className="input-styles-aluno-perfil" 
                  defaultValue={CE.nome}
                  type="text"/>
                <p>DDD:</p>
                <input   
                    ref={DDDContatoEmergencial} 
                    className="input-styles-aluno-perfil" 
                    defaultValue={CE.ddd}
                    maxLength={3}
                    type="number"
                    onInput={maxLengthCheck}
                  />
                <p>Telefone:</p>
                <input   
                    ref={numeroTelefoneContatoE} 
                    className="input-styles-aluno-perfil" 
                    defaultValue={CE.numero_telefone}
                    maxLength={11}
                    type="number"
                    onInput={maxLengthCheck}
                />
                 <div className="div-save-dados-perfil-aluno">
                        <a onClick={() => AtualizarContatoEmergencial(CE.id_telefone, CE.id_contato_emergencial)}>
                            <FontAwesomeIcon icon={faSave} size="3x" color="green" />
                        </a>        
                </div>      
                
            </div>             
        ))}
        </section>
        </>
    )
}



export default AlunoHome;
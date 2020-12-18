import React, { useState, useEffect } from 'react';
import './MainCadastro.css';
import api from '../../../services/api';
import { cpf } from 'cpf-cnpj-validator';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import '../../../CSS/global.css';
import history from '../../../pages/history';






var validator = require("email-validator");



function MainCadastro() {





    //Data
    const [date, setDate] = React.useState(new Date('Fri Jan 01 1900 12:48:00 GMT-0300 '));

    const handleDateChange = (date) => {
        setDate(date);
    };



    // Regras de Telas
    const [loading, setLoading] = useState(true)
    const [CadastroOne, setCadastroOne] = useState(false);
    const [select, setSelect] = useState('');
    const [escolhaLogin, setEscolhaLogin] = useState('');

    //ocult outros
    const [none, setNone] = useState('none')
    const [beneficiarioOcult, setBeneficiarioOcult] = useState('none');
    const [unidadeAtendimento, setUnidadeAtendimento] = useState('none');
    const [acessibilidadeOcult, setAcessibilidadeOcult] = useState('none');
    const [patologiaOcult, setPatologiaOcult] = useState('none');
    const [aiOcult, setAiOcult] = useState('none');
    const [sabeCursoOcult, setSabeCursoOcult] = useState('none')

    // caso o radio for outros
    const [outroAcessibildiade, setOutroAcessibilidade] = useState('');
    const [outrosAir, setOutrosAir] = useState('');
    const [outrosPatologia, setOutrosPatologia] = useState('');

    // Telas

    const TipoLogin = ['opção de login', 'Aluno', 'Professor', 'Administrador']
    const Add = TipoLogin.map(Add => Add);
    const handleAddrTypeChange = (e) => setSelect(TipoLogin[e.target.value])


    // Sexo
    const sexo = ['', 'Masculino', 'Feminino'];
    const AddSexo = sexo.map(Add => Add);
    const [escolhaSexo, setEscolhaSexo] = useState('');
    const SelecioneSexo = (e) => setEscolhaSexo(sexo[e.target.value]);

    //naturalidade
    const naturalidade = ['', 'Brasileiro', 'Estrangeiro'];
    const addNaturalidade = naturalidade.map(AddNaturalidade => AddNaturalidade);
    const [escolhaNaturalidade, setEscolhaNaturalidade] = useState('');
    const SelecioneNaturalidade = (e) => setEscolhaNaturalidade(naturalidade[e.target.value]);
    // TipoTelefone
    const tipoTelefone = ['', 'Móvel', 'Fixo'];
    const AddTelefone = tipoTelefone.map(AddTelefone => AddTelefone);
    const [escolhaTipoTelefone, setEscolhaTipoTelefone] = useState('');
    const SelecioneTipoTelefone = (e) => setEscolhaTipoTelefone(tipoTelefone[e.target.value]);

    // Tipo Telefone SOS
    const tipoTelefonesos = ['', 'Móvel', 'Fixo'];
    const addphonesos = tipoTelefonesos.map(addphonesos => addphonesos);
    const [escolhaTipoTelefoneSOS, setEscolhaTipoTelefoneSOS] = useState('');
    const SelecioneTipoTelefoneSOS = (e) => setEscolhaTipoTelefoneSOS(tipoTelefonesos[e.target.value]);

    // Escolha Grau
    const [escolhaGrau, setEscolhaGrau] = useState('');
    const grau = ['', 'Graduado', 'Ensino Médio Completo', 'Mestrado', 'Doutorado']
    const AddGrau = grau.map(AddGrau => AddGrau);
    const SelecioneGrau = (e) => setEscolhaGrau(grau[e.target.value])

    //Escolaridade
    const [escolaridade, setEscolaridade] = useState('');
    //Situação Economica
    const [situacaoEconomica, setSituacaoEconomica] = useState('');
    //aposentando:
    const [aposentado, setAposentado] = useState('');
    //esta trabalhando atualmente ?
    const [trabalho, setTrabalho] = useState('');
    //Especialização;
    const [especializao, setEspecializao] = useState('');
    //Nome e Nome Social;
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    //CPF
    const [cpfPessoa, setCPF] = useState('');
    //DDD e Telefone
    const [DDD, setDDD] = useState('');
    const [numeroTelefone, setNumeroTelefone] = useState('');
    //CEP
    const [CEP, setCEP] = useState('');
    // estado, cidade, bairro, quadra, numero, complemento
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [quadra, setQuadra] = useState('');
    const [numeroCasa, setNumeroCasa] = useState('');
    const [complemento, setComplemento] = useState('');
    //RG, orgão de emissor e UF
    const [rg, setRG] = useState('');
    const [orgaoEmissor, setOrgaoEmissor] = useState('');
    const [UF, setUF] = useState('');
    //email
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('')
    const [confirmaSenha, setConfirmaSenha] = useState('');
    //É beneficiario(A) de Algum programa de governo ? *
    const [beneficiario, setBeneficiario] = useState('');
    //CTPS
    const [CTPS, setCTPS] = useState('');
    //É atendido(a) em alguma unidade de atendimento?*
    const [respostaAtendimento, setRespostaAtendimento] = useState('');
    //Sobre Acessibilidade *
    const [sobreAcessibilidade, setSobreAcessibilidade] = useState('')
    //Patologia:
    const [patologia, setPatologia] = useState('');
    //AI
    const [aiR, setAir] = useState('');
    //descrição de Perfil
    const [descricaoPerfil, setDescriçaoPerfil] = useState('');
    // expriência profissional
    const [expreriencaProfissional, setExpreriencaProfissional] = useState('');
    //estado civil 
    const [estadoCivil, setEstadoCivil] = useState('');
    // cor 
    const [corPele, setCorPele] = useState('');
    // Filhos
    const [filhos, setFilhos] = useState('');





    const [convertTagSexo, setConvertTagSexo] = useState('');
    const [convertTipoTelefone, setConvertTipoTelefone] = useState(0);
    const [convertTipoTelefoneSOS, setConvertTipoTelefoneSOS] = useState(0);


    useEffect(() => {
        if (escolhaSexo === 'Feminino') {
            setConvertTagSexo('F')
        } else if (escolhaSexo === 'Masculino') {
            setConvertTagSexo('M')
        }
        if (escolhaTipoTelefone === 'Fixo') {
            setConvertTipoTelefone(1);
        } else if (escolhaTipoTelefone === 'Móvel') {
            setConvertTipoTelefone(2);
        }
        if (escolhaTipoTelefoneSOS === 'Fixo') {
            setConvertTipoTelefoneSOS(1)
        } else if (escolhaTipoTelefoneSOS === 'Móvel') {
            setConvertTipoTelefoneSOS(2)
        }

    }, [escolhaSexo, escolhaTipoTelefone, escolhaTipoTelefoneSOS])





    //Funções do Rádio
    const [mediaSalarial, setMediaSalarial] = useState('');
    const [moradia, setMoradia] = useState('');
    const [sobreFinancas, setSobreFinancas] = useState('');
    const [locomocao, setLocomocao] = useState('');
    const [saberCurso, setCurso] = useState('');

    // Contato Emergencia 
    const [dddSOS, setDddSOS] = useState('');
    const [nomeSOS, setNomeSOS] = useState('');
    const [telefoneSOS, setTelefoneSOS] = useState('');


    useEffect(() => {

        if (select === 'Opção de login') {
            setSelect('')
            setLoading(true);
        }
        else if (select === 'Aluno') {
            setSelect('ALUNO')
            setLoading(false);
        }
        else if (select === 'Administrador') {
            setEscolhaLogin('ADM');
            setCadastroOne(true);
            setLoading(false);
            setSelect('')

        }
        else if (select === 'Professor') {
            setEscolhaLogin('PROFESSOR');
            setLoading(false);
            setCadastroOne(true);
            setSelect('');


        }

    }, [select]);





    async function CriarCadastroProfessorAdministrador() {

        const validarSenha = senha === confirmaSenha;

        if (validarSenha === false || senha === '') {
            return alert("Senhas não se coincidem")
        }
        else if (validator.validate(email) === false) {
            return alert('Email inválido')
        }
        else if (
            cpf.isValid(cpfPessoa) === true &&
            !nome === false &&
            !nomeSocial === false &&
            !escolhaNaturalidade === false &&
            !date === false &&
            !convertTagSexo === false &&
            !DDD === false &&
            convertTipoTelefone !== 0 &&
            !numeroTelefone === false &&
            !CEP === false &&
            !estado === false &&
            !cidade === false &&
            !bairro === false &&
            !quadra === false &&
            !numeroCasa === false &&
            !complemento === false &&
            !escolhaGrau === false &&
            !especializao === false &&
            !rg === false &&
            !orgaoEmissor === false &&
            !UF === false &&
            !email === false
        ) {
            const result = await api.post('/cadastro', {
                cpf: cpfPessoa,
                nome: nome,
                nome_social: nomeSocial,
                nome_tipo_login: escolhaLogin,
                naturalidade: escolhaNaturalidade,
                nascimento: date,
                sexo: convertTagSexo,
                ddd: DDD,
                id_tipo_telefone: convertTipoTelefone,
                numero_telefone: numeroTelefone,
                cep: CEP,
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                quadra: quadra,
                numero_endereco: numeroCasa,
                complemento: complemento,
                grau_formacao: escolhaGrau,
                especializacao: especializao,
                numero_rg: rg,
                orgao_emissor: orgaoEmissor,
                uf: UF,
                email: email,
                senhaemail: senha
            });
        
            const response = result.data;
            window.alert(response)
            if(response === 'Cadastrado com Sucesso!'){
                return history.push('/login')
 
            }
        }
        else if (cpf.isValid(cpfPessoa) === false) {
            alert('CPF inválido')
        } else if (nome === '') {
            alert('Digite seu nome')
        } else if (nomeSocial === '') {
            alert('Digite seu nome social ou digite Nenhum')
        } else if (escolhaNaturalidade === '') {
            alert('Escolha uma Naturalidade')
        } else if (date === '') {
            alert('Preencha seu nascimento')
        } else if (convertTagSexo === '') {
            alert('Escolha seu sexo')
        } else if (DDD === '') {
            alert('Digite o DDD do seu Telefone')
        } else if (convertTipoTelefone === 0) {
            alert('Selecione o tipo de Telefone!')
        } else if (numeroTelefone === '') {
            alert('Digite seu número de Telefone!')
        } else if (CEP === '') {
            alert('Digite seu CEP!')
        } else if (estado === '') {
            alert('Digite seu Estado!')
        } else if (cidade === '') {
            alert('Digite sua Cidade!')
        } else if (bairro === '') {
            alert('Digite seu bairro!')
        } else if (quadra === '') {
            alert('Digite sua quadra!')
        } else if (numeroCasa === '') {
            alert('Digite número da sua casa!')
        } else if (complemento === '') {
            alert('Digite complemento da sua casa!')
        } else if (escolhaGrau === '') {
            alert('Digite escolha um Grau de Formação')
        } else if (especializao === '') {
            alert('Digite uma Especialização se não houver, digite Nenhum!')
        } else if (rg === '') {
            alert('Digite o seu RG')
        } else if (orgaoEmissor === '') {
            alert('Digite o Orgão de Emissor do RG')
        } else if (UF === '') {
            alert('Digite a UF do RG')
        } else if (email === '') {
            alert('Digite a o seu Email')
        }
    }
    async function CriarCadastroAluno() {
        const validarSenha = senha === confirmaSenha;
        if (validarSenha === false || senha === '') {
            return alert("Senhas não se coincidem")
        }
        else if (validator.validate(email) === false) {
            return alert('Email inválido')
        }
        else if (
            cpf.isValid(cpfPessoa) === true &&
            !nome === false &&
            !nomeSocial === false &&
            !escolhaNaturalidade === false &&
            !date === false &&
            !convertTagSexo === false &&
            !DDD === false &&
            convertTipoTelefone !== 0 &&
            !numeroTelefone === false &&
            !CEP === false &&
            !estado === false &&
            !cidade === false &&
            !bairro === false &&
            !quadra === false &&
            !numeroCasa === false &&
            !complemento === false &&
            !rg === false &&
            !orgaoEmissor === false &&
            !UF === false &&
            !email === false &&
            !mediaSalarial === false &&
            !moradia === false &&
            !sobreFinancas === false &&
            !nomeSOS === false &&
            !dddSOS === false &&
            convertTipoTelefoneSOS !== 0 &&
            !locomocao === false &&
            !descricaoPerfil === false &&
            !expreriencaProfissional === false &&
            !estadoCivil === false &&
            !corPele === false &&
            !filhos === false &&
            !escolaridade === false &&
            !situacaoEconomica === false &&
            !aposentado === false &&
            !trabalho === false &&
            !CTPS === false &&
            !beneficiario === false &&
            !respostaAtendimento === false &&
            !saberCurso === false &&
            !patologia === false &&
            !aiR === false &&
            !sobreAcessibilidade === false
        ) {
            const result = await api.post('/cadastro', {
                cpf: cpfPessoa,
                nome: nome,
                nome_social: nomeSocial,
                nome_tipo_login: escolhaLogin,
                naturalidade: escolhaNaturalidade,
                nascimento: date,
                sexo: convertTagSexo,
                ddd: DDD,
                id_tipo_telefone: convertTipoTelefone,
                numero_telefone: numeroTelefone,
                cep: CEP,
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                quadra: quadra,
                numero_endereco: numeroCasa,
                complemento: complemento,
                numero_rg: rg,
                orgao_emissor: orgaoEmissor,
                uf: UF,
                email: email,
                senhaemail: senha,
                tipo_telefone_sos: convertTipoTelefoneSOS,
                ddd_SOS: dddSOS,
                numero_SOS: telefoneSOS,
                nome_SOS: nomeSOS,
                estado_civil: estadoCivil,
                raca: corPele,
                moradia: moradia,
                rendasalarial: mediaSalarial, //salario medio
                adm_financeira: sobreFinancas,
                locomacao: locomocao,
                escolaridade: escolaridade,
                situacao_economica: situacaoEconomica,
                ocupacao: trabalho, //trabalhando atualmente
                aposentado: aposentado,
                ultima_profissao: CTPS, //ctps
                prog_social: beneficiario, // É beneficiario(A) de Algum programa de governo ? *
                atendimento: respostaAtendimento,// É atendido(a) em alguma unidade de atendimento?*
                descricao_perfil: descricaoPerfil,
                experiencia_profissional: expreriencaProfissional,
                conhecimento_curso: saberCurso,
                patologia: patologia,
                autonomia: aiR,
                filhos: filhos,
                acessibilidade: sobreAcessibilidade,
                dado_patologia: outrosPatologia,
                dado_autonomia: outrosAir,
                dado_acessibilidade: outroAcessibildiade

            });
            const response = result.data;
            window.alert(response)
            history.push('/login')
        }
        else if (cpf.isValid(cpfPessoa) === false) {
            alert('CPF inválido')
        }
        else if (nome === '') {
            alert('Digite seu nome')
        }
        else if (nomeSocial === '') {
            alert('Digite seu nome social ou digite Nenhum')
        }
        else if (escolhaNaturalidade === '') {
            alert('Escolha uma Naturalidade')
        }
        else if (date === '') {
            alert('Preencha seu nascimento')
        }
        else if (convertTagSexo === '') {
            alert('Escolha seu sexo')
        }
        else if (DDD === '') {
            alert('Digite o DDD do seu Telefone')
        }
        else if (convertTipoTelefone === 0) {
            alert('Selecione o tipo de Telefone!')
        }
        else if (numeroTelefone === '') {
            alert('Digite seu número de Telefone!')
        }
        else if (CEP === '') {
            alert('Digite seu CEP!')
        }
        else if (estado === '') {
            alert('Digite seu Estado!')
        }
        else if (cidade === '') {
            alert('Digite sua Cidade!')
        }
        else if (bairro === '') {
            alert('Digite seu bairro!')
        }
        else if (quadra === '') {
            alert('Digite sua quadra!')
        }
        else if (numeroCasa === '') {
            alert('Digite número da sua casa!')
        }
        else if (complemento === '') {
            alert('Digite complemento da sua casa!')
        }
        else if (rg === '') {
            alert('Digite o seu RG')
        }
        else if (orgaoEmissor === '') {
            alert('Digite o Orgão de Emissor do RG')
        }
        else if (UF === '') {
            alert('Digite a UF do RG')
        }
        else if (email === '') {
            alert('Digite a o seu Email')
        }
        else if (mediaSalarial === '') {
            alert('Marque sua media salarial')
        }
        else if (moradia === '') {
            alert('Marque sua moradia')
        }
        else if (sobreFinancas === '') {
            alert('Marque sobre Finanças')
        }
        else if (nomeSOS === '') {
            alert('Digite um nome do contato de Emergência')
        }
        else if (dddSOS === '') {
            alert('Digite o DDD do contato de Emergência')
        }
        else if (telefoneSOS === '') {
            alert('Digite o número do telefone do contato de Emergência')
        }
        else if (convertTipoTelefoneSOS === 0) {
            alert('Escolha o tipo telefone do contato de Emergência')
        }
        else if (locomocao === '') {
            alert('Selecione a sua locomoçao')
        }
        else if (descricaoPerfil === '') {
            alert('Preencha o campo Descrição do Perfil')
        }
        else if (expreriencaProfissional === '') {
            alert('Preencha o Campo da experiência profissional, caso não tenha digite nenhum.')
        }
        else if (estadoCivil === '') {
            alert('Selecione a seu estado cívil')
        }
        else if (corPele === '') {
            alert('Selecione "Você se considera"')
        }
        else if (filhos === '') {
            alert('Marque a uma opção sobre Filhos')
        }
        else if (escolaridade === '') {
            alert('Marque sua Escolaridade')
        }
        else if (situacaoEconomica === '') {
            alert('Selecione a sua situação econômica')
        }
        else if (aposentado === '') {
            alert('Marque a uma opção sobre aposentadoria')
        }
        else if (trabalho === '') {
            alert('Selecione Esta trabalhando atualmente ? *')
        }
        else if (CTPS === '') {
            alert('Selecione Ultima Profissão registrada na carteira de trabalho e previdencia social - CTPS ? *')
        }
        else if (beneficiario === '') {
            alert('É beneficiario(a) de Algum programa de governo ? *')
        }
        else if (respostaAtendimento === '') {
            alert('Selecione alguma alternativa da pergunta É atendido(a) em alguma unidade de atendimento?*')
        }
        else if (saberCurso === '') {
            alert('Selecione de como você ficou sabendo sobre o Curso!')
        }
        else if (patologia === '') {
            alert('Selecione sobre Patologia')
        }
        else if (aiR === '') {
            alert('autonomia')

            alert('Selecione sobre Autonômia')
        }
        else if (sobreAcessibilidade === '') {
            alert('acessibilidade')
        }

    }
    async function maxLengthCheck(object) {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }


   

    if (loading) {
        return (
            <div class="campo">
                <p>Opção de Usuário</p>
                <select
                    onChange={e => handleAddrTypeChange(e)}
                    class="input-global-cadastro-first-entrada select"
                    id="tipo_login"
                    name="login"
                >
                    {
                        Add.map((address, key) =>
                            <option value={key}>{address}</option>)
                    }
                </select>
            </div>
        );
    }
    if (CadastroOne) {
        return (
            <>
                <div class='flex-admin-professor'>
                    <div class='coluna-cadastro-first-admin'>
                        <div class="campo">
                            <p>Nome </p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="nome"
                                name="nome"
                                required="required"
                                type="text"
                                placeholder="Nome Completo"
                                onChange={({ target: { value } }) => setNome(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Possui um nome Social ?</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="nome_social"
                                name="nome_social"
                                required="required"
                                type="text"
                                placeholder="Nome Social"
                                onChange={({ target: { value } }) => setNomeSocial(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>CPF</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="cpf"
                                name="cpf"
                                required="required"
                                type="number"
                                placeholder="Ex.: 00000000000"
                                onInput={maxLengthCheck}
                                maxLength={11}
                                onChange={({ target: { value } }) => setCPF(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>DDD:</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="DDD"
                                name="ddd"
                                required="required"
                                type="number"
                                onInput={maxLengthCheck}
                                maxLength={3}
                                placeholder="(00)"
                                onChange={({ target: { value } }) => setDDD(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Tipo Telefone</p>
                            <select
                                onChange={e => SelecioneTipoTelefone(e)}
                                class="input-global-cadastro-first-entrada"
                                id="tipoTelefoneOne"
                                name="tipoTelefoneOne"
                            >
                                {
                                    AddTelefone.map((address, key) =>
                                        <option value={key}>{address}</option>)
                                }
                            </select>
                        </div>
                        <div class="campo">
                            <p>telefone</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="telefone"
                                name="telefone"
                                required="required"
                                type="number"
                                placeholder="0000-0000"
                                maxLength={15}
                                onInput={maxLengthCheck}
                                onChange={({ target: { value } }) => setNumeroTelefone(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>CEP</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="cep"
                                name="cep"
                                required="required"
                                type="number"
                                placeholder="Ex.: 72620680"
                                maxLength={8}
                                onInput={maxLengthCheck}
                                onChange={({ target: { value } }) => setCEP(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Estado</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="estado"
                                name="estado"
                                required="required"
                                type="text"
                                placeholder="Ex.: Distrito Federal"
                                onChange={({ target: { value } }) => setEstado(value)}

                            />
                        </div>
                        <div class="campo">
                            <p>Cidade</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="Cidade"
                                name="Cidade"
                                required="required"
                                type="text"
                                placeholder="Ex.: Taguatinga"
                                onChange={({ target: { value } }) => setCidade(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Bairro</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="Bairro"
                                name="Bairro"
                                required="required"
                                type="text"
                                onChange={({ target: { value } }) => setBairro(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Quadra</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="quadra"
                                name="quadra"
                                required="required"
                                type="text"
                                placeholder="Quadra"
                                onChange={({ target: { value } }) => setQuadra(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Número</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="numero"
                                name="number"
                                type="number"
                                required="required"
                                maxLength={3}
                                onInput={maxLengthCheck}
                                placeholder="09"
                                onChange={({ target: { value } }) => setNumeroCasa(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Complemento</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="numero"
                                name="numero"
                                required="required"
                                type="text"
                                onChange={({ target: { value } }) => setComplemento(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Grau de Formação</p>
                            <select

                                onChange={e => SelecioneGrau(e)}
                                class="input-global-cadastro-first-entrada"
                                id="tipo_login"
                                name="login"
                            >
                                {
                                    AddGrau.map((address, key) =>
                                        <option value={key}>{address}</option>)
                                }
                            </select>
                        </div>
                        <div class="campo">
                            <p>Especialização</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="especializacao"
                                name="especializacao"
                                required="especializacao"
                                type="text"
                                maxLength={15}

                                onChange={({ target: { value } }) => setEspecializao(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Naturalidade </p>
                            <select
                                onChange={e => SelecioneNaturalidade(e)}
                                class="input-global-cadastro-first-entrada"
                                id="naturalidade"
                                name="naturalidade"
                            >
                                {
                                    addNaturalidade.map((address, key) =>
                                        <option value={key}>{address}</option>)
                                }
                            </select>
                        </div>
                        <div class="campo">
                            <p>RG</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="num"
                                name="rg"
                                required="required"
                                type="number"
                                placeholder="Ex.: 000000"
                                onInput={maxLengthCheck}
                                maxLength={7}
                                onChange={({ target: { value } }) => setRG(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Orgão de Emissor</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="OrgEmissor"
                                name="OrgEmissor"
                                required="required"
                                type="text"
                                maxLength={6}
                                placeholder="Ex: SSP"
                                onChange={({ target: { value } }) => setOrgaoEmissor(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>UF</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="UF"
                                name="UF"
                                required="required"
                                type="text"
                                placeholder="Ex: DF"
                                maxLength={2}
                                onChange={({ target: { value } }) => setUF(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Data Nascimento</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        className="input-data"
                                        margin="normal"
                                        id="date-picker-dialog"
                                        format="dd/MM/yyyy"
                                        value={date}
                                        onChange={handleDateChange}
                                        // ref={nascimento_ok}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div class="campo">
                            <p>E-mail</p>
                            <input
                                type="text"
                                class="input-global-cadastro-first-entrada"
                                placeholder="exemplo@gmail.com"
                                onChange={({ target: { value } }) => setEmail(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Senha</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="senha"
                                name="senha"
                                required="required"
                                type="password"
                                placeholder="Senha"
                                onChange={({ target: { value } }) => setSenha(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Confirmação senha:</p>
                            <input
                                class="input-global-cadastro-first-entrada"
                                id="confirmasenha"
                                name="confirmasenha"
                                required="required"
                                type="password"
                                placeholder="Confirmar senha"
                                onChange={({ target: { value } }) => setConfirmaSenha(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Sexo</p>
                            <select
                                onChange={e => SelecioneSexo(e)}
                                class="input-global-cadastro-first-entrada"
                                id="tipo_login"
                                name="login"
                            >
                                {
                                    AddSexo.map((address, key) =>
                                        <option value={key}>{address}</option>)
                                }
                            </select>
                        </div>
                        <div class="campo espaco">
                            <div class="">
                                <input
                                    class="submit-env"
                                    type="button"
                                    value="Enviar"
                                    onClick={CriarCadastroProfessorAdministrador}
                                />

                            </div>
                            <div class="">
                                <input
                                    class="submit-cancel"
                                    type="button"
                                    value="Cancelar"
                                />
                            </div>
                        </div>


                    </div>
                </div>
            </>
        );
    }



    return (
        <>
            <div className='flex-admin-professor'>
                <div class='coluna-cadastro-first-admin'>
                    <div class="campo">
                        <p>Nome</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="nome"
                            name="nome"
                            required="required"
                            type="text"
                            placeholder="Nome Completo"
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Possui um nome Social ?</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="nome_social"
                            name="nome_social"
                            required="required"
                            type="text"
                            placeholder="Nome Social"
                            onChange={({ target: { value } }) => setNomeSocial(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>CPF</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="cpf"
                            name="cpf"
                            required="required"
                            type="number"
                            placeholder="Ex.: 00000000000"
                            onInput={maxLengthCheck}
                            maxLength={19}
                            onChange={({ target: { value } }) => setCPF(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>DDD:</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="DDD"
                            name="ddd"
                            required="required"
                            placeholder="00"

                            type="number"
                            onInput={maxLengthCheck}
                            maxLength={3}
                            onChange={({ target: { value } }) => setDDD(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Tipo Telefone</p>
                        <select
                            onChange={e => SelecioneTipoTelefone(e)}
                            class="input-global-cadastro-first-entrada select"
                            id="tipo_login"
                            name="login"
                        >
                            {
                                AddTelefone.map((address, key) =>
                                    <option value={key}>{address}</option>)
                            }
                        </select>
                    </div>
                    <div class="campo">
                        <p>telefone</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="telefone"
                            name="telefone"
                            required="required"
                            type="number"
                            maxLength={15}
                            onInput={maxLengthCheck}
                            onChange={({ target: { value } }) => setNumeroTelefone(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>CEP</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="cep"
                            name="cep"
                            required="required"
                            type="number"
                            placeholder="Ex.: 72620680"
                            maxLength={8}
                            onInput={maxLengthCheck}
                            onChange={({ target: { value } }) => setCEP(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Estado</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="estado"
                            name="estado"
                            required="required"
                            type="text"
                            placeholder="Ex.: Distrito Federal"
                            onChange={({ target: { value } }) => setEstado(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Cidade</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="Cidade"
                            name="Cidade"
                            required="required"
                            type="text"
                            placeholder="Ex.: Taguatinga"
                            onChange={({ target: { value } }) => setCidade(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Bairro</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="Bairro"
                            name="Bairro"
                            required="required"
                            type="text"
                            onChange={({ target: { value } }) => setBairro(value)}

                        />
                    </div>
                    <div class="campo">
                        <p>Quadra</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="quadra"
                            name="quadra"
                            required="required"
                            type="text"
                            placeholder="Quadra"
                            onChange={({ target: { value } }) => setQuadra(value)}
                        />
                    </div>

                    <div class="campo">
                        <p>Número</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="numero"
                            name="numero"
                            required="required"
                            type="number"
                            placeholder="09"
                            maxLength={20}
                            onInput={maxLengthCheck}
                            onChange={({ target: { value } }) => setNumeroCasa(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Complemento</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="numero"
                            name="numero"
                            required="required"
                            type="text"
                            placeholder=""
                            onChange={({ target: { value } }) => setComplemento(value)}
                        />
                    </div>

                    <div class="campo">
                        <p>Naturalidade2</p>
                        <select
                            onChange={e => SelecioneNaturalidade(e)}
                            class="input-global-cadastro-first-entrada select"
                            id="naturalidade"
                            name="naturalidade"
                        >
                            {
                                addNaturalidade.map((address, key) =>
                                    <option value={key}>{address}</option>)
                            }
                        </select>
                    </div>
                    <div class="campo">
                        <p>RG</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="rg"
                            name="rg"
                            required="required"
                            type="number"
                            placeholder="Ex.: 000000"
                            onInput={maxLengthCheck}
                            maxLength={7}
                            onChange={({ target: { value } }) => setRG(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Orgão de Emissor</p>
                        <input
                            className="input-global-cadastro-first-entrada"
                            id="OrgEinput-global-cadastro-first-entradamissor"
                            name="OrgEmissor"
                            required="required"
                            type="text"
                            maxLength={6}
                            placeholder="Ex: SSP"
                            onChange={({ target: { value } }) => setOrgaoEmissor(value)}

                        />
                    </div>
                    <div class="campo">
                        <p>UF</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="UF"
                            name="UF"
                            required="required"
                            type="text"
                            placeholder="Ex: DF"
                            maxLength={2}
                            onChange={({ target: { value } }) => setUF(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Data Nascimento</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    className="input-data"
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="dd/MM/yyyy"
                                    value={date}
                                    onChange={handleDateChange}
                                    // ref={nascimento_ok}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div class="campo">
                        <p>E-mail</p>
                        <input
                            type="text"
                            class="input-global-cadastro-first-entrada"
                            placeholder="exemplo@gmail.com"
                            onChange={({ target: { value } }) => setEmail(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Senha</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="senha"
                            name="senha"
                            required="required"
                            type="password"
                            placeholder="Senha"
                            onChange={({ target: { value } }) => setSenha(value)}

                        />
                    </div>
                    <div class="campo">
                        <p>Confirmação senha:</p>
                        <input
                            className="input-global-cadastro-first-entrada"
                            id="confirmasenha"
                            name="confirmasenha"
                            required="required"
                            type="password"
                            placeholder="Confirmar senha"
                            onChange={({ target: { value } }) => setConfirmaSenha(value)}
                        />
                    </div>
                    <div className="campo">
                        <p>Sexo</p>
                        <select
                            onChange={e => SelecioneSexo(e)}
                            class="input-global-cadastro-first-entrada select"
                            id="sexo"
                            name="sexo"
                        >
                            {
                                AddSexo.map((address, key) =>
                                    <option value={key}>{address}</option>)
                            }
                        </select>
                    </div>
                    <div className="preenchimento-obrigatorio">
                        <h2 className="stylesH2">Preenchimento obrigatório</h2>
                        <p>Qual sua média salarial?*</p>
                        <label for="m1">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m1"
                                name="qms"
                                value="Até 1 Salário minímo"
                                onChange={({ target: { value } }) => setMediaSalarial(value)}
                            />
                            Até 1 salários minímo</label>
                        <label for="m2">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m2"
                                name="qms"
                                value="de 2 à 3 salários minimos"
                                onChange={e => setMediaSalarial(e.target.value)}
                            />
                                De 2 à 3 salários minímos
                            </label>
                        <label for="m3">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m3"
                                name="qms"
                                value="De 3 a 4 Salario Minimos"
                                onChange={e => setMediaSalarial(e.target.value)}
                            />
                                De 3 a 4 Salario Minimos
                            </label>
                        <label for="m4">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m4"
                                name="qms"
                                value="A cima de 5 Salarios Minimos"
                                onChange={e => setMediaSalarial(e.target.value)}
                            />
                                A cima de 5 Salarios Minimos
                            </label>

                        <p>Qual sua moradia?* *</p>
                        <label for="m5">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m5"
                                name="moradia"
                                value="Casa própria"
                                onChange={e => setMoradia(e.target.value)}
                            />
                                Casa própria</label>
                        <label for="m6">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m6"
                                name="moradia"
                                value="Casa Alugada"
                                onChange={e => setMoradia(e.target.value)}
                            />
                                Casa Alugada</label>

                        <label for="m7">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m7"
                                name="moradia"
                                value="Casa financiada"
                                onChange={e => setMoradia(e.target.value)}
                            />
                                    Casa financiada</label>

                        <label for="m8">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m8"
                                name="moradia"
                                value="Mora na casa de filhos / parentes"
                                onChange={e => setMoradia(e.target.value)}
                            />
                                    Mora na casa de filhos / parentes
                                </label>
                        <label for="m9">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m9"
                                name="moradia"
                                value="ILPI’S (ASILOS)"
                                onChange={e => setMoradia(e.target.value)}
                            />
                                ILPI’S (ASILOS)</label>
                        <p>Sobre as proprias finanças. *</p>
                        <label for="m10">
                            <input
                                class="space-radio"
                                type="radio"
                                id="m10"
                                name="SobreFinancas"
                                value="Administrar as proprias finanças"
                                onChange={e => setSobreFinancas(e.target.value)}
                            />
                                    Administrar as proprias finanças
                                </label>
                        <label for="m11">
                            <input
                                class="space-radio"
                                type="radio"
                                id="m11"
                                name="SobreFinancas"
                                value="Finanças administrada por terceiros"
                                onChange={e => setSobreFinancas(e.target.value)}
                            />
                                    Finanças administrada por terceiros.
                                </label>

                        {/* locomoção */}
                        <p>Assinale o tipo de locomoção que costuma utilizar.</p>
                        <label for="m12">
                            <input
                                class="space-radio"
                                type="radio"
                                id="m12"
                                name="transporte"
                                value="Carro Proprio"
                                onClick={() => setNone('none')}
                                onChange={({ target: { value } }) => setLocomocao(value)}

                            />
                                    Carro Próprio.</label>
                        <label for="m13">
                            <input
                                class="space-radio"
                                type="radio"
                                id="m13"
                                name="transporte"
                                value="Carro Conduzido por Familiares"
                                onClick={() => setNone('none')}
                                onChange={({ target: { value } }) => setLocomocao(value)}
                            />
                                        Carro Conduzido por Familiares
                                    </label>
                        <label for="m14">
                            <input
                                class="space-radio"
                                type="radio"
                                id="m14"
                                name="transporte"
                                value="Moto"
                                onClick={() => setNone('none')}
                                onChange={({ target: { value } }) => setLocomocao(value)}
                            />
                                            Moto
                                    </label>
                        <label for="m15">
                            <input
                                type="radio"
                                class="space-radio"
                                id="m15"
                                name="transporte"
                                value="Transporte Público"
                                onClick={() => setNone('none')}
                                onChange={({ target: { value } }) => setLocomocao(value)}
                            />
                                        Transporte Público
                                    </label>
                        <label for="m16">
                            <input
                                class="space-radio"
                                type="radio"
                                id="m16"
                                name="transporte"
                                value="Bicicleta"
                                onClick={() => setNone('none')}
                                onChange={({ target: { value } }) => setLocomocao(value)}
                            />
                                        Bicicleta</label>
                        <label for="m17">
                            <input
                                class="space-radio"
                                type="radio"
                                id="m17"
                                name="transporte"
                                value="taxi-uber"
                                onClick={() => setNone('none')}
                                onChange={({ target: { value } }) => setLocomocao(value)}
                            />
                                    Taxi / Uber</label>
                        <label for="m18">
                            <input
                                class="space-radio"
                                type="radio"
                                id="m18"
                                name="transporte"
                                value="Outros"
                                onClick={() => setNone('input-global-cadastro-first-entrada')}
                            />
                                    Outros</label>
                        <input
                            class={none}
                            id="nome"
                            name="resposta" required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setLocomocao(value)}
                        />

                        {/* Estado Civil */}
                        <p>Estado Civil: </p>
                        <label for="solteiro">
                            <input
                                class="space-radio"
                                type="radio"
                                id="solteiro"
                                name="relacao"
                                value="Solteiro"
                                onChange={({ target: { value } }) => setEstadoCivil(value)}
                            />
                                            Solteiro
                                    </label>
                        <label for="casado">
                            <input
                                class="space-radio"
                                type="radio"
                                id="casado"
                                name="relacao"
                                value="Casado"
                                onChange={({ target: { value } }) => setEstadoCivil(value)} />
                                        Casado</label>
                        <label for="viuvo">
                            <input
                                class="space-radio"
                                type="radio"
                                id="viuvo"
                                name="relacao"
                                value="Viúvo"
                                onChange={({ target: { value } }) => setEstadoCivil(value)}

                            />
                                    Viúvo</label>

                        <p>Você se considera : </p>
                        <label for="Branco">
                            <input
                                class="space-radio"
                                type="radio"
                                id="Branco"
                                name="cor"
                                value="Branco"
                                onChange={({ target: { value } }) => setCorPele(value)}
                            />
                                        Branco</label>
                        <label for="Pardo">
                            <input
                                class="space-radio"
                                type="radio"
                                id="Pardo"
                                name="cor"
                                value="Pardo"
                                onChange={({ target: { value } }) => setCorPele(value)}
                            />
                                        Pardo</label>
                        <label for="Preto">
                            <input
                                class="space-radio"
                                type="radio"
                                id="Preto"
                                name="cor"
                                value="Preto"
                                onChange={({ target: { value } }) => setCorPele(value)}
                            />
                                    Preto</label>
                        <p>Tem Filhos  : </p>
                        <label for="simFilhos">
                            <input
                                class="space-radio"
                                type="radio"
                                id="simFilhos"
                                name="filhos"
                                value={true}
                                onChange={({ target: { value } }) => setFilhos(value)}
                            />
                                        Sim</label>
                        <label for="filhosnao">
                            <input
                                class="space-radio"
                                type="radio"
                                id="filhosnao"
                                name="filhos"
                                value={false}
                                onChange={({ target: { value } }) => setFilhos(value)}
                            />
                                    Não
                        </label>

                        <h2 class="stylesH2">Escolaridade*</h2>
                        <label for="m20">
                            <input
                                class="space-radio"
                                type="radio"
                                id="m20"
                                name="escolaridade"
                                value="Analfabeto"
                                onChange={({ target: { value } }) => setEscolaridade(value)}
                            />
                                Analfabeto
                        </label>
                        <label class="space-radio" for="m21">
                            <input
                                class="space-radio"
                                type="radio"
                                id="m21"
                                name="escolaridade"
                                value="Saber ler e Escrever"
                                onChange={({ target: { value } }) => setEscolaridade(value)}
                            />
                        Saber ler e Escrever</label>
                        <label for="m23">
                            <input
                                type="radio"
                                class="space-radio"
                                id="m23"
                                name="escolaridade"
                                value="Ensino Fundamental I (1° ao 4° Ano)"
                                onChange={({ target: { value } }) => setEscolaridade(value)}
                            />
                        Ensino Fundamental I (1° ao 4° Ano)</label>

                        <label for="m24">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m24"
                                name="escolaridade"
                                value="Ensino Fundamental II (5° ao 9° Ano)"
                                onChange={({ target: { value } }) => setEscolaridade(value)}
                            />
                        Ensino Fundamental II (5° ao 9° Ano)</label>

                        <label for="m25">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m25"
                                name="escolaridade"
                                value="Graduação"
                                onChange={({ target: { value } }) => setEscolaridade(value)}
                            />
                       Graduação</label>
                        <label for="m26">
                            <input
                                className="space-radio"
                                type="radio"
                                id="m26"
                                name="escolaridade"
                                value="Pós Graduação"
                                onChange={({ target: { value } }) => setEscolaridade(value)}
                            />
                            Pós Graduação</label>

                        <h2 className="stylesH2">Socio Econômico *</h2>
                        <p>Como você classifica a sua situação econômica ? *</p>
                        <label for="pessima">
                            <input
                                className="space-radio"
                                type="radio"
                                id="pessima"
                                name="economia"
                                value="Péssima"
                                onChange={({ target: { value } }) => setSituacaoEconomica(value)}
                            />
                            Péssima</label>

                        <label for="ruim">
                            <input
                                className="space-radio"
                                type="radio"
                                id="ruim"
                                name="economia"
                                value="Ruim"
                                onChange={({ target: { value } }) => setSituacaoEconomica(value)}
                            />
                            Ruim</label>

                        <label for="regular">
                            <input
                                className="space-radio"
                                type="radio"
                                id="regular"
                                name="economia"
                                value="Regular"
                                onChange={({ target: { value } }) => setSituacaoEconomica(value)}
                            />
                            Regular</label>
                        <label for="boa">
                            <input
                                className="space-radio"
                                type="radio"
                                id="boa"
                                name="economia"
                                value="Boa"
                                onChange={({ target: { value } }) => setSituacaoEconomica(value)}
                            />
                            Boa</label>
                        <label for="otima">
                            <input
                                className="space-radio"
                                type="radio"
                                id="otima"
                                name="economia"
                                value="Ótima"
                                onChange={({ target: { value } }) => setSituacaoEconomica(value)}
                            />
                            Ótima</label>

                        <p>É aposentado ? *</p>
                        <label for="a1">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a1"
                                name="aposentado"
                                value={true}
                                onChange={({ target: { value } }) => setAposentado(value)}
                            />
                                Sim</label>
                        <label for="a2">
                            <input
                                className="space-radio"
                                type="radio"
                                id="a2"
                                name="aposentado"
                                value={false}
                                onChange={({ target: { value } }) => setAposentado(value)}
                            />
                                 Não</label>


                        <p>Esta trabalhando atualmente ? *</p>
                        <label for="a3">
                            <input
                                className="space-radio"
                                type="radio"
                                id="a3"
                                name="trabalho_a"
                                value={true}
                                onChange={({ target: { value } }) => setTrabalho(value)}
                            />
                            Sim</label>
                        <label for="a4">
                            <input
                                className="space-radio"
                                type="radio"
                                id="a4"
                                name="trabalho_a"
                                value={false}
                                onChange={({ target: { value } }) => setTrabalho(value)}
                            />
                            Não</label>
                        <p>É beneficiario(a) de Algum programa de governo ? *</p>
                        <label for="a6">
                            <input
                                className="space-radio"
                                type="radio"
                                id="a5"
                                name="beneficiarioF"
                                value="Bolsa Familia"
                                onClick={() => setBeneficiarioOcult('none')}
                                onChange={({ target: { value } }) => setBeneficiario(value)}
                            />
                            Bolsa Familia</label>
                        <label for="a8">
                            <input
                                class="space-radio"
                                type="radio"
                                id="a7"
                                name="beneficiarioF"
                                value="Benefício de Prestação Continuada"
                                onClick={() => setBeneficiarioOcult('none')}
                                onChange={({ target: { value } }) => setBeneficiario(value)}

                            />
                            Benefício de Prestação Continuada</label>
                        <label for="a9">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a9"
                                name="beneficiarioF"
                                value="DF sem miséria"
                                onClick={() => setBeneficiarioOcult('none')}
                                onChange={({ target: { value } }) => setBeneficiario(value)}
                            />
                            DF sem miséria </label>
                        <label for="a10">
                            <input
                                class="space-radio"
                                type="radio"
                                for="a10"
                                name="beneficiarioF"
                                value="Outros"
                                onClick={() => setBeneficiarioOcult('input-global-cadastro-first-entrada')}
                            />
                            Outros:</label><br />
                        <input
                            class={beneficiarioOcult}
                            id="a10"
                            name="beneficiarioF"
                            required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setBeneficiario(value)}

                        />

                        <p>É atendido(a) em alguma unidade de atendimento?*</p>
                        <label for="a11">
                            <input
                                class="space-radio"
                                type="radio"
                                id="a11"
                                name="atendimentoUnidade"
                                value="Cras"
                                onClick={() => setUnidadeAtendimento('none')}
                                onChange={({ target: { value } }) => setRespostaAtendimento(value)}
                            />
                        Cras</label>
                        <label for="a12">
                            <input
                                class="space-radio"
                                type="radio"
                                id="a12"
                                name="atendimentoUnidade"
                                value="Creas"
                                onClick={() => setUnidadeAtendimento('none')}
                                onChange={({ target: { value } }) => setRespostaAtendimento(value)}
                            />
                            Creas</label>
                        <label for="a13">
                            <input
                                class="space-radio"
                                type="radio"
                                id="a13"
                                name="atendimentoUnidade"
                                value="Posto de Saúde"
                                onClick={() => setUnidadeAtendimento('none')}
                                onChange={({ target: { value } }) => setRespostaAtendimento(value)}

                            />
                            Posto de Saúde</label>
                        <label for="a14">
                            <input
                                className="space-radio"
                                type="radio" i
                                id="a14"
                                name="atendimentoUnidade"
                                onClick={() => setUnidadeAtendimento('input-global-cadastro-first-entrada')}
                                value={0}
                            />
                            Outros</label><br />
                        <input
                            class={unidadeAtendimento}
                            id="nome"
                            name="resposta"
                            required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setRespostaAtendimento(value)}

                        />

                        <h2 class="stylesH2">Avaliação física *</h2>

                        <p>Sobre Acessibilidade *</p>
                        <label for="a15">
                            <input
                                type="radio"
                                id="a15"
                                className="space-radio"
                                name="SobreAcessibilidade"
                                value={1}
                                onClick={() => setAcessibilidadeOcult('none')}
                                onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                            />
                            Se locomove  sem dificuldade</label>
                        <label for="a16">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a16"
                                name="SobreAcessibilidade"
                                value={2}
                                onClick={() => setAcessibilidadeOcult('none')}
                                onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                            />
                            Se locomove  com dificuldade</label>

                        <label for="a17">
                            <input
                                type="radio"
                                id="a17"
                                className="space-radio"
                                name="SobreAcessibilidade"
                                onClick={() => setAcessibilidadeOcult('none')}
                                value={3}
                                onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                            />
                            Se locomove  com o uso de auxiliares de marcha (Andador, Muleta)</label>
                        <label for="a18">
                            <input
                                type="radio"
                                id="a18"
                                name="SobreAcessibilidade"
                                className="space-radio"
                                value={4}
                                onClick={() => setAcessibilidadeOcult('none')}
                                onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                            />
                            Deficiente auditivo</label>
                        <label for="a19">
                            <input
                                className="space-radio"
                                type="radio"
                                id="a19"
                                name="SobreAcessibilidade"
                                value={5}
                                onClick={() => setAcessibilidadeOcult('none')}
                                onChange={({ target: { value } }) => setSobreAcessibilidade(value)}

                            />
                        Deficiente de acuidade auditiva
                        </label>
                        <label for="a20">
                            <input
                                className="space-radio"
                                type="radio"
                                id="a20"
                                name="SobreAcessibilidade"
                                value={6}
                                onClick={() => setAcessibilidadeOcult('none')}
                                onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                            />
                            Deficiente Intelectual
                        </label>

                        <label for="a21">
                            <input
                                className="space-radio"
                                type="radio"
                                id="a21"
                                name="SobreAcessibilidade"
                                value={7}
                                onClick={() => setAcessibilidadeOcult('none')}
                                onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                            />
                            Deficiente visual
                        </label>

                        <label for="a22">
                            <input
                                className="space-radio"
                                type="radio"
                                id="a22"
                                name="SobreAcessibilidade"
                                value={8}
                                onClick={() => setAcessibilidadeOcult('none')}
                                onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                            />
                            Deficiente de acuidade visual</label>

                        <label for="a23">
                            <input
                                className="space-radio"
                                type="radio" i
                                id="a23"
                                name="SobreAcessibilidade"
                                onClick={() => setAcessibilidadeOcult('input-global-cadastro-first-entrada')}
                                value={0}
                                onChange={({ target: { value } }) => setSobreAcessibilidade(value)}

                            />
                            Outros</label>

                        <input
                            className={acessibilidadeOcult}
                            id="nome"
                            name="item8Acessibilidade"
                            type="text"
                            placeholder="sua resposta"
                            for="item9Acessibilidade"
                            onChange={({ target: { value } }) => setOutroAcessibilidade(value)}
                        />

                        <p>Patologia Pré Existentes * </p>

                        <label for="a24">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a24"
                                name="patologia"
                                value={1}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            Diabetes</label>

                        <label for="a25">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a25"
                                name="patologia"
                                value={2}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                        Doenças  cardiacas </label>

                        <label for="a26">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a26"
                                name="patologia"
                                value={3}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                        Hipertensão arterial</label>

                        <label for="a27">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a27"
                                name="patologia"
                                value={4}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            DPOC</label>

                        <label for="a28">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a28"
                                name="patologia"
                                value={5}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            Parkison</label>

                        <label for="a29">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a29"
                                name="patologia"
                                value={6}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            Alzheimer</label>

                        <label for="a30">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a30"
                                name="patologia"
                                value={7}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            Osteoporose
                        </label>

                        <label for="a31">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a31"
                                name="patologia"
                                value={8}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            Doenças de Derme</label>

                        <label for="a32">
                            <input
                                type="radio"
                                id="a32"
                                className="space-radio"
                                name="patologia"
                                value={9}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            Alergias</label>

                        <label for="a33">
                            <input
                                type="radio"
                                id="a33"
                                className="space-radio"
                                name="patologia"
                                value={10}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            Doenças de Derme</label>

                        <label for="a34">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a34"
                                name="patologia"
                                value={11}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                        Depressão</label>

                        <label for="a35">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a35"
                                name="patologia"
                                value={12}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            Osteoporose
                        </label>

                        <label for="a36">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a36"
                                name="patologia"
                                value={13}
                                onClick={() => setPatologiaOcult('none')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            Doenças Urológicas
                        </label>

                        <label for="a37">
                            <input
                                type="radio"
                                className="space-radio"
                                id="a37"
                                name="patologia"
                                value={0}
                                onClick={() => setPatologiaOcult('input-global-cadastro-first-entrada')}
                                onChange={({ target: { value } }) => setPatologia(value)}
                            />
                            Outros
                        </label>
                        <input
                            class={patologiaOcult}
                            id="nome"
                            name="resposta"
                            required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setOutrosPatologia(value)}
                        />


                        <h2 class="stylesH2">Autonomia e Independência * </h2>

                        <label for="AI1">
                            <input
                                className="space-radio"
                                type="radio"
                                id="AI1"
                                name="AI"
                                value={1}
                                onClick={() => setAiOcult('none')}
                                onChange={({ target: { value } }) => setAir(value)}
                            />
                        Depende de cuidadores</label>
                        
                        <label for="AI2">
                            <input
                                className="space-radio"
                                type="radio"
                                id="AI2"
                                name="AI"
                                value={2}
                                onClick={() => setAiOcult('none')}
                                onChange={({ target: { value } }) => setAir(value)}
                            />
                            Depende de acompanhamento
                        </label>

                        <label for="AI3">
                        <input
                            className="space-radio"
                            type="radio"
                            id="AI3"
                            name="AI"
                            value={3}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                            Independente</label>

                        <label for="AI4">
                            <input
                                className="space-radio"
                                type="radio"
                                id="AI4"
                                name="AI"
                                value={4}
                                onClick={() => setAiOcult('none')}
                                onChange={({ target: { value } }) => setAir(value)}
                            />
                            Limpa a casa</label>

                        <label for="AI5">
                            <input
                                className="space-radio"
                                type="radio"
                                id="AI5"
                                name="AI"
                                value={5}
                                onClick={() => setAiOcult('none')}
                                onChange={({ target: { value } }) => setAir(value)}
                            />
                            Cozinha
                        </label>

                        <label for="AI6">
                        <input
                            type="radio"
                            id="AI6"
                            name="AI"
                            value={6}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                            Cuida dos netos / Parentes
                        </label>

                        <label for="AI7">
                        <input
                            className="space-radio"
                            type="radio"
                            id="AI7"
                            name="AI"
                            value={7}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                            Não pratica atividades fisicas
                        </label>

                        <label for="AI8">
                            <input
                                className="space-radio"
                                type="radio"
                                id="AI8"
                                name="AI"
                                value={8}
                                onClick={() => setAiOcult('none')}
                                onChange={({ target: { value } }) => setAir(value)}
                            />
                                Habito de Leitura
                        </label>

                        <label for="AI9">
                        <input  
                            className="space-radio"
                            type="radio"
                            id="AI9"
                            name="AI"
                            value={9}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                            Caminhada
                        </label>

                        <label for="AI10">
                            <input
                                className="space-radio"
                                type="radio"
                                id="AI10"
                                name="AI"
                                value={10}
                                onClick={() => setAiOcult('none')}
                                onChange={({ target: { value } }) => setAir(value)}
                            />
                            Jogos
                        </label>

                        <label for="AI11">
                            <input
                                className="space-radio"
                                type="radio"
                                id="AI11"
                                name="AI"
                                value={11}
                                onClick={() => setAiOcult('none')}
                                onChange={({ target: { value } }) => setAir(value)}
                            />
                                Bailes / Festas
                        </label>

                        <label for="AI12">  
                            <input
                                className="space-radio"
                                type="radio"
                                id="AI12"
                                name="AI"
                                value={12}
                                onClick={() => setAiOcult('none')}
                                onChange={({ target: { value } }) => setAir(value)}
                            />
                            Shopping
                        </label>

                        <label for="AI13">
                            <input
                                className="space-radio"
                                type="radio"
                                id="AI13"
                                name="AI"
                                value={13}
                                onClick={() => setAiOcult('none')}
                                onChange={({ target: { value } }) => setAir(value)}
                            />
                            Vida sexual ativa
                        </label>

                        <label for="AI14">
                        <input
                            className="space-radio"
                            type="radio"
                            id="AI14"
                            name="AI"
                            value={14}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                            Vida sexual inativa
                        </label>
                        
                        <label for="AI16">
                            <input
                                className="space-radio"
                                type="radio"
                                id="AI15"
                                name="AI"
                                value={0}
                                onClick={() => setAiOcult('input-global-cadastro-first-entrada')}
                                onChange={({ target: { value } }) => setAir(value)}

                            />
                            Outros
                        </label>


                        <input
                            class={aiOcult}
                            id="nome"
                            name="resposta"
                            required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setOutrosAir(value)}
                        />

                    <p>Como ficou sabendo do Curso</p>

                        <label for="c1">
                            <input
                                type="radio"
                                className="space-radio"
                                id="c1"
                                name="Saber"
                                value="Demanda espontânea"
                                onClick={() => setSabeCursoOcult('none')}
                                onChange={({ target: { value } }) => setCurso(value)}
                            />
                        Demanda espontânea</label>

                        <label for="c2">
                            <input
                                type="radio"
                                className="space-radio"
                                id="c2"
                                name="Saber"
                                value="Encaminhamento por algum orgão"
                                onClick={() => setSabeCursoOcult('none')}
                                onChange={({ target: { value } }) => setCurso(value)}
                            />
                            Encaminhamento por algum orgão
                        </label>

                        <label for="c3">
                        <input
                            type="radio"
                            className="space-radio"
                            id="c3"
                            name="Saber"
                            value="Informação na comunidade"
                            onClick={() => setSabeCursoOcult('none')}
                            onChange={({ target: { value } }) => setCurso(value)}
                        />
                            Informação na comunidade
                        </label>
                        <label for="c4">
                            <input
                                type="radio"
                                id="c4"
                                name="Saber"
                                className="space-radio"
                                onClick={() => setSabeCursoOcult('none')}
                                onChange={({ target: { value } }) => setCurso(value)}
                            />
                            Mídias
                        </label>
                        <label for="c5">
                        <input
                            className="space-radio"
                            type="radio"
                            id="c5"
                            name="Saber"
                            onClick={() => setSabeCursoOcult('input-global-cadastro-first-entrada')}
                        />
                        Outros</label>
                        <input
                            class={sabeCursoOcult}
                            id="nome"
                            name="resposta"
                            required="required"
                            type="text"
                            onChange={({ target: { value } }) => setCurso(value)}
                            placeholder="sua resposta"
                        />



                        <p>Ultima Profissão registrada na carteira de trabalho e previdencia social - CTPS ? *</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="ctps"
                            name="ctps"
                            required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setCTPS(value)}
                        />


                    </div>

                    <div class="campo">
                        <p>Descrição do Perfil:</p>
                        <textarea
                            class="input-global-cadastro-first-entrada"
                            id="descricaoPerfil"
                            name="descricaoPerfil"
                            required="required"
                            type="text"
                            maxLength={200}

                            placeholder="Fale um pouco de você"
                            onChange={({ target: { value } }) => setDescriçaoPerfil(value)} />
                    </div>
                    <p>Experiência Profissional:</p>
                    <textarea
                        class="input-global-cadastro-first-entrada"
                        id="experienciaprofissional"
                        name="experienciaprofissional"
                        required="required"
                        type="text"
                        maxLength={200}
                        placeholder="Quais são suas experiências profissionais"
                        onChange={({ target: { value } }) => setExpreriencaProfissional(value)}
                    />
                    <div class="campo">
                        <p>Em caso de emergência avisar: *</p>

                        <p>nome:</p>
                        <input
                            className="input-global-cadastro-first-entrada"
                            id="nome"
                            name="nome_sos"
                            required="required"
                            type="text"
                            placeholder="Nome Completo"
                            onChange={
                                ({ target: { value } }) =>
                                    setNomeSOS(value)
                            }

                        />
                    </div>
                    <div class="campo">
                        <p>DDD:</p>
                        <input
                            className="input-global-cadastro-first-entrada"
                            id="DDD"
                            name="ddd"
                            required="required"
                            type="tel"
                            placeholder="(00)"
                            maxLength={3}
                            onChange={
                                ({ target: { value } }) =>
                                    setDddSOS(value)
                            }
                        />
                    </div>
                    <div class="campo">
                        <p>telefone:</p>
                        <input
                            class="input-global-cadastro-first-entrada"
                            id="telefone"
                            name="telefone_sos"
                            required="required"
                            type="tel"
                            placeholder="Ex.: (00) 0000-0000"
                            maxLength={20}
                            onChange={({ target: { value } }) => setTelefoneSOS(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Tipo Telefone:</p>
                        <select
                            onChange={e => SelecioneTipoTelefoneSOS(e)}
                            class="input-global-cadastro-first-entrada select"
                            id="telefoneSOS"
                            name="telefoneSOS"
                        >
                            {
                                addphonesos.map((address, key) =>
                                    <option value={key}>{address}</option>)
                            }
                        </select>
                    </div>
                    <div className="campo">
                        <input className="submit-aluno-env" type="button" value="Enviar" onClick={CriarCadastroAluno} />
                    </div> 
                </div>
            
            </div>
        </>
    );
}



export default MainCadastro;
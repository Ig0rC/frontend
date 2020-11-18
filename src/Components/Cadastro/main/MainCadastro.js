import React, { useState, useEffect } from 'react';
import './MainCadastro.css';
import api from '../../../services/api';


function MainCadastro() {

    //chamada da API



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
    const sexo = ['Selecione Sexo', 'Masculino', 'Feminino'];
    const AddSexo = sexo.map(Add => Add);
    const [escolhaSexo, setEscolhaSexo] = useState('');
    const SelecioneSexo = (e) => setEscolhaSexo(sexo[e.target.value]);

    //naturalidade
    const naturalidade = ['', 'Brasileiro', 'Estrangeio'];
    const addNaturalidade = naturalidade.map(AddNaturalidade => AddNaturalidade);
    const [escolhaNaturalidade, setEscolhaNaturalidade] = useState('');
    const SelecioneNaturalidade = (e) => setEscolhaNaturalidade(naturalidade[e.target.value]);
    // TipoTelefone
    const tipoTelefone = ['Tipo Telefone', 'Móvel', 'Fixo'];
    const AddTelefone = tipoTelefone.map(AddTelefone => AddTelefone);
    const [escolhaTipoTelefone, setEscolhaTipoTelefone] = useState('');
    const SelecioneTipoTelefone = (e) => setEscolhaTipoTelefone(tipoTelefone[e.target.value]);

    // Tipo Telefone SOS
    const tipoTelefonesos = ['Tipo Telefone', 'Móvel', 'Fixo'];
    const addphonesos = tipoTelefonesos.map(addphonesos => addphonesos);
    const [escolhaTipoTelefoneSOS ,setEscolhaTipoTelefoneSOS] = useState('');
    const SelecioneTipoTelefoneSOS = (e) => setEscolhaTipoTelefoneSOS(tipoTelefonesos[e.target.value]);

    // Escolha Grau
    const [escolhaGrau, setEscolhaGrau] = useState('');
    const grau = ['', 'Graduado', 'Ensino Médio Completo', 'Mestrado', 'Doutorado']
    const AddGrau = grau.map(AddGrau => AddGrau);
    const SelecioneGrau = (e) => setEscolhaGrau(grau[e.target.value])
    console.log(escolhaGrau)

    //Escolaridade
    const [escolaridade, setEscolaridade] = useState('');
    //Situação Economica
    const [situacaoEconomica, setSituacaoEconomica] = useState('');
    //aposentando:
    const [aposentado, setAposentado] = useState(false);
    //esta trabalhando atualmente ?
    const [trabalho, setTrabalho] = useState(false);
    //Especialização;
    const [especializao, setEspecializao] = useState('');
    //Nome e Nome Social;
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    //CPF
    const [cpf, setCPF] = useState('');
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
    //data nascimento
    const [date, setDate] = useState('');
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
    const [sobreAcessibilidade, setSobreAcessibilidade] = useState(0)
    //Patologia:
    const [patologia, setPatologia] = useState(0);
    //AI
    const [aiR, setAir] = useState(0);
    //descrição de Perfil
    const [descricaoPerfil, setDescriçaoPerfil] = useState('');
    // expriência profissional
    const [expreriencaProfissional, setExpreriencaProfissional] = useState('');
    //estado civil 
    const [estadoCivil, setEstadoCivil] = useState('');
    // cor 
    const [corPele, setCorPele] = useState('');
    // Filhos
    const [filhos, setFilhos ] = useState(false);





    const [convertTagSexo, setConvertTagSexo] = useState('');
    const [convertTipoTelefone, setConvertTipoTelefone] = useState(0);
    const [convertTipoTelefoneSOS, setConvertTipoTelefoneSOS] = useState(0);

    
    useEffect(() => {
        if (escolhaSexo === 'Feminino') {
            setConvertTagSexo('F')
        } else {
            setConvertTagSexo('M')
        }
        if (escolhaTipoTelefone === 'Fixo') {
            setConvertTipoTelefone(1);
        } else {
            setConvertTipoTelefone(2);
        }
        if(escolhaTipoTelefoneSOS ==='Fixo'){
            setConvertTipoTelefoneSOS(1)
        } else{
            setConvertTipoTelefoneSOS(1)
        }

    }, [escolhaSexo, escolhaTipoTelefone])





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

    // POST NA API 
    console.log(escolhaLogin)
    console.log(convertTipoTelefone)
    console.log(convertTipoTelefoneSOS)
    async function CriarCadastroProfessorAdministrador() {
        try {
            const response = await api.post('/cadastro', {
                cpf: cpf,
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

            console.log(response)
            return window.alert('deu certo')
        } catch (error) {
            console.log('error:', error)
        }
    }
    async function CriarCadastroAluno() {
        try {
            console.log('ok')
            const response = await api.post('/cadastro', {
                cpf: cpf,
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
  
            console.log(response)
            return window.alert('deu certo')
        } catch (error) {
            console.log('error:', error)
        }
    }

    if (loading) {
        return (
            <div class="campo">
                <p>Opção de Usuário</p>
                <select
                    onChange={e => handleAddrTypeChange(e)}
                    class="btn select"
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
                <div class='flex'>
                    <div class='column-1'>
                        <div class="campo">
                            <p>Nome  </p>
                            <input
                                class="btn"
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
                                class="btn"
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
                                class="btn"
                                id="cpf"
                                name="cpf"
                                required="required"
                                type="text"
                                placeholder="Ex.: 000.000.000-00"
                                maxlength={14}
                                onChange={({ target: { value } }) => setCPF(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>DDD:{escolhaNaturalidade}</p>
                            <input
                                class="btn"
                                id="DDD"
                                name="ddd"
                                required="required"
                                type="tel"
                                placeholder="(00)"
                                maxlength={3}
                                onChange={({ target: { value } }) => setDDD(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Tipo Telefone</p>
                            <select
                                onChange={e => SelecioneTipoTelefone(e)}
                                class="btn select"
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
                                class="btn"
                                id="telefone"
                                name="telefone"
                                required="required"
                                type="tel"
                                placeholder="0000-0000"
                                maxlength={12}
                                onChange={({ target: { value } }) => setNumeroTelefone(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>CEP</p>
                            <input
                                class="btn"
                                id="cep"
                                name="cep"
                                required="required"
                                type="text"
                                placeholder="Ex.: 00000-000"
                                maxlength={8}
                                onChange={({ target: { value } }) => setCEP(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Estado</p>
                            <input
                                class="btn"
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
                                class="btn"
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
                                class="btn"
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
                                class="btn"
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
                                class="btn"
                                id="numero"
                                name="numero"
                                required="required"
                                type="text"
                                placeholder="09"
                                onChange={({ target: { value } }) => setNumeroCasa(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Complemento</p>
                            <input
                                class="btn"
                                id="numero"
                                name="numero"
                                required="required"
                                type="text"
                                onChange={({ target: { value } }) => setComplemento(value)}
                            />
                        </div>

                    </div>
                    <div class="column-2">
                        <div class="campo">
                            <p>Grau de Formação</p>
                            <select

                                onChange={e => SelecioneGrau(e)}
                                class="btn select"
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
                                class="btn"
                                id="especializacao"
                                name="especializacao"
                                required="especializacao"
                                type="text"
                                onChange={({ target: { value } }) => setEspecializao(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Naturalidade </p>
                            <select
                                onChange={e => SelecioneNaturalidade(e)}
                                class="btn select"
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
                                class="btn"
                                id="rg"
                                name="rg"
                                required="required"
                                type="number"
                                placeholder="Ex.: 000000"
                                maxlength={14}
                                onChange={({ target: { value } }) => setRG(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Orgão de Emissor</p>
                            <input
                                class="btn"
                                id="OrgEmissor"
                                name="OrgEmissor"
                                required="required"
                                type="text"
                                placeholder="Ex: SSP"
                                onChange={({ target: { value } }) => setOrgaoEmissor(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>UF</p>
                            <input
                                class="btn"
                                id="UF"
                                name="UF"
                                required="required"
                                type="text"
                                placeholder="Ex: DF"
                                maxlength={2}
                                onChange={({ target: { value } }) => setUF(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Data Nascimento</p>
                            <input
                                type="date"
                                class="btn"
                                placeholder="Ex.: dd/mm/aaaa"
                                data-mask="00/00/0000"
                                maxlength="10"
                                autocomplete="off"
                                id="data"
                                name="data"
                                required="required"
                                onChange={({ target: { value } }) => setDate(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>E-mail</p>
                            <input
                                type="text"
                                class="btn2"
                                placeholder="exemplo@gmail.com"
                                onChange={({ target: { value } }) => setEmail(value)}
                            />
                        </div>
                        <div class="campo">
                            <p>Senha</p>
                            <input
                                class="btn"
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
                                class="btn"
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
                                class="btn select"
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
                                    onClick={() => CriarCadastroProfessorAdministrador()}
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
            <div class='flex'>
                <div class='column-1'>
                    <div class="campo">
                        <p>Nome</p>
                        <input
                            class="btn"
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
                            class="btn"
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
                            class="btn"
                            id="cpf"
                            name="cpf"
                            required="required"
                            type="text"
                            placeholder="Ex.: 000.000.000-00"
                            maxLength={19}
                            onChange={({ target: { value } }) => setCPF(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>DDD2:</p>
                        <input
                            class="btn"
                            id="DDD"
                            name="ddd"
                            required="required"
                            type="tel"
                            placeholder="(00)"
                            maxLength={3}
                            onChange={({ target: { value } }) => setDDD(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Tipo Telefone</p>
                        <select
                            onChange={e => SelecioneTipoTelefone(e)}
                            class="btn select"
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
                            class="btn"
                            id="telefone"
                            name="telefone"
                            required="required"
                            type="tel"
                            placeholder="0000-0000"
                            onChange={({ target: { value } }) => setNumeroTelefone(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>CEP</p>
                        <input
                            class="btn"
                            id="cep"
                            name="cep"
                            required="required"
                            type="text"
                            placeholder="Ex.: 00000-000"
                            maxlength={8}
                            onChange={({ target: { value } }) => setCEP(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Estado</p>
                        <input
                            class="btn"
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
                            class="btn"
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
                            class="btn"
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
                            class="btn"
                            id="quadra"
                            name="quadra"
                            required="required"
                            type="text"
                            placeholder="Quadra"
                            onChange={({ target: { value } }) => setQuadra(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Número2</p>
                        <input
                            class="btn"
                            id="numero"
                            name="numero"
                            required="required"
                            type="text"
                            placeholder="09"
                            onChange={({ target: { value } }) => setNumeroCasa(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Complemnto</p>
                        <input
                            class="btn"
                            id="numero"
                            name="numero"
                            required="required"
                            type="text"
                            placeholder=""
                            onChange={({ target: { value } }) => setComplemento(value)}
                        />
                    </div>

                </div>
                <div class="column-2">
                    <div class="campo">
                        <p>Grau de Formação</p>
                        <select
                            onChange={e => SelecioneGrau(e)}
                            class="btn select"
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
                            class="btn"
                            id="especializacao"
                            name="especializacao"
                            required="especializacao"
                            type="text"
                            onChange={({ target: { value } }) => setEspecializao(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Naturalidade2</p>
                        <select
                            onChange={e => SelecioneNaturalidade(e)}
                            class="btn select"
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
                            class="btn"
                            id="rg"
                            name="rg"
                            required="required"
                            type="text"
                            placeholder="Ex.: 000000"
                            maxLength={15}
                            onChange={({ target: { value } }) => setRG(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Orgão de Emissor</p>
                        <input
                            class="btn"
                            id="OrgEmissor"
                            name="OrgEmissor"
                            required="required"
                            type="text"
                            placeholder="Ex: SSP"
                            onChange={({ target: { value } }) => setOrgaoEmissor(value)}

                        />
                    </div>
                    <div class="campo">
                        <p>UF</p>
                        <input
                            class="btn"
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
                        <input
                            type="date"
                            class="btn"
                            placeholder="Ex.: dd/mm/aaaa"
                            data-mask="00/00/0000"
                            maxlength="10"
                            autocomplete="off"
                            id="data"
                            name="data"
                            required="required"
                            onChange={({ target: { value } }) => setDate(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>E-mail</p>
                        <input
                            type="text"
                            class="btn2"
                            placeholder="exemplo@gmail.com"
                            onChange={({ target: { value } }) => setEmail(value)}
                        />
                    </div>
                    <div class="campo">
                        <p>Senha</p>
                        <input
                            class="btn"
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
                            class="btn"
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
                            class="btn select"
                            id="sexo"
                            name="sexo"
                        >
                            {
                                AddSexo.map((address, key) =>
                                    <option value={key}>{address}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>
            {/* Preenchimento Obrigátorio */}
            <section class="style-section-one">
                <h2 class="stylesH2">Preenchimento obrigatório</h2>
                <div class="column-flex">
                    <div class="column">
                        <p>Qual sua média salarial?*</p>
                        <input
                            type="radio"
                            id="sal1"
                            name="qms"
                            value="Até 1 Salário minímo"
                            onChange={({ target: { value } }) => setMediaSalarial(value)}
                        />
                        <label class="space-radio" for="sal1">Até 1 salários minímo</label><br />
                        <input
                            type="radio"
                            id="sal23"
                            name="qms"
                            value="de 2 à 3 salários minimos"
                            onChange={e => setMediaSalarial(e.target.value)}
                        />
                        <label class="space-radio" for="sal23">De 2 à 3 salários minímos</label><br />
                        <input
                            type="radio"
                            id="sal34"
                            name="qms"
                            value="De 3 a 4 Salario Minimos"
                            onChange={e => setMediaSalarial(e.target.value)}
                        />
                        <label class="space-radio" for="sal23">De 3 a 4 Salario Minimos</label><br />
                        <input
                            type="radio" id="sal34"
                            name="qms"
                            value="A cima de 5 Salarios Minimos"
                            onChange={e => setMediaSalarial(e.target.value)}
                        />
                        <label class="space-radio" for="sal23">A cima de 5 Salarios Minimos</label><br />
                    </div>
                    <div class="column">
                        <p>Qual sua moradia?* *</p>
                        <input
                            type="radio"
                            id="adm1"
                            name="moradia"
                            value="Casa própria"
                            onChange={e => setMoradia(e.target.value)}
                        />
                        <label class="space-radio" for="adm1">Casa própria</label><br />
                        <input
                            type="radio"
                            id="adm3"
                            name="moradia"
                            value="Casa Alugada"
                            onChange={e => setMoradia(e.target.value)}
                        />
                        <label class="space-radio" for="adm3">Casa Alugada</label><br />
                        <input
                            type="radio"
                            id="adm3"
                            name="moradia"
                            value="Casa financiada"
                            onChange={e => setMoradia(e.target.value)}
                        />
                        <label class="space-radio" for="adm3">Casa financiada</label><br />
                        <input
                            type="radio"
                            id="adm3"
                            name="moradia"
                            value="Mora na casa de filhos / parentes"
                            onChange={e => setMoradia(e.target.value)}
                        />
                        <label class="space-radio" for="adm3">Mora na casa de filhos / parentes</label><br />
                        <input
                            type="radio"
                            id="adm3"
                            name="qsm"
                            value="ILPI’S (ASILOS)"
                            onChange={e => setMoradia(e.target.value)}
                        />
                        <label class="space-radio" for="adm3">ILPI’S (ASILOS)</label><br />
                        <label>{moradia}</label>
                    </div>
                </div>
                <div class="column-flex">
                    <div class="column">
                        <p>Sobre as proprias finanças. *</p>
                        <input
                            type="radio"
                            id="sal1"
                            name="SobreFinancas"
                            value="Administrar as proprias finanças"
                            onChange={e => setSobreFinancas(e.target.value)}
                        />
                        <label class="space-radio" for="sal1">Administrar as proprias finanças</label><br />
                        <input
                            type="radio"
                            id="sal23"
                            name="SobreFinancas"
                            value="Finanças administrada por terceiros"
                            onChange={e => setSobreFinancas(e.target.value)}
                        />
                        <label class="space-radio" for="sal23">Finanças administrada por terceiros.</label><br />
                    </div>
                    <div class="column">
                        <p>Em caso de emergência avisar: *</p>
                        <p>nome:</p>
                        <input
                            class="btn"
                            id="nome"
                            name="nome_sos"
                            required="required"
                            type="text"
                            placeholder="Nome Completo"
                            onChange={({ target: { value } }) => setNomeSOS(value)}

                        />
                        <p>DDD2:</p>
                        <input
                            class="btn"
                            id="DDD"
                            name="ddd"
                            required="required"
                            type="tel"
                            placeholder="(00)"
                            maxlength={3}
                            onChange={({ target: { value } }) => setDddSOS(value)}
                        />
                        <p>telefone:</p>
                        <input
                            class="btn"
                            id="telefone"
                            name="telefone_sos"
                            required="required"
                            type="tel"
                            placeholder="Ex.: (00) 0000-0000"
                            maxLength={20}
                            onChange={({ target: { value } }) => setTelefoneSOS(value)}
                        />
                
                            <p>Tipo Telefone</p>
                            <select
                                onChange={e => SelecioneTipoTelefoneSOS(e)}
                                class="btn select"
                                id="telefoneSOS"
                                name="telefoneSOS"
                            >
                                {
                                    addphonesos.map((address, key) =>
                                        <option value={key}>{address}</option>)
                                }
                            </select>
                         

                    </div>
                </div>
                <div class="column-flex">

                    <div class="column">
                        <p>Assinale o tipo de locomoção que costuma utilizar.</p>
                        <input
                            type="radio"
                            id="carro-proprio"
                            name="transporte"
                            value="Carro Proprio"
                            onClick={() => setNone('none')}
                            onChange={({ target: { value } }) => setLocomocao(value)}

                        />
                        <label class="space-radio" for="sal1">Carro Próprio.</label><br />
                        <input
                            type="radio"
                            id="ccpf"
                            name="transporte"
                            value="Carro Conduzido por Familiares"
                            onClick={() => setNone('none')}
                            onChange={({ target: { value } }) => setLocomocao(value)}
                        />
                        <label class="space-radio" for="sal23">Carro Conduzido por Familiares</label><br />
                        <input
                            type="radio"
                            id="Moto"
                            name="transporte"
                            value="Moto"
                            onClick={() => setNone('none')}
                            onChange={({ target: { value } }) => setLocomocao(value)}
                        />
                        <label class="space-radio" for="sal23">Moto</label><br />
                        <input
                            type="radio"
                            id="transportep"
                            name="transporte"
                            value="Transporte Público"
                            onClick={() => setNone('none')}
                            onChange={({ target: { value } }) => setLocomocao(value)}
                        />
                        <label class="space-radio" for="sal23">Transporte Público</label><br />
                        <input
                            type="radio"
                            id="biciclieta"
                            name="transporte"
                            value="Bicicleta"
                            onClick={() => setNone('none')}
                            onChange={({ target: { value } }) => setLocomocao(value)}
                        />
                        <label class="space-radio" for="sal23">Bicicleta{locomocao}</label><br />
                        <input
                            type="radio"
                            id="sal34"
                            name="transporte"
                            value="taxi-uber"
                            onClick={() => setNone('none')}
                            onChange={({ target: { value } }) => setLocomocao(value)}
                        />
                        <label class="space-radio" for="sal23">Taxi / Uber</label><br />
                        <input
                            type="radio"
                            id="sal34"
                            name="transporte"
                            value="Outros"
                            onClick={() => setNone('btn')}
                        />
                        <label class="space-radio" for="sal23">Outros</label><br />
                        <input
                            class={none}
                            id="nome"
                            name="resposta" required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setLocomocao(value)}
                        />
                    </div>
                    <div class="column">
                        <p>Descrição do Perfil: {descricaoPerfil}</p>
                        <textarea
                            class="btn"
                            id="descricaoPerfil"
                            name="descricaoPerfil"
                            required="required"
                            type="text"
                            placeholder="Fale um pouco de você"
                            onChange={({ target: { value } }) => setDescriçaoPerfil(value)}
                        />
                    </div>
                </div>
                <div class="column-flex">

                    <div class="column">
                        <p>Experiência Profissional: {expreriencaProfissional}</p>
                        <textarea
                            class="btn"
                            id="experienciaprofissional"
                            name="experienciaprofissional"
                            required="required"
                            type="text"
                            placeholder="Quais são suas experiências profissionais"
                            onChange={({ target: { value } }) => setExpreriencaProfissional(value)}
                        />
                    </div>
                    <div class="column">
                        <p>Estado Civil: {expreriencaProfissional}</p>
                        <input
                            type="radio"
                            id="solteiro"
                            name="relacao"
                            value="Solteiro"
                            onChange={({ target: { value } }) => setEstadoCivil(value)}
                        />
                        <label class="space-radio" for="solteiro">Solteiro</label><br />
                        <input
                            type="radio"
                            id="casado"
                            name="relacao"
                            value="Casado"
                            onChange={({ target: { value } }) => setEstadoCivil(value)}
                        />
                        <label class="space-radio" for="casado">Casado</label><br />
                        <input
                            type="radio"
                            id="viuvo"
                            name="relacao"
                            value="Viúvo"
                            onChange={({ target: { value } }) => setEstadoCivil(value)}

                        />
                        <label class="space-radio" for="viuvo">Viúvo</label><br />
                    </div>
                </div>
                <div class="column-flex">

                    <div class="column">
                        <p>Você se considera : {expreriencaProfissional}</p>
                        <input
                            type="radio"
                            id="Branco"
                            name="cor"
                            value="Branco"
                            onChange={({ target: { value } }) => setCorPele(value)}
                        />
                        <label class="space-radio" for="Branco">Branco</label><br />
                        <input
                            type="radio"
                            id="Pardo"
                            name="cor"
                            value="Pardo"
                            onChange={({ target: { value } }) => setCorPele(value)}
                        />
                        <label class="space-radio" for="Pardo">Pardo</label><br />
                        <input
                            type="radio"
                            id="Preto"
                            name="cor"
                            value="Preto"
                            onChange={({ target: { value } }) => setCorPele(value)}

                        />
                        <label class="space-radio" for="Preto">Preto</label><br />
                    </div>
                    <div class="column">
                    <p>Tem Filhos  : {filhos}</p>
                        <input
                            type="radio"
                            id="simFilhos"
                            name="filhos"
                            value={true}
                            onChange={({ target: { value } }) => setFilhos(value)}
                        />
                        <label class="space-radio" for="simFilhos">Sim</label><br />
                        <input
                            type="radio"
                            id="filhosnao"
                            name="filhos"
                            value={false}
                            onChange={({ target: { value } }) => setFilhos(value)}
                        />
                        <label class="space-radio" for="filhosnao">Não</label><br />
                        
                    </div>
                </div>
                <h2 class="stylesH2">Escolaridade*</h2>
                <div class="column-flex">
                    <div class="column">

                        <input
                            type="radio"
                            id="Analfabeto"
                            name="escolaridade"
                            value="Analfabeto"
                            onChange={({ target: { value } }) => setEscolaridade(value)}
                        />
                        <label class="space-radio" for="sal1">{escolaridade}Analfabeto</label><br />
                        <input
                            type="radio"
                            id="SaberlereEscrever"
                            name="escolaridade"
                            value="Saber ler e Escrever"
                            onChange={({ target: { value } }) => setEscolaridade(value)}
                        />
                        <label class="space-radio" for="sal23">Saber ler e Escrever</label><br />
                        <input
                            type="radio"
                            id="EnsinoFudamentalI"
                            name="escolaridade"
                            value="Ensino Fundamental I (1° ao 4° Ano)"
                            onChange={({ target: { value } }) => setEscolaridade(value)}
                        />
                        <label class="space-radio" for="sal23">Ensino Fundamental I (1° ao 4° Ano)</label><br />
                        <input
                            type="radio"
                            id="EnsinoFudamentalII"
                            name="escolaridade"
                            value="Ensino Fundamental II (5° ao 9° Ano)"
                            onChange={({ target: { value } }) => setEscolaridade(value)}
                        />
                        <label class="space-radio" for="sal23">Ensino Fundamental II (5° ao 9° Ano)</label><br />
                        <input
                            type="radio"
                            id="graduacao"
                            name="escolaridade"
                            value="Graduação"
                            onChange={({ target: { value } }) => setEscolaridade(value)}
                        />
                        <label class="space-radio" for="sal23">Graduação</label><br />
                        <input
                            type="radio"
                            id="PosGraduacao"
                            name="escolaridade"
                            value="Pós Graduação"
                            onChange={({ target: { value } }) => setEscolaridade(value)}
                        />
                        <label class="space-radio" for="sal23">Pós Graduação</label><br />

                    </div>
                    <div class="column">
                    </div>
                </div>

                <h2 class="stylesH2">Socio Econômico *</h2>
                <div class="column-flex">
                    <div class="column">
                        <p>Como você classifica a sua situação econômica ? *</p>
                        <input
                            type="radio"
                            id="pessima"
                            name="economia"
                            value="Péssima"
                            onChange={({ target: { value } }) => setSituacaoEconomica(value)}
                        />
                        <label class="space-radio" for="sal1">{situacaoEconomica}Péssima</label><br />
                        <input
                            type="radio"
                            id="ruim"
                            name="economia"
                            value="Ruim"
                            onChange={({ target: { value } }) => setSituacaoEconomica(value)}
                        />
                        <label class="space-radio" for="sal23">Ruim</label><br />
                        <input
                            type="radio"
                            id="regular"
                            name="economia"
                            value="Regular"
                            onChange={({ target: { value } }) => setSituacaoEconomica(value)}
                        />
                        <label class="space-radio" for="sal23">Regular</label><br />
                        <input
                            type="radio"
                            id="boa"
                            name="economia"
                            value="Boa"
                            onChange={({ target: { value } }) => setSituacaoEconomica(value)}
                        />
                        <label class="space-radio" for="sal23">Boa</label><br />
                        <input
                            type="radio"
                            id="otima"
                            name="economia"
                            value="Ótima"
                            onChange={({ target: { value } }) => setSituacaoEconomica(value)}
                        />
                        <label class="space-radio" for="sal23">Ótima</label><br />

                    </div>
                    <div class="column">
                        <p>É aposentado ? *</p>
                        <input
                            type="radio"
                            id="sim"
                            name="aposentado"
                            value={true}
                            onChange={({ target: { value } }) => setAposentado(value)}
                        />
                        <label class="space-radio" for="sal1">Sim</label><br />
                        <input
                            type="radio"
                            id="nao"
                            name="aposentado"
                            value={false}
                            onChange={({ target: { value } }) => setAposentado(value)}
                        />
                        <label class="space-radio" for="sal23">{aposentado}Não</label><br />
                    </div>
                </div>


                <div class="column-flex">
                    <div class="column">
                        <p>Esta trabalhando atualmente ? *</p>
                        <input
                            type="radio"
                            id="Sim_ta"
                            name="trabalho_a"
                            value={true}
                            onChange={({ target: { value } }) => setTrabalho(value)}
                        />
                        <label class="space-radio" for="sal1">Sim</label><br />
                        <input
                            type="radio"
                            id="Nao_ta"
                            name="trabalho_a"
                            value={false}
                            onChange={({ target: { value } }) => setTrabalho(value)}
                        />
                        <label class="space-radio" for="sal23">Não</label><br />
                    </div>
                    <div class="column">
                        <p>Ultima Profissão registrada na carteira de trabalho e previdencia social - CTPS ? *</p>
                        <input
                            class="btn"
                            id="ctps"
                            name="ctps"
                            required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setCTPS(value)}
                        />

                    </div>
                </div>
                <div class="column-flex">
                    <div class="column">
                        <p>É beneficiario(A) de Algum programa de governo ? *</p>
                        <input
                            type="radio"
                            id="BolsaFamilia"
                            name="beneficiarioF"
                            value="Bolsa Familia"
                            onClick={() => setBeneficiarioOcult('none')}
                            onChange={({ target: { value } }) => setBeneficiario(value)}


                        />
                        <label class="space-radio" for="sal1">Bolsa Familia</label><br />
                        <input
                            type="radio"
                            id="BeneficioPC"
                            name="beneficiarioF"
                            value="Benefício de Prestação Continuada"
                            onClick={() => setBeneficiarioOcult('none')}
                            onChange={({ target: { value } }) => setBeneficiario(value)}

                        />
                        <label class="space-radio" for="sal23">Benefício de Prestação Continuada</label><br />
                        <input
                            type="radio"
                            id="DFsemmiséria"
                            name="beneficiarioF"
                            value="DF sem miséria"
                            onClick={() => setBeneficiarioOcult('none')}
                            onChange={({ target: { value } }) => setBeneficiario(value)}

                        />
                        <label class="space-radio" for="sal23">DF sem miséria</label><br />
                        <input
                            type="radio"
                            id="sal34"
                            name="beneficiarioF"
                            value="Outros"
                            onClick={() => setBeneficiarioOcult('btn')}
                        />
                        <label class="space-radio" for="sal23">Outros{beneficiario}</label><br />
                        <input
                            class={beneficiarioOcult}
                            id="nome"
                            name="beneficiarioF"
                            required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setBeneficiario(value)}

                        />

                    </div>
                    <div class="column">
                        <p>É atendido(a) em alguma unidade de atendimento?*{respostaAtendimento}</p>
                        <input
                            type="radio"
                            id="Cras"
                            name="atendimentoUnidade"
                            value="Cras"
                            onClick={() => setUnidadeAtendimento('none')}
                            onChange={({ target: { value } }) => setRespostaAtendimento(value)}
                        />
                        <label class="space-radio" for="sal1">Cras</label><br />
                        <input
                            type="radio"
                            id="Creas"
                            name="atendimentoUnidade"
                            value="Creas"
                            onClick={() => setUnidadeAtendimento('none')}
                            onChange={({ target: { value } }) => setRespostaAtendimento(value)}
                        />
                        <label class="space-radio" for="sal23">Creas</label><br />
                        <input
                            type="radio"
                            id="sal34"
                            name="atendimentoUnidade"
                            value="Posto de Saúde"
                            onClick={() => setUnidadeAtendimento('none')}
                            onChange={({ target: { value } }) => setRespostaAtendimento(value)}

                        />
                        <label class="space-radio" for="sal23">Posto de Saúde</label><br />

                        <input
                            type="radio" i
                            id="sal34"
                            name="atendimentoUnidade"
                            onClick={() => setUnidadeAtendimento('btn')}
                            value={0}
                        />
                        <label class="space-radio" for="sal23">Outros</label><br />
                        <input
                            class={unidadeAtendimento}
                            id="nome"
                            name="resposta"
                            required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setRespostaAtendimento(value)}

                        />

                    </div>
                </div>
                <h2 class="stylesH2">Avaliação física *</h2>
                <div class="column-flex">
                    <div class="column">
                        <p>Sobre Acessibilidade *</p>
                        <input
                            type="radio"
                            id="item1Acessibilidade"
                            name="SobreAcessibilidade"
                            value={1}
                            onClick={() => setAcessibilidadeOcult('none')}
                            onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                        />
                        <label for="item1Acessibilidade">{sobreAcessibilidade}Se locomove  sem dificuldade</label><br />
                        <input
                            type="radio"
                            id="item2Acessibilidade"
                            name="SobreAcessibilidade"
                            value={2}
                            onClick={() => setAcessibilidadeOcult('none')}
                            onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                        />
                        <label for="item2Acessibilidade">Se locomove  com dificuldade</label><br />
                        <input
                            type="radio"
                            id="item3Acessibilidade"
                            name="SobreAcessibilidade"
                            onClick={() => setAcessibilidadeOcult('none')}
                            value={3}
                            onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                        />
                        <label for="item3Acessibilidade">Se locomove  com o uso de auxiliares de marcha (Andador, Muleta)</label><br />
                        <input
                            type="radio"
                            id="item4Acessibilidade"
                            name="SobreAcessibilidade"
                            value={4}
                            onClick={() => setAcessibilidadeOcult('none')}
                            onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                        />
                        <label for="item4Acessibilidade">Deficiente auditivo</label><br />
                        <input
                            type="radio"
                            id="item5Acessibilidade"
                            name="SobreAcessibilidade"
                            value={5}
                            onClick={() => setAcessibilidadeOcult('none')}
                            onChange={({ target: { value } }) => setSobreAcessibilidade(value)}

                        />
                        <label for="item5Acessibilidade">Deficiente de acuidade auditiva</label><br />
                        <input
                            type="radio"
                            id="item6Acessibilidade"
                            name="SobreAcessibilidade"
                            value={6}
                            onClick={() => setAcessibilidadeOcult('none')}
                            onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                        />
                        <label for="item6Acessibilidade">Deficiente Intelectual</label><br />
                        <input
                            type="radio"
                            id="item7Acessibilidade"
                            name="SobreAcessibilidade"
                            value={7}
                            onClick={() => setAcessibilidadeOcult('none')}
                            onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                        />
                        <label for="item7Acessibilidade">Deficiente visual{sobreAcessibilidade}</label><br />
                        <input
                            type="radio"
                            id="item8Acessibilidade"
                            name="SobreAcessibilidade"
                            value={8}
                            onClick={() => setAcessibilidadeOcult('none')}
                            onChange={({ target: { value } }) => setSobreAcessibilidade(value)}
                        />
                        <label for="item8Acessibilidade">Deficiente de acuidade visual</label><br />
                        <input
                            type="radio" i
                            id="item0Acessibilidade"
                            name="SobreAcessibilidade"
                            onClick={() => setAcessibilidadeOcult('btn')}
                            value={0}
                            onChange={({ target: { value } }) => setSobreAcessibilidade(value)}

                        />
                        <label class="space-radio" for="item0Acessibilidade">Outros</label><br />
                        <input
                            class={acessibilidadeOcult}
                            id="nome"
                            name="item8Acessibilidade"
                            type="text"
                            placeholder="sua resposta"
                            for="item9Acessibilidade"
                            onChange={({ target: { value } }) => setOutroAcessibilidade(value)}
                        />
                    </div>
                    <div class="column">
                        <p>Patologia Pré Existentes * {patologia}</p>
                        <input
                            type="radio"
                            id="item1Patologia"
                            name="patologia"
                            value={1}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item1Patologia">Diabetes</label><br />
                        <input
                            type="radio"
                            id="item2Patologia"
                            name="patologia"
                            value={2}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item2Patologia">Doenças  cardiacas </label><br />
                        <input
                            type="radio"
                            id="item3Patologia"
                            name="patologia"
                            value={3}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item3Patologia">Hipertensão arterial</label><br />
                        <input
                            type="radio"
                            id="item4Patologia"
                            name="patologia"
                            value={4}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item4Patologia">DPOC</label><br />
                        <input
                            type="radio"
                            id="item5Patologia"
                            name="patologia"
                            value={5}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item5Patologia">Parkison</label><br />
                        <input
                            type="radio"
                            id="item6Patologia"
                            name="patologia"
                            value={6}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item6Patologia">Alzheimer</label><br />
                        <input
                            type="radio"
                            id="item7Patologia"
                            name="patologia"
                            value={7}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item7Patologia">Osteoporose</label><br />
                        <input
                            type="radio"
                            id="item8Patologia"
                            name="patologia"
                            value={8}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item8Patologia">Doenças de Derme</label><br />
                        <input
                            type="radio"
                            id="item9Patologia"
                            name="patologia"
                            value={9}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item9Patologia">Alergias</label><br />
                        <input
                            type="radio"
                            id="item10Patologia"
                            name="patologia"
                            value={10}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item10Patologia">Doenças de Derme</label><br />
                        <input
                            type="radio"
                            id="item11Patologia"
                            name="patologia"
                            value={11}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item11Patologia">Depressão</label><br />
                        <input
                            type="radio"
                            id="item12Patologia"
                            name="patologia"
                            value={12}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item12Patologia">Osteoporose</label><br />
                        <input
                            type="radio"
                            id="item13Patologia"
                            name="patologia"
                            value={13}
                            onClick={() => setPatologiaOcult('none')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item13Patologia">Doenças Urológicas</label><br />
                        <input
                            type="radio"
                            id="item0Patologia"
                            name="patologia"
                            value={0}
                            onClick={() => setPatologiaOcult('btn')}
                            onChange={({ target: { value } }) => setPatologia(value)}
                        />
                        <label for="item0Patologia">Outros</label><br />
                        <input
                            class={patologiaOcult}
                            id="nome"
                            name="resposta"
                            required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setOutrosPatologia(value)}
                        />
                    </div>
                </div>

                <h2 class="stylesH2">Autonomia e Independência * {aiR}</h2>

                <div class="column-flex">
                    <div class="column">
                        <input
                            type="radio"
                            id="AI1"
                            name="AI"
                            value={1}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI1">Depende de cuidadores</label><br />
                        <input
                            type="radio"
                            id="AI2"
                            name="AI"
                            value={2}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI2">Depende de acompanhamento</label><br />
                        <input
                            type="radio"
                            id="AI3"
                            name="AI"
                            value={3}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI3">Independente</label><br />
                        <input
                            type="radio"
                            id="AI4"
                            name="AI"
                            value={4}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI4">Limpa a casa</label><br />
                        <input
                            type="radio"
                            id="AI5"
                            name="AI"
                            value={5}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI5">Cozinha</label><br />
                        <input
                            type="radio"
                            id="AI6"
                            name="AI"
                            value={6}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI6">Cuida dos netos / Parentes</label><br />
                        <input
                            type="radio"
                            id="AI7"
                            name="AI"
                            value={7}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI7">Não pratica atividades fisicas</label><br />
                        <input
                            type="radio"
                            id="AI8"
                            name="AI"
                            value={8}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI8">Habito de Leitura</label><br />
                        <input
                            type="radio"
                            id="AI9"
                            name="AI"
                            value={9}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI9">Caminhada</label><br />
                        <input
                            type="radio"
                            id="AI10"
                            name="AI"
                            value={10}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI10">Jogos</label><br />
                        <input
                            type="radio"
                            id="AI11"
                            name="AI"
                            value={11}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI11">Bailes / Festas</label><br />
                        <input
                            type="radio"
                            id="AI12"
                            name="AI"
                            value={12}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI12">Shopping</label><br />
                        <input
                            type="radio"
                            id="AI13"
                            name="AI"
                            value={13}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI13">Vida sexual ativa</label><br />
                        <input
                            type="radio"
                            id="AI14"
                            name="AI"
                            value={14}
                            onClick={() => setAiOcult('none')}
                            onChange={({ target: { value } }) => setAir(value)}
                        />
                        <label for="AI14">Vida sexual inativa</label><br />
                        <input
                            type="radio"
                            id="AI15"
                            name="AI"
                            value={0}
                            onClick={() => setAiOcult('btn')}
                            onChange={({ target: { value } }) => setAir(value)}

                        />
                        <label for="AI16">Outros</label><br />
                        <input
                            class={aiOcult}
                            id="nome"
                            name="resposta"
                            required="required"
                            type="text"
                            placeholder="sua resposta"
                            onChange={({ target: { value } }) => setOutrosAir(value)}
                        />
                    </div>
                    <div class="column">
                        <p>Como ficou sabendo do Curso{saberCurso}</p>
                        <input
                            type="radio"
                            id="Saber1"
                            name="Saber"
                            value="Demanda espontânea"
                            onClick={() => setSabeCursoOcult('none')}
                            onChange={({ target: { value } }) => setCurso(value)}
                        />
                        <label for="AI9">Demanda espontânea</label><br />
                        <input
                            type="radio"
                            id="Saber2"
                            name="Saber"
                            value="Encaminhamento por algum orgão"
                            onClick={() => setSabeCursoOcult('none')}
                            onChange={({ target: { value } }) => setCurso(value)}
                        />
                        <label for="AI10">Encaminhamento por algum orgão</label><br />
                        <input
                            type="radio"
                            id="AI11"
                            name="Saber"
                            value="Informação na comunidade"
                            onClick={() => setSabeCursoOcult('none')}
                            onChange={({ target: { value } }) => setCurso(value)}
                        />
                        <label for="AI11">Informação na comunidade</label><br />
                        <input
                            type="radio"
                            id="AI12"
                            name="Saber"

                            onClick={() => setSabeCursoOcult('none')}
                            onChange={({ target: { value } }) => setCurso(value)}
                        />
                        <label for="AI12">Mídias</label><br />
                        <input
                            type="radio"
                            id="AI0"
                            name="Saber"
                            onClick={() => setSabeCursoOcult('btn')}
                        />
                        <label for="AI0">outros</label><br />
                        <input
                            class={sabeCursoOcult}
                            id="nome"
                            name="resposta"
                            required="required"
                            type="text"
                            onChange={({ target: {value} }) => setCurso(value)}
                            placeholder="sua resposta"
                        />


                    </div>
                </div>
                <div class="button-aluno">

                    <div class="">
                        <input class="submit-aluno-cancel" type="button" value="Cancelar"  />
                    </div>
                    <div class="">
                        <input class="submit-aluno-env" type="button" value="Enviar" onClick={() => CriarCadastroAluno()}/>
                    </div>
                </div>
            </section>
        </>
    );
}



export default MainCadastro;
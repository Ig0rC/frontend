import React, { useEffect, useState } from 'react';
import Menu from '../../Components/administrador/header/header.js';
import Container from '../../Components/administrador/container/containerAdministrador.js';
import './CadastrarInstituicao.css';
import api from '../../services/api'

export default function CadastrarInstituicao() {

    const [nome, setNome] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [unidade, setUnidade] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCEP] = useState('');
    const [estado, setEstado] = useState('');
    const [bairro, setBairro] = useState('');
    const [quadra, setQuadra] = useState('');
    const [numero_endereco, setNumeroEnedereco] = useState('');
    const [Complemento, setComplemento] = useState('');
    const [numero_telefone, setNumeroTelefone] = useState('');
    const [ddd, setDDD] = useState('');
    const [ cidade, setCidade ] = useState('');

    //escolha tipo telefone
    const tipoTelefone = ['Tipo Telefone', 'Móvel', 'Fixo'];
    const AddTelefone = tipoTelefone.map(AddTelefone => AddTelefone);
    const [escolhaTipoTelefone, setEscolhaTipoTelefone] = useState('');
    const SelecioneTipoTelefone = 
            (e) => setEscolhaTipoTelefone(tipoTelefone[e.target.value]);


    const [convertTipoTelefone, setConvertTipoTelefone] = useState(0);
    //converte tipo
    
    useEffect(() =>{
        if (escolhaTipoTelefone === 'Fixo') {
            setConvertTipoTelefone(1);
        } else {
            setConvertTipoTelefone(2);
        }
    },[escolhaTipoTelefone])

    async function EnviarCadastro() {
      try {
        const response = await api.post('/instituicao', {
            nome_instituicao: nome,
            responsavel: responsavel,
            unidade: unidade, 
            cep: cep,
            estado: estado,
            quadra: quadra,
            ddd: ddd,
            numero_telefone: numero_telefone,
            email: email,
            cidade: cidade,
            bairro: bairro,
            numero_endereco: numero_endereco,
            complemento: Complemento,
            id_tipo_telefone: convertTipoTelefone
        });
        console.log(response)
        window.alert('Criado')
      } catch (error) {
          console.log(error)
      }
        
        
    }
    return (
        <>
            <Menu />
            <Container>
                <div>
                    <h1 class="titulo-styles-administrador">Cadastrar Instituição</h1>
                </div>
                <div class="columns-flex">
                    <div class="column-div-instituicao-cadastro">
                        <div>
                            <p>Nome instituição:{nome}</p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                onChange={({ target: { value } }) => setNome(value)}
                            />
                        </div>
                        <div>
                            <p>Responsável:{responsavel}</p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                onChange={({ target: { value } }) => setResponsavel(value)}
                            />
                        </div>
                        <div>
                        <p>Estado:{estado}</p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                onChange={( { target: { value }}) => setEstado(value)}
                            />
                        </div>
                        <div>
                        <p>Unidade:{unidade}</p>
                            <input 
                            class="input-styles-IT" 
                            type="text" 
                            onChange={ ({ target: {value}}) => setUnidade(value)}
                        />
                        </div>
                        <div>
                        <p>CEP:{cep}</p>
                            <input 
                                class="input-styles-IT" 
                                type="text" 
                                maxLength={8}
                                onChange={ ({ target: {value}}) => setCEP(value)}
                            />
                        </div>
                        <div>
                        <p>Endereço: {numero_endereco}</p>
                            <input 
                                class="input-styles-IT" 
                                type="text" 
                                onChange={ ({ target: {value}}) => setNumeroEnedereco(value)}    
                            />
                        </div>
                        <div>
                            <p>Bairro:</p>
                            <input 
                                class="input-styles-IT" 
                                type="text" 
                                onChange={ ({ target: {value}}) => setBairro(value)}
                            />
                        </div>
                    </div>
                    <div class="column-div-instituicao-cadastro">
                        <div>
                            <p>Cidade:</p>
                            <input 
                                class="input-styles-IT" 
                                type="text"
                                onChange={({ target: {value}}) => setCidade(value)} 
                            />
                        </div>
                        <div>
                            <p>Quadra:</p>
                            <input 
                                class="input-styles-IT" 
                                type="text"
                                onChange={({ target: {value}}) => setQuadra(value)} 
                            />
                        </div>
                        <div>
                            <p>Complemento: {Complemento}</p>
                            <input class="input-styles-IT" 
                            type="text" 
                            onChange={ ({ target: {value}}) => setComplemento(value)}    
                        />
                        </div>
                        <div>
                            <p>DDD: {ddd}</p>
                            <input 
                                class="input-styles-IT" 
                                type="text" 
                                maxLength={3}
                                onChange={({ target: {value}}) => setDDD(value)}
                            />
                        </div>
                        <div>
                            <p>Telefone:{numero_telefone}</p>
                            <input 
                                class="input-styles-IT" 
                                type="text" 
                                onChange={({ target: {value}}) => setNumeroTelefone(value)}
                            />
                            
                        </div>
                        <div>
                        <p>Telefone:{escolhaTipoTelefone}</p>
                          <select
                                onChange={e => SelecioneTipoTelefone(e)}
                                class="input-styles-IT"
                                id="tipoTelefoneOne"
                                name="tipoTelefoneOne"
                            >
                                {
                                    AddTelefone.map((address, key) =>
                                        <option value={key}>{address}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <p>E-mail:{email}</p>
                            <input 
                                class="input-styles-IT" 
                                type="text" 
                                onChange={({ target: {value}}) => setEmail(value)}
                            />
                        </div>
                    
                    </div>
                </div>
                <div class="flex-button-IT">
                    <button 
                 
                    class="styles-button-instituicao-cancel">Cancelar</button>
                    <button 
                           onClick={() => EnviarCadastro()}
                    class="styles-button-instituicao-env">Cadastrar</button>
                </div>


            </Container>
        </>
    )
}
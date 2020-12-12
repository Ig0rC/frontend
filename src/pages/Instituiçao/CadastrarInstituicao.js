import React, { useEffect, useState } from 'react';
import Menu from '../../Components/administrador/header/header.js';
import './CadastrarInstituicao.css';
import api from '../../services/api';
import history from '../history';
const validator = require("email-validator");



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



    async function ValidarInputs(){
        if(
            !nome === false
            &&
            !responsavel === false
            && 
            !unidade === false
            &&
            !email === false
            &&
            !cep === false
            &&
            !bairro === false
            &&
            !quadra === false
            &&
            !numero_endereco === false
            &&
            !Complemento === false
            &&
            !numero_telefone === false
            &&
            !ddd === false
            &&
            !cidade === false
            &&
            !escolhaTipoTelefone === false
            &&
            validator.validate(email) === true
            ){
                EnviarCadastro();
            }
        else{
            alert("preenche todos os campos corretamente!")
        }
    }

    async function EnviarCadastro() {
      try {
        await api.post('/instituicao', {
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

        window.alert('Criado com Sucesso!')
        history.push('/pesqinstituicao')
      } catch (error) {
          console.log(error)
      }
    }

    async function maxLengthCheck (object) {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }
    
    return (
        <>
            <Menu />
                <div class="perfil-instituicao-bg" >
                    <div class="perfil-titulo">
                        <h2>Cadastrar Instituição</h2>
                    </div>
                </div>
                <div>
                </div>
                <div class="columns-flex">
                    <div class="column-div-instituicao-cadastro">
                        <div>
                            <p>Nome instituição:</p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                onChange={({ target: { value } }) => setNome(value)}
                            />
                        </div>
                        <div>
                            <p>Responsável:</p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                onChange={({ target: { value } }) => setResponsavel(value)}
                            />
                        </div>
                        <div>
                        <p>Estado:</p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                onChange={( { target: { value }}) => setEstado(value)}
                            />
                        </div>
                        <div>
                        <p>Unidade:</p>
                            <input 
                            class="input-styles-IT" 
                            type="text" 
                            onChange={ ({ target: {value}}) => setUnidade(value)}
                        />
                        </div>
                        <div>
                        <p>CEP:</p>
                            <input 
                                class="input-styles-IT" 
                                type="number"
                                onInput={maxLengthCheck}
                                maxLength={8}
                                onChange={ ({ target: {value}}) => setCEP(value)}
                            />
                        </div>
                        <div>
                            <p>Cidade:</p>
                            <input 
                                class="input-styles-IT" 
                                type="text"
                                onChange={({ target: {value}}) => setCidade(value)} 
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
                            <p>Quadra:</p>
                            <input 
                                class="input-styles-IT" 
                                type="text"
                                onChange={({ target: {value}}) => setQuadra(value)} 
                            />
                        </div>
                        <div>
                        <p>Número:</p>
                            <input 
                                class="input-styles-IT" 
                                type="text" 
                                onChange={ ({ target: {value}}) => setNumeroEnedereco(value)}    
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
                            <p>DDD:</p>
                            <input 
                                class="input-styles-IT" 
                                type="number"
                                onInput={maxLengthCheck}
                                maxLength={3}
                                onChange={({ target: {value}}) => setDDD(value)}
                            />
                        </div>
                        <div>
                            <p>Telefone:</p>
                            <input 
                                class="input-styles-IT" 
                                type="number"
                                onInput={maxLengthCheck}
                                maxLength={20} 
                                onChange={({ target: {value}}) => setNumeroTelefone(value)}
                            />
                            
                        </div>
                        <div className="margin-select-zero">
                        <p>Tipo Telefone:</p>
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
                            <p>E-mail:</p>
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
                           onClick={ValidarInputs}
                    class="styles-button-instituicao-env">Cadastrar</button>
                </div>


        </>
    )
}
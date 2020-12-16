import React, { useState, useContext, useEffect} from 'react';
import { cpf } from 'cpf-cnpj-validator';
import './EsqueciMinhaSenha.css';
import api from '../../../services/api'
import {AlterarSenhaContext} from '../../../Context/AlterarSenhaContext';






export default function EsqueciMinhaSenha(){

    const { Navegar } = useContext(AlterarSenhaContext);

    async function maxLengthCheck(object) {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    const [consult, setConsult ] = useState([]);

    const [cpfNew, setCPF] = useState('');
    
    async function validar(){
        if(cpf.isValid(cpfNew) === true){
            const { data }  = await api.post(`/validar/senha/bd`, {
                cpf: cpfNew
            })
            setConsult(data)
        }
        else{
            alert("CPF inválido!")
        }

    }
    useEffect(() => {
        alert(consult)
        Navegar(consult, cpfNew);
    }, [consult])


    return(
        <>
            <div className="container-esqueci-minha-senha">
                <div className="esqueci-minha-senha-cpf-div">
                    <h1>Digite seu CPF</h1>
                    <input 
                        onChange={( { target: {value }}) => setCPF(value)}
                        onInput={maxLengthCheck} maxLength={11} className="input-esqueci-minha-senha"type="number"/>
                    <button onClick={validar} className="button-esqueci-minha-senha">Validar</button>
                </div>
            </div>
        </>
    )
}
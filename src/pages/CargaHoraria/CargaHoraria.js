import React, { useState } from 'react';
import './CargaHoraria.css'
import Menu from '../../Components/administrador/header/header';
import api from '../../services/api'



export default function CadastrarCargaHoraria(){

    const [ time, setTime] = useState('');


    function validarCampo(){
        if(!time === false){
           return CadastrarTime()
        }
        alert('Preencha todos os dados')
    }

    async function CadastrarTime(){
        
        
            try{
                const response = await api.post('/cargahoraria', {
                    horas: time
                });
                console.log(response)
                window.alert('Cadastrado com Sucesso')
    
            } catch (error){
                window.alert('error ao cadastrar')
            }
         
    
    
    }
    return(
        <>
            <Menu />
            <div class="perfil-instituicao-bg" >
                    <div class="perfil-titulo">
                        <h2>Cadastrar Carga Horária</h2>
                    </div>
            </div>
            <div className="cadastrar-turma-flex-80vh">  
                <input class="input-global-css-entrada" type="text" 
                            placeholder="05:00:00 = 5 horas"
                            onChange={ ({target: {value }}) => setTime(value)}/>
             
                <button 
                onClick={validarCampo}
                class="button-cadastrar-carga-horaria">Cadastrar</button>
            </div>
        </>
    )

}
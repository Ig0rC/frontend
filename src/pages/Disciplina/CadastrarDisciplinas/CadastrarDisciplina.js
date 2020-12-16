import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import Menu from '../../../Components/administrador/header/header.js';
import './CadastrarDisciplinas.css';




export default function CadastrarDisciplina() {

    const [time, setTime] = useState([]);

    const [nomeDiscplina, setNomeDisciplina ] = useState('');
  
    const [horas, setHoras] = useState('');


    function ValidarDisciplina(){
        if(!nomeDiscplina === false && !horas === false){
            criarDisciplina();
        }
        else{
            alert("preencha todos os campos!")
        }
    }

    async function criarDisciplina(){

        try{
            const response = await api.post('/disciplina', {
                nome_disciplina: nomeDiscplina,
                horas: horas
            });
            console.log(response);
            window.alert('Cadastro feito com sucesso!!')
        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {

        (async function () {
            const time = await api.get('/searchHorario');

    
            setTime(time.data)


        })();

    }, [])





    return (
        <>
            <Menu />
            <div class="perfil-instituicao-bg" >
                    <div class="perfil-titulo">
                        <h2>Cadastrar Disciplina</h2>
                    </div>
            </div>
            <div class="cadastrar-turma-flex-80vh">
                    <p>Nome Disciplina:</p>
                    <input
                        class="styles-select-global"
                        type="text"
                     onChange={({ target: { value }}) => setNomeDisciplina(value)}
                    />
                    <p>Carga Horária:</p>
                    <select
                        class="styles-select-global"
                        onChange={({ target: { value } }) => setHoras(value)}
                    >
                        <option ></option>
                        {time.map(time => (
                            <option >{time.horas}</option>
                        ))}
                    </select>


                    <button 
                    onClick={ValidarDisciplina}       
                    class="styles-button-instituicao-env">Cadastrar</button>
            </div>
   
        
        </>
    )
}
import React, { useState }from 'react';
import Menu from '../../../Components/administrador/header/header';
import './CadastraTurma.css';
import api from '../../../services/api'




export default function CadastrarTurma() {

    const [nomeTurma, setNomeTurma ] = useState();
    const [dataIngresso, setDataIngresso ] = useState();
    

    async function criarTurma(){
        try{
            if(!nomeTurma || !dataIngresso){
                return alert('Não Escreveu o nome a turma ou Data')
            }
            const response = await api.post('/turma',{
                nome_turma: nomeTurma,
                data_ingresso: dataIngresso
            })
            console.log(response)
            alert('CADASTRADO')
        } catch(error){
            console.log(error)
        }
    }
  

    return(
        <>
            <Menu />
            <div class="cadastrar-turma-flex-20vh" >
                 <h1>Cadastrar Turma</h1>
            </div>
            <div class="cadastrar-turma-flex-80vh ">
                <label>Nome da Turma</label>
                <input 
                    onChange={( {target: { value }}) => setNomeTurma(value)}
                    class="input-cadastrar-turma-margin" type="text" maxLength={20}/>
                <label>Data Ingresso</label>
                <input 
                    onChange={({ target: {value } } ) => setDataIngresso(value)}
                    class="input-cadastrar-turma-margin" type="text" maxLength={20}/>
                <button onClick={criarTurma}
                    class="button-cadastrar-semestre-env">Cadastrar</button>
            </div>
   
        </>
    )
}
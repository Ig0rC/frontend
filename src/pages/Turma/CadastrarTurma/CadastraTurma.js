import React, { useState }from 'react';
import Menu from '../../../Components/administrador/header/header';
import './CadastraTurma.css';
import api from '../../../services/api';
import '../../../CSS/global.css'




export default function CadastrarTurma() {

    const [nomeTurma, setNomeTurma ] = useState();
    const [dataIngresso, setDataIngresso ] = useState();
    

    async function criarTurma(){
        try{
            if(!nomeTurma && !dataIngresso){
                return alert('Preencha Todos campos')
            }
            const response = await api.post('/turma',{
                nome_turma: nomeTurma,
                data_ingresso: dataIngresso
            })
            console.log(response)
            alert('Cadastrado com sucesso!')
        } catch(error){
            console.log(error)
        }
    }
  

    return(
        <>
            <Menu />
            <div class="perfil-instituicao-bg" >
                    <div class="perfil-titulo">
                        <h2>Cadastrar Turma</h2>
                    </div>
            </div>
            <div class="cadastrar-turma-flex-80vh">
                <label>Nome da Turma</label>
                <input 
                    onChange={( {target: { value }}) => setNomeTurma(value)}
                    class="input-global-css-entrada" type="text" maxLength={20}/>
                <label>Data Ingresso</label>
                <input 
                    onChange={({ target: {value } } ) => setDataIngresso(value)}
                    class="input-global-css-entrada" type="text" maxLength={20}/>
                <button onClick={criarTurma}
                    class="button-cadastrar-semestre-env">Cadastrar</button>
            </div>
   
        </>
    )
}
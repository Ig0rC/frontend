import React, { useState, useEffect } from 'react';
import Menu from '../../../Components/administrador/header/header.js';
import './CadastrarCursos.css';
import api from '../../../services/api';




export default function CadastrarCursos(){

    const [nome, setNome ] = useState('');
    const [ semestre, setSemestre ] =useState('')
    const [periodo, setPeriodo] = useState('');
    const [nivel, setNivel] = useState('')
    const [horario, setHorario] = useState('');
    const [time, setTime ] = useState([]);

  



    useEffect(() => {

        (async function(){
            const time = await api.get('/searchHorario');
            setTime(time.data)

        })();
       
    }, [])





    

    function validarCampos(){
        if(!nome === false && !semestre === false && !periodo === false && !nivel === false && !horario === false){
            cadastrarback();
        }
        else {
            alert("Preencha todos campos!")
        }
    }

    async function cadastrarback(){
        try {
            const response = await api.post('/cursos',{
                nome_curso: nome,
                duracao_semestres: semestre,
                periodo: periodo,
                nivel: nivel,
                carga_horaria: horario
            })
            console.log(response)
            window.alert('Cadastrado com sucesso')
        } catch (error) {
           window.alert('error: verifique os campos')
        }
    }
     return(
    <>
    <Menu />
             <div class="perfil-instituicao-bg" >
                    <div class="perfil-titulo">
                        <h2>Cadastrar Cursos</h2>
                    </div>
            </div>
                <div class="titulo-styles-cadastrar-cursos">         
                </div>
                    <div class="cadastrar-turma-flex-80vh">
                            <p>Nome do Curso:</p>
                            <input
                                class="input-global-css-entrada"
                                type="text"
                                onChange={({ target: { value }}) => setNome(value)}
                            />
           

                            <p>Duração do curso em Semestres:</p>
                            <input
                                class="input-global-css-entrada"
                                type="text"
                                onChange={({ target: { value }}) => setSemestre(value)}
           
                            />
                            <p>período:</p>
                            <input
                                class="input-global-css-entrada"
                                type="text"
                                onChange={({ target: { value }}) => setPeriodo(value)}
                            />
                            <p>Nível:</p>
                            <input 
                            class="input-global-css-entrada" 
                            type="text" 
                            onChange={({ target: { value }}) => setNivel(value)}
                            />
                
             
                            <p>Carga Horária:</p>
                           <select 
                            class="input-global-css-entrada styles-select-global"
                            onChange={({ target: {value }}) => setHorario(value)}
                           > 
                            <option></option>
                               {time.map(time =>(
                                   <option>{time.horas}</option>
                               ))}   
                          </select>
                </div>
                <div class="flex-button-cadastrar-cursos">
                    <button 
                         
                    class="styles-button-instituicao-env" onClick={validarCampos}>Cadastrar</button>
                </div>
         
    </>
    )
}
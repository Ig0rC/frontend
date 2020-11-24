import React, { useState, useEffect } from 'react';
import Menu from '../../../Components/administrador/header/header.js';
import './CadastrarCursos.css';
import api from '../../../services/api';




export default function CadastrarCursos(){

    const [nome, setNome ] = useState('');
    const [ semestre, setSemestre ] =useState(0)
    const [periodo, setPeriodo] = useState('');
    const [nivel, setNivel] = useState('')
    const [time, setTime ] = useState([]);

  



    useEffect(() => {

        (async function(){
            const time = await api.get('/searchHorario');
            setTime(time.data)

        })();
       
    }, [])




    const [horario, setHorario] = useState('');
    


    async function cadatrarback(){
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
                <div class="titulo-styles-cadastrar-cursos">
                    <h1>Cadastrar Cursos</h1>
                </div>
                <div class="columns-flex-cadastrar-cursos">
                    <div class="column-div-instituicao-cadastro">
                        <div>
                            <p>Nome do Curso:</p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                onChange={({ target: { value }}) => setNome(value)}
                            />
                        </div>
                        <div>
                            <p>Duração do curso em Semestres:</p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                onChange={({ target: { value }}) => setSemestre(value)}
           
                            />
                        </div>
                        <div>
                        <p>período:</p>
                            <input
                                class="input-styles-IT"
                                type="text"
                                onChange={({ target: { value }}) => setPeriodo(value)}
                            />
                        </div>
                        <div>
                        <p>Nível:</p>
                            <input 
                            class="input-styles-IT" 
                            type="text" 
                            onChange={({ target: { value }}) => setNivel(value)}
                        />
                        </div>
                        <div>
                        <p>Carga Horária:</p>
                           <select 
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: {value }}) => setHorario(value)}
                           > 
                               {time.map(time =>(
                                   <option>{time.horas}</option>
                               ))} 
                                   
                            
        
                          </select>
                        </div>
                    </div>
                    <div class="flex-button-IT">
                 
                </div>
                
                </div>
                <div class="flex-button-cadastrar-cursos">
                    <button 
                 
                    class="styles-button-instituicao-cancel" >Cancelar</button>
                    <button 
                         
                    class="styles-button-instituicao-env" onClick={() => cadatrarback()}>Cadastrar</button>
                </div>
         
    </>
    )
}
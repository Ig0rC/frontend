import React, { useState } from 'react';
import Menu from '../../../Components/administrador/header/header.js';
// import Container from '../../Components/ContainerList/containerlist.js';
 import './CadastrarCursos.css';
 import api from '../../../services/api'



export default function CadastrarCursos(){

    const [nome, setNome ] = useState('');
    const [ semestre, setSemestre ] =useState(0)
    const [periodo, setPeriodo] = useState('');
    const [nivel, setNivel] = useState('')
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
            window.alert('SUCESSO MEU GAROTO, dormi feliz')
        } catch (error) {
           window.alert('errou otario')
        }
    }
     return(
    <>
    <Menu />
                <div class="titulo-styles-cadastrar-cursos">
                    <h1>Cadastrar Instituição</h1>
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
                            <p>duração Semestre:</p>
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
                            <input 
                                class="input-styles-IT" 
                                type="text" 
                                maxLength={8}
                                onChange={({ target: { value }}) => setHorario(value)}
                            />
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
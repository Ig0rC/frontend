import React, { useState} from 'react';
import api from '../../../services/api';
import Menu from '../../../Components/administrador/header/header'
import './CadastrarSemestres.css'



function CadastrarSemestre(){
    const [semestre, setSemestre] = useState('');
    const [ ano , setAno ] = useState('');

    async function EnvCadastrarSemestre(){
        try{
            const response = await api.post('/semestre',{
                semestre: semestre,
                ano: ano
            });
            console.log(response);
            window.alert('deu certo')
        } catch(error){
            console.log(error)
        }

    }
    return(
        <>
        <Menu />
            <div class='container-meio-cadastrar'>
                <div>
                    <label>Semestre</label>
                </div>
                <div class="container-input-cadastrar-semestre">
              
                    <input 
                        class="input-cadastrar-semestre-entrada-text" 
                        type='text' 
                        maxLength={10} 
                        placeholder="Ex: 2"
                        onChange={ ( { target: { value }}) => setSemestre(value)}
                        />
                </div>
                <div>
                    <label>Ano</label>
                </div>
                <div class="container-input-cadastrar-semestre">
                    <input 
                        class="input-cadastrar-semestre-entrada-text"
                        type='text' 
                        maxLength={10} 
                        placeholder="Ex: 2020"
                        onChange={ ( { target: { value }}) => setAno(value)}
                        />
                      
                </div>
                <div class="container-input-cadastrar-semestre">
                    <button onClick={EnvCadastrarSemestre} class="button-cadastrar-semestre-env">Cadastrar</button>
                </div>
            </div>
        </>
    )
}

export default CadastrarSemestre;

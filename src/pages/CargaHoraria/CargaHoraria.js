import React, { useState } from 'react';
import './CargaHoraria.css'
import Menu from '../../Components/administrador/header/header';
import api from '../../services/api'



export default function CadastrarCargaHoraria(){

    const [ time, setTime] = useState('');

    async function CadastrarTime(){
        try{
            const response = await api.post('/cargahoraria', {
                horas: time
            });
            console.log(response)
            window.alert('ok')

        } catch (error){
            window.alert('error ao cadastrar')
        }
     
    }
    return(
        <>
            <Menu />
            <div class="cadastrar-cargahoraria-flex">
                <div>
                    <div class="margin-cadastrar-carga-horariadiv">
                        <label>
                            Horas
                        </label>
                    </div>
                    <div class="margin-cadastrar-carga-horariadiv">
                        <input class="time-cadastrar-cargar-horaria" type="text" 
                        placeholder="05:00 = 5 horas"
                        onChange={ ({target: {value }}) => setTime(value)}/>
                    </div>
                    <div class="margin-cadastrar-carga-horariadiv">
                        <button 
                            onClick={CadastrarTime}
                            class="button-cadastrar-carga-horaria">Cadastrar</button>
                    </div>

                </div>
            </div>
        </>
    )

}
import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import Menu from '../../../Components/administrador/header/header.js';
import './CadastrarDisciplinas.css'




export default function CadastrarDisciplina() {

    const [time, setTime] = useState([]);

    const [nomeDiscplina, setNomeDisciplina ] = useState('');
    const [diaSemana , setDiaSemana] = useState('');
    const [horarioAula, setHorarioAula] = useState('');
    const [horas, setHoras] = useState('');


    async function criarDisciplina(){
        console.log(horarioAula)
        try{
            const response = await api.post('/disciplina', {
                nome_disciplina: nomeDiscplina,
                horario_aula: horarioAula,
                diasemana: diaSemana,
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
            <div class="titulo-styles-cadastrar-cursos">
                <h1>Cadastrar Disciplinas</h1>
            </div>
            <div >
                <div class="space-bottom-cadastrar-Disciplina">
                    <p>Nome Disciplina:</p>
                    <input
                        class="input-styles-IT"
                        type="text"
                     onChange={({ target: { value }}) => setNomeDisciplina(value)}
                    />
                </div>
                <div class="space-bottom-cadastrar-Disciplina">
                    <p>Horário da Aula:</p>
                    <input
                        class="input-styles-IT"
                        type="text"
                        onChange={({ target: { value }}) => setHorarioAula(value)}
                    />
                </div>
                <div class="space-bottom-cadastrar-Disciplina">
                    <p>Dia da Semana:</p>
                    <select
                        class="input-styles-IT text-aling-center-cadastrar-curso"
                        onChange={({ target: { value } }) => setDiaSemana(value)}
                    >
                        <option ></option>
                        <option value="Segunda-Feira">Segunda-Feira</option>
                        <option value="Terça-Feira">Terça-Feira</option>
                        <option value="Quarta-Feira">Quarta-Feira</option>
                        <option value="Quinta-Feira">Quinta-Feira</option>
                        <option value="Sexta-Feira">Sexta-Feira</option>
                        <option value="Sábado">Sábado</option>
                        <option value="Domingo">Domingo</option>
                    </select>
                </div>
                <div class="space-bottom-cadastrar-Disciplina">
                    <p>Carga Horária:</p>
                    <select
                        class="input-styles-IT text-aling-center-cadastrar-curso"
                        onChange={({ target: { value } }) => setHoras(value)}
                    >
                        <option ></option>
                        {time.map(time => (
                            <option >{time.horas}</option>
                        ))}



                    </select>
                </div>
            </div>
            <div class="flex-button-cadastrar-cursos">
                <button 
                    onClick={criarDisciplina}       
                    class="styles-button-instituicao-env">Cadastrar</button>
                </div>
        </>
    )
}
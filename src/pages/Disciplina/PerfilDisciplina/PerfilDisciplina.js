import React, { useContext, useEffect, useState, useRef } from 'react';
import Menu from '../../../Components/administrador/header/header';
import { ContextDisciplina } from '../../../Context/DisciplinaContext';
import '../../../CSS/global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api';
import './PerfilDisciplina.css'









export default function PerfilDisciplina() {

    const { idC } = useContext(ContextDisciplina);
    const [ disciplina, setDisciplina ] = useState([]);
    const [time, setTime] = useState([]);



  
    useEffect(() => {
        (async () =>{
            const response = await api.get(`/disciplina/seleciona/${idC}`)
            setDisciplina(response.data)


            const time = await api.get('/searchHorario');
            setTime(time.data)

        })();
    }, [])


    async function AtualizarDisciplina(){
        try {
            const response = await api.put(`/disciplina/${idC}`,{
                nome: nomeDisciplina.current.value,
                horas: cargaHoraria.current.value
            });
            console.log(response);
            window.alert('Atualizado com sucesso')
        } catch (error) {
            alert(error)
        }
    }
    const nomeDisciplina = useRef(null);
    const cargaHoraria = useRef(null);

    return (
        <>
            <Menu />
            <div class="perfil-instituicao-bg" >
                <div class="perfil-titulo">
                    <h2>Dados da Disciplina</h2>
                </div>
            </div>
            <section>
                {disciplina.map(disciplina => (
                     <div key={disciplina.id_disciplina}class="perfil-curso-div-center">
                     <p>Código do Curso:
                     </p>
                     <input className="input-perfil-disciplina-att"type="number" readOnly value={disciplina.id_disciplina}/>
                     <p>Nome Disciplina: </p>
                     <input
                         ref={nomeDisciplina}
                         class="input-perfil-disciplina-att"
                         type="text"
                         defaultValue={disciplina.nome_disciplina}
                     />
                     <p>Carga Horária: </p>
                     <select
                        class="input-perfil-disciplina-att-select"
                        ref={cargaHoraria}
                    >
                        {time.map(time => (
                            <option >{time.horas}</option>
                        ))}
                    </select>
                 </div>
                ))}      
            </section>
            <section>
                <div className="icon-save-one-perfil">
                     <div>
                         <a 
                            onClick={AtualizarDisciplina}
                        >
                             <FontAwesomeIcon icon={faSave} size="3x" color="green" />
                         </a>
                     </div>   
                </div>
            </section>
      
        </>
    )
}
import React, { useContext, useEffect, useState, useRef } from 'react';
import Menu from '../../../Components/administrador/header/header';
import { Context } from '../../../Context/DisciplinaContext';
import '../../../CSS/global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api'









export default function PerfilDisciplina() {

    const { idC } = useContext(Context);
    const [ disciplina, setDisciplina ] = useState([]);

    useEffect(() => {
        (async () =>{
            const response = await api.get(`/disciplina/seleciona/${idC}`)
            setDisciplina(response.data)
        })();
    }, [])

    const { id } = useContext(Context);
    console.log(id);

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
                        <strong>{disciplina.id_disciplina}</strong> 
                     </p>
                     <p>Nome Disciplina: </p>
                     <input
                         ref={nomeDisciplina}
                         class="input-styles-IT"
                         type="text"
                         defaultValue={disciplina.nome_disciplina}
                     />
                     <p>Carga Horária: </p>
                     <input
                         ref={cargaHoraria}
                         class="input-styles-IT"
                         type="text"
                         defaultValue={disciplina.horas}
                     />
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
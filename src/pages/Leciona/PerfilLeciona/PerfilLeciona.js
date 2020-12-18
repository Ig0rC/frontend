import React, { useEffect, useState, useRef, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header';
import api from '../../../services/api';
import { ContextLeciona } from '../../../Context/LecionaContext';
import './PerfilLeciona.css'







export default function PerfilLeciona (){
    const [ leciona, setLeciona ] = useState([]);
    const [ cpf, setCPF] = useState();
    const [professores, setProfessor ] = useState([]);


    const { professor, Disciplina, turma } = useContext(ContextLeciona);

    
    const cpfProfessor = useRef(null);
    useEffect(() =>{
        
        (async () => {
            const response = await api.get(`/administrador/selecionar/lecionados/${professor}/${Disciplina}/${turma}`);
            setLeciona(response.data)

        

            const responseProfessor = await api.get('/professor/buscar/leciona/all');
            setProfessor(responseProfessor.data)
            console.log(responseProfessor.data)
           
        })();

  
      
    }, []);

    async function teste(){
       
        (async () => {
            try {

                if(cpfProfessor.current.value === ''){
                    return alert('Dados Vazios')
                }
                const response = await api.put(`/administrador/atualizar/lecionados/${professor}/${Disciplina}/${turma}`,{
                    newProfessor: cpfProfessor.current.value
                })
                alert('deu certo');

            }
          catch (error) {
                console.log(error)
            }
        })();
    }



    return(
        <>
            <Menu />
            <section className="section-perfil-leciona-administrador">
            {leciona.map(leciona => (
                <div className="div-perfil-leciona-administrador">
                    <p>CPF:</p>
                    <input readOnly value={leciona.cpf_professor} type="number" />
                    <p>Nome do Professor:</p>
                    <select 
                               ref={cpfProfessor}
                          
                            classNAme="styles-select-global"
                            > 
                                <option value={leciona.cpf_professor}>{leciona.nome}</option>
                                {professores.map(professor => (
                                    <option 
                                    value={professor.cpf === leciona.cpf_professor ? null : professor.cpf }
                                    >
                                        {professor.nome === leciona.nome ? null : professor.nome}
                                    </option>
                                ))}
                            </select>
                    <p>Nome da Disciplina:</p>
                    <input readOnly value={leciona.nome_disciplina}type="text" />
                    <p>Nome da Turma:</p>
                    <input readOnly value={leciona.nome_turma} type="text" />
                    <p>Semestre: </p>
                        <input readOnly value={leciona.semestre}  type="text" />
                    <p>Ano:</p>
                         <input readOnly value={leciona.ano}v type="text" />
                    <p>Dia Semana:</p>
                        <input readOnly value={leciona.dia_semana}v type="text" />
                    <p>Horário Aula:</p>
                    <input  readOnly defaultValue={leciona.horario_aula} type="text" />
                    <button className="styles-button-perfil-leciona" onClick={teste}>Atualizar</button>
                </div>

            ))}
          
            </section>
        </>
    )
}
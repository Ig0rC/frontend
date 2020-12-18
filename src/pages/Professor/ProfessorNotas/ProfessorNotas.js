import React, { useContext, useEffect, useState} from 'react';
import Menu from '../../../Components/Professor/header/headerProfessor';
import { Context } from '../../../Context/ProfessorNotaContext';
import api from '../../../services/api';
import MenuAdministrador from '../../../Components/administrador/header/header.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './ProfessorNotas.css'


export default function ProfessorNotas(){
    const [loading, setLoading] = useState(true);
    const { idTurma, semestreC, anoC, idDisciplina, ProfessorOuAdministrador } = useContext(Context)
    const [ aluno, setAluno ] = useState([]);
    const [escolhaBimestre, setEscolhaBimestre ] = useState('')
    const [nota, setNota] = useState(0);
    const [cpfAluno, setCPF] = useState('');

    //toda vez que for retorna ou lançar alguma coisa no banco, sempre tem que ter o metodo async/await
    //pois pra não retorna uma promisse e também são metodos demorados.
    useEffect(() => {
        (async () => {
            const response = await api.get(`/professor/turma/selecionada/notas/${idTurma}/${idDisciplina}`)
            setAluno(response.data);
            console.log(response.data)
        }
        )();
    },[])

    useEffect(() =>{
        console.debug("escolha bimestre", !escolhaBimestre)
        if(!escolhaBimestre){
           return  setLoading(true)
        }
        return  setLoading(false)
    }, [escolhaBimestre])

    async function maxLengthCheck (object) {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }
    
    useEffect(() => {
        //FUNÇÃO AUTO INVOCAVEL
        (async () => { 
            await api.post(`/professor/avalia/aluno` ,{
                cpf_aluno: cpfAluno,
                nota: nota,
                bimestre: escolhaBimestre,
                idDisciplina:idDisciplina,
                idTurma: idTurma
            });
        })();


    }, [nota])

    
    if(loading === true && ProfessorOuAdministrador === '1'){
        return(
            <>
        <MenuAdministrador />

        {/* Opções */}
        <div class="input-cadastrar-curso-a-instituicao">
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Semestre:</p>
                    <select
                        class="input-styles-IT text-aling-center-cadastrar-curso"
                    >
                        <option>{semestreC}</option>

                    </select>
                </div>
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Ano:</p>
                    <select
                        class="input-styles-IT text-aling-center-cadastrar-curso"
                    >
                        <option>{anoC}</option>
                    </select>
                </div>
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Bimestre:</p>

                         <select
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value } }) => setEscolhaBimestre(value)}
                        >
                            <option value='false'>Escolha um bimestre</option>
                            <option value="1º Bimestre">1º Bimestre</option>
                            <option value="2º Bimestre">2º Bimestre</option>
                            <option value="3º Bimestre">3º Bimestre</option>
                            <option value="4º Bimestre">4º Bimestre</option>
                        </select>       
                </div>
            </div>
            </>
        )
    }

    if(loading === true){
        return(
            <>
        <Menu />

        {/* Opções */}
        <div class="input-cadastrar-curso-a-instituicao">
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Semestre:</p>
                    <select
                        class="input-styles-IT text-aling-center-cadastrar-curso"
                    >
                        <option>{semestreC}</option>

                    </select>
                </div>
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Ano:</p>
                    <select
                        class="input-styles-IT text-aling-center-cadastrar-curso"
                    >
                        <option>{anoC}</option>
                    </select>
                </div>
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Bimestre:</p>

                         <select
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value } }) => setEscolhaBimestre(value)}
                        >
                            <option value='false'>Escolha um bimestre</option>
                            <option value="1º Bimestre">1º Bimestre</option>
                            <option value="2º Bimestre">2º Bimestre</option>
                            <option value="3º Bimestre">3º Bimestre</option>
                            <option value="4º Bimestre">4º Bimestre</option>
                        </select>       
                </div>
            </div>
            </>
        )
    }

    if(ProfessorOuAdministrador === '1'){
        return(
            <>
            <MenuAdministrador />
    
            {/* Título */}
            <div class="cadastrar-curso-a-instituicao-titulo">
            <h1></h1>
            </div>
    
    
            {/* Divisor */}
            <div class="linha-separado-instituicao-perfil">
            </div>
            {aluno.map(aluno => (
                 <div className="Professor-notas-Alunos">
                 <div className="tabela-professor-nota">
                     <div>
                         <p>CPF: {aluno.cpf_aluno}</p>
                         <p>Nome: {aluno.nome}</p>
                         <p>Bimestre: {escolhaBimestre}</p>
                         <p>Semestre: {semestreC}</p>
                         <p>Ano: {anoC}</p>
                     </div>
                     <div className="inputs-professor-notas">
                         <p>Nota: </p>
                         <input 
                            defaultValue={aluno.nota}
                            onSelect={() => setCPF(aluno.cpf_aluno)}
                            onChange={( { target: {value} } ) => setNota(value)}
                            className="input-nota-entrada" type="number" 
                            onInput={maxLengthCheck}
                            maxLength = "2" 
                            max="10"
                        />
                     </div>
                 </div> 
             </div>
            ))}
            </>
        )

    }

    return(
        <>
        <Menu />

        {/* Título */}
        <div class="cadastrar-curso-a-instituicao-titulo">
        <h1></h1>
        </div>


        {/* Divisor */}
        <div class="linha-separado-instituicao-perfil">
        </div>
        {aluno.map(aluno => (
             <div className="Professor-notas-Alunos">
             <div className="tabela-professor-nota">
                 <div>
                     <p>CPF: {aluno.cpf_aluno}</p>
                     <p>Nome: {aluno.nome}</p>
                     <p>Bimestre: {escolhaBimestre}</p>
                     <p>Semestre: {semestreC}</p>
                     <p>Ano: {anoC}</p>
                 </div>
                 <div className="inputs-professor-notas">
                     <p>Nota: </p>
                     <input 
                        defaultValue={aluno.nota}
                        onSelect={() => setCPF(aluno.cpf_aluno)}
                        onChange={( { target: {value} } ) => setNota(value)}
                        className="input-nota-entrada" type="number" 
                        onInput={maxLengthCheck}
                        maxLength = "2" 
                        max="10"
                    />
                 </div>
             </div> 
         </div>
        ))}
        </>
    )
}
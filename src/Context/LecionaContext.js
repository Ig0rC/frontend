import React, { createContext, useEffect, useState } from 'react';
import history from '../pages/history';




const ContextLeciona = createContext();


function LecionaContext ( { children }) {
    const [ professor, setProfessor ] = useState();
    const [ Disciplina , setDisciplina ] = useState();
    const [ turma, setTurma ] = useState();
    
    async function SelecionarLeciona(cpfProfessor, idDisciplina, idTurma){
        await setProfessor(cpfProfessor);
        await setDisciplina(idDisciplina);
        await setTurma(idTurma);
        localStorage.setItem('ProfessorLeciona', JSON.stringify(cpfProfessor))
        localStorage.setItem('DisciplinaLeciona', JSON.stringify(idDisciplina))
        localStorage.setItem('idTurmaLeciona', JSON.stringify(idTurma));
        history.push('/buscar-leciona-professores-perfil');
        
    }

    useEffect(() =>{
        const cpfProfessor = localStorage.getItem('ProfessorLeciona');
        const idDisciplina = localStorage.getItem('DisciplinaLeciona');
        const idTurmaLeciona = localStorage.getItem('idTurmaLeciona');
        if(cpfProfessor && idDisciplina && idTurmaLeciona){
            setProfessor(`${JSON.parse(cpfProfessor)}`)
            setDisciplina(`${JSON.parse(idDisciplina)}`)
            setTurma(`${JSON.parse(idTurmaLeciona)}`)
        }
      
    })


    return(
        <>
            <ContextLeciona.Provider value={{ SelecionarLeciona, professor, Disciplina, turma}}>
                {children}
            </ContextLeciona.Provider>
        </>
    )
}


export { ContextLeciona, LecionaContext};
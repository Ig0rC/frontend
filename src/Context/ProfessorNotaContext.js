import React, { createContext, useEffect, useState } from 'react';
import history from '../pages/history';



const Context = createContext();


function ProfessorNotaTurma( {children } ){
    const [ idTurma, setIdTurma] = useState();
    const [ semestreC, setSemestreC] = useState();
    const [ anoC, setAnoC ] = useState();
    const [ idDisciplina, setIdDisciplina] = useState();

    async function SelecionaTurmaNota(idTurma, semestre, ano, disciplina, alternario){
        localStorage.removeItem('turma')
        localStorage.removeItem('semestreProfessor')
        localStorage.removeItem('anoProfessor')
        localStorage.removeItem('disciplinaProfessor')

        await setSemestreC(semestre);
        await setAnoC(ano)
        await setIdDisciplina(disciplina)
        localStorage.setItem('turma', JSON.stringify(idTurma));
        localStorage.setItem('semestreProfessor', JSON.stringify(semestre));
        localStorage.setItem('anoProfessor', JSON.stringify(ano));
        localStorage.setItem('disciplinaProfessor', JSON.stringify(disciplina));
        await setIdTurma(idTurma);
        if(alternario === 1){
           return history.push('/professor-turma-notas')
        }
        return history.push('/professor-falta-turma')
    }
    useEffect(() => {
        const id =  localStorage.getItem('turma')
        const idSemestre =  localStorage.getItem('semestreProfessor')
        const idAnoPRofessor = localStorage.getItem('anoProfessor')
        const disciplinaProfessor = localStorage.getItem('disciplinaProfessor')
        if(id){
            setIdTurma(`${JSON.parse(id)}`);
            setSemestreC(`${JSON.parse(idSemestre)}`);
            setAnoC(`${JSON.parse(idAnoPRofessor)}`);
            setIdDisciplina(`${JSON.parse(disciplinaProfessor)}`)
        }
    })
    return(
        <Context.Provider value={{ SelecionaTurmaNota, idTurma, semestreC, anoC, idDisciplina}}>
            {children}
        </Context.Provider>
    )
}

export { Context, ProfessorNotaTurma}
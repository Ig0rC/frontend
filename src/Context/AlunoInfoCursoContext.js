import React, { useEffect, useState, createContext } from 'react';
import history from '../pages/history'



const AlunoInfoContext = createContext();




function AlunoInfo( { children } ){
    const [ idInstituicao, setIdInstituicao ] = useState(0);
    const [ idCurso, setIdCurso ] = useState(0);


    async function selecionaCurso(idCursoAluno, idInstituicaoAluno){
        setIdInstituicao(idInstituicaoAluno)
        setIdCurso(idCursoAluno)
        localStorage.setItem('idCursoAluno', JSON.stringify(idCursoAluno))
        localStorage.setItem('idInstituicaoAluno', JSON.stringify(idInstituicaoAluno))
        history.push('/aluno-info-curso')
    }


    useEffect( () => {
            const idC = localStorage.getItem('idCursoAluno');
            const idT = localStorage.getItem('idInstituicaoAluno');
            if(idC && idT){
                setIdCurso(`${JSON.parse(idC)}`)
                setIdInstituicao(`${JSON.parse(idT)}`)
            }
    });


    return(
        <>
            <AlunoInfoContext.Provider value={ { selecionaCurso, idCurso, idInstituicao} }>
                {children}
            </AlunoInfoContext.Provider>
        </>
    )
}

export {AlunoInfo, AlunoInfoContext}
import React, { createContext, useEffect, useState } from 'react';
import history from '../pages/history';


const ContextDisciplina = createContext();

function DisciplinaContext( { children } ){
    const [idC, setID] = useState(0);

    async function SelecionaDisciplina(idD){
        localStorage.setItem('disciplina', JSON.stringify(idD));
        await setID(idD);
        history.push('/perfil-disciplina')
    }

    useEffect(() => {
        const id = localStorage.getItem('disciplina');
        if(id){
            setID(`${JSON.parse(id)}`)
        }        
    })
    return(
        <>
            <ContextDisciplina.Provider value={{ SelecionaDisciplina , idC}}>
                {children}
            </ContextDisciplina.Provider>
        </>
    )
}



export{ DisciplinaContext, ContextDisciplina}
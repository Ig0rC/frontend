import React, { createContext, useEffect, useState } from 'react';
import history from '../pages/history';


const Context = createContext();

function DisciplinaContext( { children } ){
    const [id, setID] = useState(0);

    async function SelecionaDisciplina(idD){
        localStorage.setItem('disciplina', JSON.stringify(idD));
        await setID(idD);
        history.push('/perfil-disciplina')
    }

    useEffect(() => {
        const id = localStorage.getItem('disciplina');
        if(id){
            setID(JSON.parse(id))
        }        
    })
    return(
        <>
            <Context.Provider value={{ SelecionaDisciplina , id}}>
                {children}
            </Context.Provider>
        </>
    )
}



export{ DisciplinaContext, Context}
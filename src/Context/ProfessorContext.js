import React, { createContext, useEffect, useState } from 'react';
import history from '../pages/history'


const Context = createContext();


function ProfessorContext( {children } ){
    const [ id, setId] = useState();

    async function SelecionarProfessor(id){
        localStorage.setItem('professor', JSON.stringify(id));
        await setId(id);
        history.push('/perfil-professor')
    }
    useEffect(() => {
        const id =  localStorage.getItem('professor')
        if(id){
            setId(`${JSON.parse(id)}`);
        }
    })
    return(
        <Context.Provider value={{ SelecionarProfessor, id}}>
            {children}
        </Context.Provider>
    )
}

export { Context, ProfessorContext}
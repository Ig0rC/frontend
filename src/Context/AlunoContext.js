import React, { createContext, useEffect, useState} from 'react';
import history from '../pages/history'




const Context = createContext();

function AlunoContext( { children }){
    const [id, setID] = useState('');

    async function selecionarAluno(id){
        try {
            await setID(id);
            history.push('/perfil-aluno');
            localStorage.setItem('idAluno', JSON.stringify(id));
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() =>{ 
        const id = localStorage.getItem('idAluno');
        if(id){
            setID(JSON.parse(id))
        }
    })
    return(
        <>
            <Context.Provider value={{ selecionarAluno, id}}>
                {children}
            </Context.Provider>
        </>

    )
}


export { AlunoContext, Context }
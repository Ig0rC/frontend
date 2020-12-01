import React, { createContext, useEffect, useState } from 'react';
import history from '../pages/history';


const ContextTurma = createContext();


function ContextTurmaPerfil({ children }){
    const [id, setID] = useState(0);

    async function SelecionaTurma(idTurma){
        localStorage.setItem('turma', JSON.stringify(idTurma));
        await setID(idTurma);
        history.push('/perfil-turma')
    }
    useEffect(()=>{
        const id = localStorage.getItem('turma');
        if(id){
            setID(JSON.parse(id))
        }
    })
    return(
    <>
        <ContextTurma.Provider value={{ SelecionaTurma, id}}>
            {children}
        </ContextTurma.Provider>
    </>
    )
 }

export {ContextTurmaPerfil, ContextTurma}
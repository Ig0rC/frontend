import React, { createContext, useContext, useEffect, useState }from 'react';
import history from '../pages/history.js';

const Context = createContext();



function InstituicaoID( {children }){
    const [ id , setID ] = useState(0);

    async function SaveID( id ) {
        localStorage.setItem('instituicao', JSON.stringify(id));
        await setID(id);
        history.push('/perfilinstituicao')
    }
    useEffect(()=>{
         const id = localStorage.getItem('instituicao');
         if(id){
            setID(`${JSON.parse(id)}`);
         }
    })

    return(
        <>
         <Context.Provider value={{ SaveID, id }}>
            {children}
        </Context.Provider>
        </>
    )
}


export { Context, InstituicaoID}
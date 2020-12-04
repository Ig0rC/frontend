import React, { createContext, useEffect, useState } from 'react';
import history from '../pages/history.js';

const Context = createContext();



function CursoContext( {children }){
    const [idc , setIDc] = useState(0);


    async function perfilCursoIdc(idc){
        localStorage.setItem('curso', JSON.stringify(idc));
        await setIDc(idc);
        history.push('/perfil-curso')
    }

    useEffect(()=> {
        const idc = localStorage.getItem('curso');
        if(idc){
            setIDc(`${JSON.parse(idc)}`);
        }
    })

    return(
        <>
            <Context.Provider value={{ perfilCursoIdc, idc}}>
                {children}
            </Context.Provider>
        </>
    )
}

export {CursoContext, Context};
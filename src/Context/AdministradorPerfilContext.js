import React, { createContext, useEffect, useState } from 'react';
import history from '../pages/history.js'



const AdministradorContext = createContext();



function AdministradorPerfilContext ( {children} ) {

    const [admin, setID] = useState();

    async function SelecionarAdministrador(cpf){
        await  localStorage.setItem('administrador', JSON.stringify(cpf));
       await  setID(cpf)
       history.push('/administrador-perfil')

    }
   


    useEffect(() =>{
        const id = localStorage.getItem('administrador');
        setID(`${JSON.parse(id)}`)
    })

   
    return(
        <AdministradorContext.Provider value= {{ SelecionarAdministrador, admin}}>
            {children}
        </AdministradorContext.Provider>
    )
}


export {AdministradorContext, AdministradorPerfilContext};


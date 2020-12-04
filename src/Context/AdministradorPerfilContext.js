import React, { createContext, useEffect, useState } from 'react';
import history from '../pages/history'



const AdministradorContext = createContext();



function AdministradorPerfilContext ( {children} ) {

    const [idAdmin, setID] = useState([]);

    async function SelecionarAdministrador(cpf){
        await setID(cpf)
        localStorage.setItem('administrador', JSON.stringify(cpf));
        history.push('/administrador-perfil')
    }

    useEffect(() =>{
        const id = localStorage.getItem('administrador');
        setID(JSON.parse(id))
    })

    return(
        <AdministradorContext.Provider value= {{ SelecionarAdministrador, idAdmin}}>
            {children}
        </AdministradorContext.Provider>
    )
}


export {AdministradorContext, AdministradorPerfilContext};


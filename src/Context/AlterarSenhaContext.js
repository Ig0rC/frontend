import React, {createContext, useState, useEffect} from 'react';
import history from '../pages/history.js'


const AlterarSenhaContext = createContext();


function AlterarSenhaC ( { children } ){

    const [ validation, setValidation ] = useState(false);
    const [ dados, setDados ] = useState('');

    async function Navegar(validationC, dadosC){ 
        setValidation(validationC);
        setDados(dadosC);
    }

    useEffect(() => {
        if(validation === true){
            history.push('/')
            alert(dados)
        }
    }, [validation])
    
    return(
        <AlterarSenhaContext.Provider value={{ Navegar, validation}}>
            {children}
        </AlterarSenhaContext.Provider>
    )
}

export { AlterarSenhaC, AlterarSenhaContext };
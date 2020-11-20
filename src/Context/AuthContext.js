import React, { createContext, useEffect, useState }from 'react';
import api from '../services/api';
import history from '../pages/history.js';
const Context = createContext();



function AuthProvider( {children} ) {

    const [autorizacao, setAutorizacao ] = useState(false);
    const [loading, setLoading ] = useState(true)

    
    useEffect(() =>{
        const token = localStorage.getItem('token');

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAutorizacao(true)
        }
        
        setLoading(false)
    }, [])
     
        async function ValidacaoLogin(){
            console.log('entrou')
            const { data: { token } } = await api.post('/login',{
                email: 'igor@gmail.com',
                password: '12345'
            })
            
            localStorage.setItem('token', JSON.stringify(token));

            api.defaults.headers.Authorization = `Bearer ${token}`;
            setAutorizacao(true);
            history.push('/pesqinstituicao');
        }
        console.log(localStorage)


        function logout(){
            setAutorizacao(false)
            localStorage.removeItem('token')
            api.defaults.headers.Authorization = undefined;
            history.push('/login')
        }



    return(
        <Context.Provider value={{ autorizacao, ValidacaoLogin, logout, loading }}>
            {children}
        </Context.Provider>
    )
}



export { Context, AuthProvider };
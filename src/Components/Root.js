import React from 'react';
import Routes from './Routes'
import { Router } from 'react-router-dom';
import { AuthProvider  } from '../Context/AuthContext'


import history from '../pages/history'

function Root(){
    return(
         <AuthProvider vaslue={{autorizacao: false}}>
            <Router history={history}>
                <Routes />
            </Router>
         </AuthProvider>
    ) 
}


export default Root;
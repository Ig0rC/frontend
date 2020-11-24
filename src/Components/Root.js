import React from 'react';
import Routes from './Routes'
import { Router } from 'react-router-dom';
import { AuthProvider  } from '../Context/AuthContext'
import { Login } from '../pages/login/login.js'
import { InstituicaoID } from '../Context/InstituicaoContext'
import history from '../pages/history';
import {CursoContext} from '../Context/CursoContext';
import { ContextTurmaPerfil } from '../Context/TurmaContext.js';
import { DisciplinaContext } from '../Context/DisciplinaContext';
import { AlunoContext } from '../Context/AlunoContext'



function Root(){
    return(
     
            <AuthProvider >
                <InstituicaoID>
                    <CursoContext>
                        <ContextTurmaPerfil>
                            <DisciplinaContext>
                                <AlunoContext>
                                    <Router history={history}>
                                        <Routes />
                                    </Router>
                                </AlunoContext>
                            </DisciplinaContext>
                        </ContextTurmaPerfil>    
                    </CursoContext>
                </InstituicaoID>
         </AuthProvider>
    
    ) 
}


export default Root;
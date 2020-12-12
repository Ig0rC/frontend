import React from 'react';
import Routes from './Routes'
import { Router } from 'react-router-dom';
import { AuthProvider } from '../Context/AuthContext'
import { Login } from '../pages/login/login.js'
import { InstituicaoID } from '../Context/InstituicaoContext'
import history from '../pages/history';
import { CursoContext } from '../Context/CursoContext';
import { ContextTurmaPerfil } from '../Context/TurmaContext.js';
import { DisciplinaContext } from '../Context/DisciplinaContext';
import { AlunoContext } from '../Context/AlunoContext';
import { ProfessorContext } from '../Context/ProfessorContext';
import { ProfessorNotaTurma } from '../Context/ProfessorNotaContext';
import { AlunoInfo } from '../Context/AlunoInfoCursoContext';
import { AdministradorPerfilContext } from '../Context/AdministradorPerfilContext';



function Root() {
    return (

        <AuthProvider >
            <AdministradorPerfilContext>
                <InstituicaoID>
                    <CursoContext>
                        <ContextTurmaPerfil>
                            <DisciplinaContext>
                                <AlunoContext>
                                    <ProfessorContext>
                                        <ProfessorNotaTurma>
                                            <AlunoInfo>
                                                <Router history={history}>
                                                    <Routes />
                                                </Router>
                                            </AlunoInfo>
                                        </ProfessorNotaTurma>
                                    </ProfessorContext>
                                </AlunoContext>
                            </DisciplinaContext>
                        </ContextTurmaPerfil>
                    </CursoContext>
                </InstituicaoID>
            </AdministradorPerfilContext>
        </AuthProvider>

    )
}


export default Root;
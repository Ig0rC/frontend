import React, { useContext } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import InicialAluno from '../pages/InicialAluno';  
import Login from '../pages/login/login';
import Cadastro from '../pages/Cadastro'
import Instituicao from '../pages/Instituiçao/CadastrarInstituicao';
import BuscarInstituicao from '../pages/Instituiçao/BucarInstituicao'
import PerfilInstituicao from '../pages/Instituiçao/InstituicaoPerfil/InstituicaoPerfil.js'

//cursos
import BuscarCurso from '../pages/Curso/BuscarCursos/BuscarCurso.js';
import CadastrarCursos from '../pages/Curso/CadastrarCursos/CadastrarCursos.js';


//Context

import { Context } from '../Context/AuthContext';

function CustomRoute({ isPrivate, ...rest}){
    const { loading, autorizacao } = useContext(Context);



    
    if(loading){
        return <h1>loading</h1>
    }

    if(isPrivate && !autorizacao){
        return <Redirect to="/login" />

    }

    return <Route {...rest} />
}

function Routes (){
    return(   
        <Switch>
            <CustomRoute exact path='/' component={Cadastro} />
            <CustomRoute exact path='/login' component={Login} />
            <CustomRoute exact path='/homealuno' component={InicialAluno} />
            <CustomRoute exact path='/instituicao' component={Instituicao} />
            <CustomRoute isPrivate exact path='/pesqinstituicao' component={BuscarInstituicao} />
            <CustomRoute exact path='/perfilinstituicao' component={PerfilInstituicao} />
            <CustomRoute exact path='/pesquisacursos' component={BuscarCurso} />
            <CustomRoute exact path='/cadastrarcursos' component={CadastrarCursos} />

        </Switch>
  )
}


export default Routes;
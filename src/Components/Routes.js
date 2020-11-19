import React from 'react';
import { Switch, Route} from 'react-router-dom';

import InicialAluno from '../pages/InicialAluno';  
import Login from '../pages/login';
import Cadastro from '../pages/Cadastro'
import Instituicao from '../pages/Instituiçao/CadastrarInstituicao';
import BuscarInstituicao from '../pages/Instituiçao/BucarInstituicao'
import PerfilInstituicao from '../pages/Instituiçao/InstituicaoPerfil/InstituicaoPerfil.js'

//cursos
import BuscarCurso from '../pages/Curso/BuscarCursos/BuscarCurso.js';
import CadastrarCursos from '../pages/Curso/CadastrarCursos/CadastrarCursos.js';


function Routes (){
    return(   
        <Switch>
            <Route exact path='/' component={Cadastro} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/homealuno' component={InicialAluno} />
            <Route exact path='/instituicao' component={Instituicao} />
            <Route exact path='/pesqinstituicao' component={BuscarInstituicao} />
            <Route exact path='/perfilinstituicao' component={PerfilInstituicao} />
            <Route exact path='/pesquisacursos' component={BuscarCurso} />
            <Route exact path='/cadastrarcursos' component={CadastrarCursos} />

        </Switch>
  )
}


export default Routes;
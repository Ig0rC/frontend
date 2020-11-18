import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import InicialAluno from '../pages/InicialAluno';  
import Login from '../pages/login';
import Cadastro from '../pages/Cadastro'
import Instituicao from '../pages/Instituiçao/CadastrarInstituicao';
import BuscarInstituicao from '../pages/Instituiçao/BucarInstituicao'
import PerfilInstituicao from '../pages/Instituiçao/InstituicaoPerfil/InstituicaoPerfil.js'

function Routes (){
    return(   
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Cadastro} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/homealuno' component={InicialAluno} />
            <Route exact path='/instituicao' component={Instituicao} />
            <Route exact path='/pesqinstituicao' component={BuscarInstituicao} />
            <Route exact path='/perfilinstituicao' component={PerfilInstituicao} />

        </Switch>
    </BrowserRouter> )
 
}


export default Routes;
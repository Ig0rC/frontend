import React, { useContext, useState } from 'react';

import img from '../../img/img-sejus.jpg';
import { Context } from '../../Context/AuthContext'
import './login.css';



function Login(){


    const { autorizacao, ValidacaoLogin } = useContext(Context);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    function tesete(){

    }
    return(
        <>
    <div class="container-from-login">
        <div class="login">
            <div class="form">
                <div class="titulo">
                    <h1 class="cssTitulo">Sejá Bem-vindo</h1>
                </div>
         
                    <div class="inputs">
                        <div class="email">
                             <label for="email">E-mail{email}</label>
                            <input class=" styleInput" type="email" id="email" name="email"
                            onChange={( {target: {value}}) => setEmail(value)}
                            placeholder="email" />
                        </div>
                        <div class="senha">
                            <label for="senha">Senha</label>
                            <input class=" styleInput" type="password" id="password" name="password"
                                    onChange={( {target: {value}}) => setPassword(value)}
                            placeholder="senha" />
                        </div>

                    </div>
           
                <div class="botao ">
                    <input class="submit" type="button" value="Entrar " onClick={() => ValidacaoLogin(email, password)}/>
                </div>
                <div class="senhareset">
                    <a > <label for="senha"> Esqueci Minha Senha</label> </a>
                </div>
                <div class="cadastrar">
                    <a > <label for="senha">Cadastrar</label> </a>
                </div>
            </div>

            <div class="logo-login ">
                <div class="titulo_sejus ">
                    <img class="imglogo" src={img}/>
                </div>

            </div>

        </div>
    </div>

        </>
    )
}

export  default Login;
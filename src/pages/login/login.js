import React, { useContext } from 'react';

import img from '../../img/img-sejus.jpg';
import { Context } from '../../Context/AuthContext'
import './login.css'


function Login(){
    const { autorizacao, ValidacaoLogin } = useContext(Context)

    console.debug('Login', autorizacao)

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
                        <label for="email">E-mail</label>
                        <input class=" styleInput" type="email" id="email" name="email"
                           placeholder="email" />
                    </div>
                    <div class="senha">
                        <label for="senha">Senha</label>
                        <input class=" styleInput" type="password" id="password" name="password"
                        placeholder="senha" />
                    </div>
                    <div class="opcao">
                        <label for="cars">Opção de Usuário</label>
                        <select class=" styleInput" id="cars" name="cars">
                            <option value="Professor">Professor</option>
                            <option value=" Aluno">Aluno</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                    </div>


                </div>

                <div class="botao ">
                    <input class="submit" type="button" value="Entrar " onClick={ValidacaoLogin}/>
                </div>
                <div class="senhareset">
                    <a > <label for="senha"> Esqueci Minha Senha</label> </a>
                </div>
                <div class="cadastrar">
                    <a > <label for="senha">Cadastrar</label> </a>
                </div>
            </div>

            <div class="logo ">
                <div class="titulo_sejus ">
                    <img class="imglogo" src={img}/>
                </div>

            </div>

        </div>
    </div>

        </>
    )
}

export default Login;
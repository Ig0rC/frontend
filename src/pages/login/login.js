import React, { useContext, useState } from 'react';

import img from '../../img/img-sejus.jpg';
import { Context } from '../../Context/AuthContext'
import './login.css';



function Login() {


    const { autorizacao, ValidacaoLogin } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function tesete() {

    }
    return (
        <>

        <div class="container-master">
            <div class="container-mid">
                <div class="container-left">
                    <div class="titulo-left">
                        <div>
                            <p>Seja</p>
                        </div>
                        <div>
                            <p>Bem-Vindo</p>
                        </div>
                    </div>
                    <div class="input-left">
                        <label>E-mail:</label>
                            <input 
                            type="email" 
                            id="email" 
                            name="email"
                            onChange={( {target: {value}}) => setEmail(value)}
                            placeholder="Email"  
                            />
                        <label>Senha:</label>
                            <input 
                            id="password" 
                            name="password"
                            onChange={( {target: {value}}) => setPassword(value)}
                            placeholder="senha"
                            maxLength={10} 
                            type="password" />
                    </div>
                    <div class="button-left">
                        <button onClick={() => ValidacaoLogin(email, password)}>Entrar</button>
                    </div>
                    <div class="info">
                        <a href="/esqueci-minha-senha">Esqueci minha senha</a>
                        <a href="/">Cadastrar</a>
                    </div>
                </div>

                <div class="container-right">
                    <div>
                        <img class="img-styles" src={img} alt="" />
                    </div>
                </div>
            </div>
        </div>

 

        </>
    )
}

export  default Login;
import React, { useContext, useEffect, useState, useRef } from 'react';
import { AlterarSenhaContext } from '../../../Context/AlterarSenhaContext';
import api from '../../../services/api';
import './AlterarSenha.css';
import history from '../../history.js'




const AlterarSenha = () => {
    const { dados } = useContext(AlterarSenhaContext);
  
    const [login, setLogin] = useState([]);
    var i;

    const newSenha = useRef(null);
    const newSenhaConfirm = useRef(null);
    const newEmailConfirm = useRef(null);

    useEffect(() => {
        (async () => {
            const result = await api.get(`/search/email/login/${dados}`)
            await setLogin(result.data)
        })();

    }, [dados]);

    async function alterar(){
        const validationPassWord = newSenha.current.value === newSenhaConfirm.current.value;
        if(
            validationPassWord === true 
        ){
            await api.post(`/alterar/senha/login`,{
                email: newEmailConfirm.current.value,
                senhaNova: newSenhaConfirm.current.value,
                login: login.login
            })
            alert("Login Atualizado")
            history.push('/login')
        }
    }

    return (
        <>    
            <div className="container-alterar-minha-senha">
                    <div  className="alterar-minha-senha-div">
                        <h1>Digite seu CPF</h1>

                        <p>Seu e-mail</p>
                        <input
                            ref={newEmailConfirm}
                            defaultValue={login.email}
                            className="input-esqueci-minha-senha" type="text" />
                        <p>Digite uma Nova senha</p>
                            <input
                            ref={newSenha}
                            placeholder="Digite uma nova senha"
                            className="input-esqueci-minha-senha" type="password" />
                        <p>Confirme a Senha</p>
                            <input
                            ref={newSenhaConfirm}
                            placeholder="Confirme a senha"
                            className="input-esqueci-minha-senha" type="password" />

                        <button onClick={alterar} className="button-esqueci-minha-senha">Validar</button>
                    </div>
            </div>
        
        </>
    )
}




export default AlterarSenha;
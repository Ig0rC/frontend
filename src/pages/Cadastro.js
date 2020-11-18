import React from 'react';
import ContainerCadastro from '../Components/Cadastro/Container/ContainerCadastro';
import HeaderCadastro from '../Components/Cadastro/header/Header';
import MainCadastro from '../Components/Cadastro/main/MainCadastro'



export default function Cadastro(){
    return (
        <>
        <HeaderCadastro />
           <ContainerCadastro>
                <MainCadastro />
           </ContainerCadastro>
        </>
    );
}


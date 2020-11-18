import React from 'react';
import './ContainerCadastro.css';

export default function ContainerCadastro({ children }){
    return(
       
            <main class='container'>
                {children}
            </main>       
    );
}
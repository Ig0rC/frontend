import React from 'react';
import './containerAdministrador.css';


export default function ContainerAdministrador({children}){
    return(
       <main class="container-administrador">
           {children}
       </main>
    );
}
import React from 'react';
import './containerlist.css';


export default function ContainerList({children}){
    return(
    <div class='color-bg-pesq'>
       <main class="container-list-all">
           {children}
       </main>
    </div>
    );
}
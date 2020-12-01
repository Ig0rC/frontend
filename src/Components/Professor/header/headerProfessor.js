import React, { useContext} from 'react';
import { Context } from '../../../Context/AuthContext';
import './headerProfessor.css'




export default function HeaderProfessor() {

    const { logout } = useContext(Context);

    return (
        <>
            <header class="header-menu">

                <div class="flex-menu">
                    <div class='logo'>
                        <h1>SEJUS-DF</h1>
                    </div>
                    <div class='list-menu'>
                        <ul class='c-dropdown'>
                            <li class="c-dropdown_item">
                                <a class="c-dropdown_menu-link">Home</a>
                            </li>
                            <li class="c-dropdown_item hover-item-first">               
                                    <a 
                                    href="/professor-turmas"
                                    class="c-dropdown_menu-link header-a">Minhas Turmas</a>                      
                            </li>
                            <li class="c-dropdown_item hover-item-first">
                                <a onClick={logout}> Sair</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </header>
        </>
    )
}
import React, { useContext} from 'react';
import { Context } from '../../Context/AuthContext';
import './HeaderAluno.css'




export default function HeaderAluno() {

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
                                    <a  href="/aluno-cursos" className="c-dropdown_submenu-link a-decoration-aluno-header">
                                                   Cursos
                                    </a>
                            </li>
                            <li class="c-dropdown_item hover-item-first">
                                <a  href="/minhas-notas-aluno" className="c-dropdown_submenu-link a-decoration-aluno-header">
                                    Minha Notas
                                </a>
                            </li>
                            <li class="c-dropdown_item hover-item-first">
                                <a  href="/minhas-faltas-aluno" className="c-dropdown_submenu-link a-decoration-aluno-header">
                                    Minha Faltas
                                </a>
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
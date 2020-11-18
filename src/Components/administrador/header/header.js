import React from 'react';
import './headerMenu.css'



export default function MenuAdm() {
      
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
                                    <span class="span">Alunos</span>

                                    <ul class="c-dropdown_submenu">
                                        <li class="c-dropdown_submenu-item space-bottom">
                                            <a  href="#" class="c-dropdown_submenu-link">
                                                    Buscar Alunos
                                            </a>
                                        </li>
                                        <li class="c-dropdown_submenu-item">
                                            <a href="#" class="c-dropdown_submenu-link">
                                                    Ativar/Desativar Alunos
                                            </a>
                                        </li>
                                    </ul>
                                </li>


                                <li class="c-dropdown_item hover-item-first">
                                    <span class="span">Professores</span>

                                    <ul class="c-dropdown_submenu">
                                        <li class="c-dropdown_submenu-item space-bottom">
                                            <a  href="#" class="c-dropdown_submenu-link">
                                                    Buscar Professores
                                            </a>
                                        </li>
                                        <li class="c-dropdown_submenu-item">
                                            <a href="#" class="c-dropdown_submenu-link">
                                                    Ativar/Desativar Professores
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="c-dropdown_item hover-item-first">
                                    <span class="span">Curso</span>

                                    <ul class="c-dropdown_submenu">
                                        <li class="c-dropdown_submenu-item space-bottom">
                                            <a  href="#" class="c-dropdown_submenu-link">
                                                    Cadastrar Curso
                                            </a>
                                        </li>
                                        <li class="c-dropdown_submenu-item">
                                            <a href="#" class="c-dropdown_submenu-link">
                                                    Buscar Cursos
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="c-dropdown_item hover-item-first">
                                    <span class="span">Turma</span>

                                    <ul class="c-dropdown_submenu">
                                        <li class="c-dropdown_submenu-item space-bottom">
                                            <a  href="#" class="c-dropdown_submenu-link">
                                                    Cadastrar Turma
                                            </a>
                                        </li>
                                        <li class="c-dropdown_submenu-item">
                                            <a href="#" class="c-dropdown_submenu-link">
                                                    Buscar Turma
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="c-dropdown_item hover-item-first">
                                    <span class="span">Disciplina</span>

                                    <ul class="c-dropdown_submenu">
                                        <li class="c-dropdown_submenu-item space-bottom">
                                            <a  href="#" class="c-dropdown_submenu-link">
                                                    Cadastrar Disciplina
                                            </a>
                                        </li>
                                        <li class="c-dropdown_submenu-item">
                                            <a href="#" class="c-dropdown_submenu-link">
                                                    Buscar Disciplina
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="c-dropdown_item hover-item-first">
                                    <span class="span">Instituição</span>

                                    <ul class="c-dropdown_submenu">
                                        <li class="c-dropdown_submenu-item space-bottom">
                                            <a  href="#" class="c-dropdown_submenu-link">
                                                    Cadastrar Instituição
                                            </a>
                                        </li>
                                        <li class="c-dropdown_submenu-item">
                                            <a href="#" class="c-dropdown_submenu-link">
                                                    Buscar Instituição
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="c-dropdown_item hover-item-first">
                                    <span class="span">Sair</span>
                                </li>
                            </ul>
                        </div>
            
             </div>
            </header>
        </>
    )
}
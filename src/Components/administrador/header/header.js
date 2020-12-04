import React, { useContext } from 'react';
import './headerMenu.css';

import { Context } from '../../../Context/AuthContext';




export default function MenuAdm() {

    const { logout } = useContext(Context);


    return (
        <>
            <header className="header-menu">

                <div className="flex-menu">
                    <div className='logo'>
                        <h1>SEJUS-DF</h1>
                    </div>
                    <div className='list-menu'>
                        <ul className='c-dropdown'>
                            <li className="c-dropdown_item">
                                <a className="c-dropdown_menu-link">Home</a>
                            </li>
                            <li className="c-dropdown_item hover-item-first">
                                <span className="span">Ativar</span>
                                <ul className="c-dropdown_submenu">
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/ativar-professor" className="c-dropdown_submenu-link">
                                             Professores
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item  space-bottom">
                                        <a href="/ativar-aluno" className="c-dropdown_submenu-link">
                                             Alunos
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item">
                                        <a href="/administrador-inativos" className="c-dropdown_submenu-link">
                                             Administradores
                                            </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="c-dropdown_item hover-item-first">
                                <span className="span">Cadastrar</span>

                                <ul className="c-dropdown_submenu">
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/cadastrar-disciplinas" className="c-dropdown_submenu-link">
                                            Disciplina
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/instituicao" className="c-dropdown_submenu-link">
                                            Instituição
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/cadastrar-turma" className="c-dropdown_submenu-link">
                                           Turma
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/cadastrarcursos" className="c-dropdown_submenu-link">
                                            Curso
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/alunos" className="c-dropdown_submenu-link">
                                            Administradores
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/cadastrar-semestre" className="c-dropdown_submenu-link">
                                            Semestre
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item  space-bottom">
                                        <a href="/cadastrar-horario" className="c-dropdown_submenu-link">
                                            Horário
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item">
                                        <a href="/leciona" className="c-dropdown_submenu-link">
                                            Leciona
                                            </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="c-dropdown_item hover-item-first">
                                <span className="span">Pesquisar</span>

                                <ul className="c-dropdown_submenu">
                                    <li className="c-dropdown_submenu-item  space-bottom">
                                        <a href="/pesqinstituicao" className="c-dropdown_submenu-link">
                                            Instituições
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item  space-bottom">
                                        <a href="/buscar-turma" className="c-dropdown_submenu-link">
                                            Turma
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/pesquisacursos" className="c-dropdown_submenu-link">
                                            Cursos
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/buscar-disciplinas" className="c-dropdown_submenu-link">
                                            Disciplina
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/buscar-professores" className="c-dropdown_submenu-link">
                                            Professores
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/alunos" className="c-dropdown_submenu-link">
                                            Alunos
                                            </a>
                                    </li>
                                    <li className="c-dropdown_submenu-item space-bottom">
                                        <a href="/administrador-lista" className="c-dropdown_submenu-link">
                                            Administradores
                                            </a>
                                    </li>
                                    
                                   
                                </ul>
                            </li>
                            <li className="c-dropdown_item hover-item-first">
                                <a onClick={logout}> Sair</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </header>
        </>
    )
}
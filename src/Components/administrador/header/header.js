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
                                    <span className="span">Alunos</span>

                                    <ul className="c-dropdown_submenu">
                                        <li className="c-dropdown_submenu-item space-bottom">
                                            <a  href="/alunos" className="c-dropdown_submenu-link">
                                                    Buscar Alunos
                                            </a>
                                        </li>
                                        <li className="c-dropdown_submenu-item">
                                            <a href="/ativar-aluno" className="c-dropdown_submenu-link">
                                                    Ativar Alunos
                                            </a>
                                        </li>
                                    </ul>
                                </li>


                                <li className="c-dropdown_item hover-item-first">
                                    <span className="span">Professores</span>

                                    <ul className="c-dropdown_submenu">
                                        <li className="c-dropdown_submenu-item space-bottom">
                                            <a  href="/buscar-professores" className="c-dropdown_submenu-link">
                                                    Buscar Professores
                                            </a>
                                        </li>
                                        <li className="c-dropdown_submenu-item">
                                            <a href="/ativar-professor" className="c-dropdown_submenu-link">
                                                    Ativar/Desativar Professores
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="c-dropdown_item hover-item-first">
                                    <span className="span">Curso</span>

                                    <ul className="c-dropdown_submenu">
                                        <li className="c-dropdown_submenu-item space-bottom">
                                            <a  href="/cadastrarcursos" className="c-dropdown_submenu-link">
                                                    Cadastrar Curso
                                            </a>
                                        </li>
                                        <li className="c-dropdown_submenu-item space-bottom">
                                            <a href="/pesquisacursos" className="c-dropdown_submenu-link">
                                                    Buscar Cursos
                                            </a>
                                        </li>
                                        <li className="c-dropdown_submenu-item space-bottom">
                                            <a href="/cadastrar-semestre" className="c-dropdown_submenu-link">
                                                    Cadastrar Semestre
                                            </a>
                                        </li>
                                        <li className="c-dropdown_submenu-item ">
                                            <a href="/cadastrar-horario" className="c-dropdown_submenu-link">
                                                    Cadastrar Horário
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="c-dropdown_item hover-item-first">
                                    <span className="span">Turma</span>

                                    <ul className="c-dropdown_submenu">
                                        <li className="c-dropdown_submenu-item space-bottom">
                                            <a  href="/cadastrar-turma" className="c-dropdown_submenu-link">
                                                    Cadastrar Turma
                                            </a>
                                        </li>
                                        <li className="c-dropdown_submenu-item">
                                            <a href="/buscar-turma" className="c-dropdown_submenu-link">
                                                    Buscar Turma
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="c-dropdown_item hover-item-first">
                                    <span className="span">Disciplina</span>

                                    <ul className="c-dropdown_submenu">
                                        <li className="c-dropdown_submenu-item space-bottom">
                                            <a  href="/cadastrar-disciplinas" className="c-dropdown_submenu-link">
                                                    Cadastrar Disciplina
                                            </a>
                                        </li>
                                        <li className="c-dropdown_submenu-item space-bottom">
                                            <a href="/buscar-disciplinas" className="c-dropdown_submenu-link">
                                                    Buscar Disciplina
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
                                    <span className="span">Instituição</span>

                                    <ul className="c-dropdown_submenu">
                                        <li className="c-dropdown_submenu-item space-bottom">
                                            <a  href="/instituicao" className="c-dropdown_submenu-link">
                                                    Cadastrar Instituição
                                            </a>
                                        </li>
                                        <li className="c-dropdown_submenu-item">
                                            <a href="/pesqinstituicao" className="c-dropdown_submenu-link">
                                                    Buscar Instituições
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
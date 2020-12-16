import React, { useContext } from 'react';
import './headerMenu.css';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";


import { Context } from '../../../Context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";



export default function MenuAdm() {

    const { logout } = useContext(Context);


    return (
        <>
         
            <Navbar collapseOnSelect expand="md" bg="primary">
            <Navbar.Brand href="#home">SEJUS-DF</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  
                </Nav>
                <Nav>
                <Nav.Link href="/home">Home</Nav.Link>
                    <NavDropdown title="Ativar" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/ativar-professor">Professores</NavDropdown.Item>
                                <NavDropdown.Divider />
                            <NavDropdown.Item href="/ativar-aluno">Alunos</NavDropdown.Item>
                                <NavDropdown.Divider />
                            <NavDropdown.Item href="/administrador-inativos">Administradores</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Cadastrar" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/cadastrar-disciplinas">Disciplina</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item href="/instituicao">Instituição</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item href="/cadastrar-turma">Curso</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item href="/cadastrarcursos">Turma</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item href="/cadastrar-semestre">Semestre</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item href="/cadastrar-horario">Horário</NavDropdown.Item>
                             <NavDropdown.Divider />
                        <NavDropdown.Item href="/leciona">Leciona</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Pesquisar" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/buscar-disciplinas">Disciplinas</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item href="/pesqinstituicao">Instituições</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item href="/pesquisacursos">Cursos</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item href="/buscar-turma">Turmas</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item href="/administrador-lista">Administradores</NavDropdown.Item>
                             <NavDropdown.Divider />
                        <NavDropdown.Item href="/alunos">Alunos</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item href="/buscar-professores">Professores</NavDropdown.Item>
                    </NavDropdown>
                <Nav.Link  onClick={logout} href="#features">Sair</Nav.Link>
                </Nav>

            </Navbar.Collapse>
            </Navbar>

        </>
    )
}
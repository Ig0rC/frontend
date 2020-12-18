import React, { useContext} from 'react';
import { Context } from '../../Context/AuthContext';
import './HeaderAluno.css'
import { Nav, Navbar, NavDropdown } from "react-bootstrap";




export default function HeaderAluno() {

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
                <Nav.Link href="/alunohome">Home</Nav.Link>
                <Nav.Link href="/aluno-cursos">Cursos</Nav.Link>
                <Nav.Link href="/minhas-notas-aluno">Minhas Notas</Nav.Link>
                <Nav.Link href="/minhas-faltas-aluno">Minhas Faltas</Nav.Link>
                  
                <Nav.Link  onClick={logout} >Sair</Nav.Link>
                </Nav>

            </Navbar.Collapse>
            </Navbar>
        </>
    )
}
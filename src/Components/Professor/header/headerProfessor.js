import React, { useContext} from 'react';
import { Context } from '../../../Context/AuthContext';
import './headerProfessor.css';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";





export default function HeaderProfessor() {

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
                    <Nav.Link href="/professorhome">Home</Nav.Link>
                    <Nav.Link href="/professor-turmas">Minhas Turmas</Nav.Link>
                    
                    <Nav.Link  onClick={logout} >Sair</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
                </Navbar>
        </>
    )
}
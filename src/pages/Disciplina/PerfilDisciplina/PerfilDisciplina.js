import React, { useContext, useEffect} from 'react';
import Menu from '../../../Components/administrador/header/header';
import { Context } from '../../../Context/DisciplinaContext';






export default function PerfilDisciplina(){

    const { id } = useContext(Context);
    console.log(id)
    return(
        <>
            <Menu />
            <h1>Perfil da Disciplina</h1>
        </>
    )
}
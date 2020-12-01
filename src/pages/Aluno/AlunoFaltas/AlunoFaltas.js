import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import api from '../../../services/api'
import Menu from '../../../Components/Aluno/AlunoHeader'



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));




export default function AlunoFaltas(){
    const classes = useStyles();
    
    const [ notas, setNotas ] = useState([]);

    useEffect(() =>{
        (async () => {
            const response = await api.get(`/alunos/minha/faltas/cursos`)
            setNotas(response.data)
            console.log(response.data)
        })();
    }, [])

    return(
        <>
        <Menu />
            <div class="container-aluno-notas-acordeao">
            {notas.map(nota => (
                <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                
                    >
                        < Typography color="blue" className={classes.heading}>
                            <h3>{nota.nome_disciplina}</h3>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <div>
                                    <p><strong>Faltas:</strong> {nota.quantidade}</p> 
                                    <p><strong>Situação: </strong> 
                                        {nota.quantidade >= 30 ? "Reprovado por falta" : "Situação Normal"}
                                    </p>     
                                    <p><strong>Semestre:</strong> {nota.semestre}</p> 
                                    <p><strong>Ano:</strong> {nota.ano}</p>
                                </div>
                                <div>
                                    <h3>Horários</h3>
                                    <p><strong>horário da aula:</strong> {nota.horario_aula}</p>
                                    <p><strong>Dia Semana:</strong> {nota.dia_semana}</p>
                                </div>
                                </Typography>
                        </AccordionDetails>
                    </Accordion>
            </div>
            ))} 
        </div>
        </>
    )
}
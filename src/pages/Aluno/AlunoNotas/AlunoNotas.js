import React, { useEffect, useState } from 'react'
import Menu from '../../../Components/Aluno/AlunoHeader'
import './AlunoNota.css'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import api from '../../../services/api'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));



export default function AlunoNotas() {
    const classes = useStyles();
    
    const [ notas, setNotas ] = useState([]);
    const [nomeCurso, setNomeCurso ] = useState('');

    useEffect(() =>{
        (async () => {
            const response = await api.get(`/aluno/minha/nota/cursos`)
            setNotas(response.data);


        })();
    }, [])

    useEffect(() => {
        notas.map(nota => (
            setNomeCurso(nota.nome_curso)
        ))
    }, [notas]);

    return (
        <>
        <Menu />
            <div className="flex-list-all-bg">
                  <div className="flex-pesq-list-all">
                      <div className="tamanho-pesq-atributos">
                          <p className="titulo-aluno-list-all">{nomeCurso}</p>
                      </div>
                  </div>
            </div>
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
                                    <p><strong>Nota:</strong> {nota.nota}</p>   
                                    <p><strong>{nota.nota >= 6 ? 'Aprovado' : 'Reprovado por ora'}</strong></p>   
                                    <p><strong>Bimestre:</strong> {nota.bimestre}</p> 
                                    <p><strong>Ano:</strong> {nota.ano}</p>
                                </div>
                                <div>
                                    <h3>Horários</h3>
                                    <p>horário da aula: {nota.horario_aula}</p>
                                    <p>Dia Semana: {nota.dia_semana}</p>
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
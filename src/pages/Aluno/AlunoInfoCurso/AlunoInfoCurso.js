import React, { useContext, useEffect, useState} from 'react';
import Menu from '../../../Components/Aluno/AlunoHeader';
import { AlunoInfoContext } from '../../../Context/AlunoInfoCursoContext';
import api from '../../../services/api';
import './AlunoInfoCurso.css'



export default function AlunoInfoCurso(){

    // Carregamento page
    const [ cursoInstituicao, setCursoInstituicao ] = useState([]);
    const [ turmaCI, setTurmaCI]  = useState([])


    const { idCurso, idInstituicao } = useContext(AlunoInfoContext);

    useEffect( () => {
        (async () => {
            //Buscando a informações do curso e da instituição
            const responseCursoInstituicao = await api.get(`/alunos/info/cursos/${idCurso}/${idInstituicao}`);
            setCursoInstituicao(responseCursoInstituicao.data);
            
            // Buscando turmas que é do curso e da Instituição
            const responseTurmaCI = await api.get(`/alunos/info/turmas/${idCurso}/${idInstituicao}`)
            setTurmaCI(responseTurmaCI.data)
     

      
        })();
    }, []);
    
 


    async function CadastrarNoCurso (idTurma){
        try {
            await api.post(`/turmaAluno/${idTurma}`)
            alert('Sucesso! Grade Horária irá aparece nas minhas Faltas e Minhas Notas')
        } catch (error) {
            alert('error')
        }
    }

    return(
        <>
        <Menu />
        
            <div class="perfil-instituicao-bg" >
                <div class="perfil-titulo">
                    <h2>Dados do Curso</h2>
                </div>
            </div>
            <div className="container-info-cursos-alunos-buscar">
                <div className="info-cursos-alunos-buscar">
                    <h2>Informações sobre o Curso</h2>
                </div>
            {cursoInstituicao.map(ci => (
                  <div class="p-styles-info-cursos-aluno-buscar">
                  <p><strong>Curso:</strong> {ci.nome_curso}</p>
                  <p><strong>Semestres:</strong>  {ci.duracao_semestres}</p>
                  <p><strong>Periodo:</strong>  {ci.periodo}</p>
                  <p><strong>Periodo:</strong>  {ci.nivel}</p>
                  <p><strong>Carga Horária</strong> {ci.carga_horaria}</p>
              </div>
            ))}        
            </div>
            <div className="container-info-cursos-alunos-buscar">
                <div className="info-cursos-alunos-buscar">
                    <h2>Turmas</h2>
                </div>
            {cursoInstituicao.map(ci => (
                <div class="p-styles-info-cursos-aluno-buscar">
                  <p><strong>Nome Instituição:</strong> {ci.nome_instituicao}</p>
                  <p><strong>Unidade:</strong>  {ci.unidade}</p>
                  <p><strong>CEP:</strong>  {ci.cep}</p>
                  <p><strong>Estado:</strong> {ci.estado}</p>
                  <p><strong>Cidade:</strong> {ci.cidade}</p>
                  <p><strong>Bairro:</strong> {ci.bairro}</p>
                  <p><strong>Quadra:</strong> {ci.quadra}</p>
                  <p><strong>Número:</strong> {ci.numero_endereco}</p>
                  <p><strong>Complemento:</strong> {ci.complemento}</p>
                </div>
            ))}        
            </div>
            <div class="linha-separado-instituicao-perfil">
            </div>
            <div className="container-info-cursos-alunos-buscar">
                <div className="info-cursos-alunos-buscar">
                    <h2>Turmas Dispóniveis</h2>
                </div>
            {turmaCI.map(turmaCI => (
                  <div key={turmaCI.nome_turma} class="p-styles-info-cursos-aluno-buscar">
                    <div>
                        <p><strong>Turma:</strong> {turmaCI.nome_turma}</p>
                        <p><strong>Turno:</strong>  {turmaCI.turno}</p>
                    </div>
                    <div>
                        <button 
                        onClick={() => CadastrarNoCurso(turmaCI.id_turma)}
                        class="button-styles-info-cursos-aluno-selecionar">Ingressar</button>
                    </div>
                  </div>
                
            ))}        
            </div>
        </>

    )
}
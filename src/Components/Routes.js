import React, { useContext } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';



import InicialAluno from '../pages/InicialAluno';  
import  Login  from '../pages/login/login';
import Cadastro from '../pages/Cadastro'
import Instituicao from '../pages/Instituiçao/CadastrarInstituicao';
import BuscarInstituicao from '../pages/Instituiçao/BucarInstituicao'
import { InstituicaoPerfil } from '../pages/Instituiçao/InstituicaoPerfil/InstituicaoPerfil.js'

//cursos
import BuscarCurso from '../pages/Curso/BuscarCursos/BuscarCurso.js';
import CadastrarCursos from '../pages/Curso/CadastrarCursos/CadastrarCursos.js';
import PerfilCurso from '../pages/Curso/PerfilCursos/PerfilCurso'

//Semestre
import CadastrarSemestres from '../pages/Semestre/CadastrarSemestre/CadastrarSemestres'


//Context
import { Context } from '../Context/AuthContext';

//ALUNOS
import AlunosHome from '../pages/Aluno/AlunoHome/AlunoHome.js';
import AlunoCursos from '../pages/Aluno/AlunoCursos/AlunoCursos.js';
import ListarAlunos from '../pages/PessoaAluno/ListarAlunos/ListarAlunos';
import AtivarAlunos from '../pages/Aluno/AlunoAtivar/AlunoAtivar';
import PerfilAluno from '../pages/Aluno/AlunoPerfil/AlunoPerfil';
import AlunosInfo from '../pages/Aluno/AlunoInfoCurso/AlunoInfoCurso.js';
import MinhasNotasAluno from '../pages/Aluno/AlunoNotas/AlunoNotas';
import MinhaFaltas from '../pages/Aluno/AlunoFaltas/AlunoFaltas';



//PROFESSOR
import ProfessorHome from '../pages/Professor/ProfessorHome/ProfessorHome.js';
import ProfessorTurmas from '../pages/Professor/ProfessorTurmas/ProfessorTurma.js';
import ProfessorNotas from '../pages/Professor/ProfessorNotas/ProfessorNotas.js';
import BuscarProfessores from '../pages/Professor/BuscarProfessores/BuscaProfessores';
import ProfessorPerfil from '../pages/Professor/ProfessorPerfil/ProfessorPerfil';
import AtivarProfessor from '../pages/Professor/ProfessorAtiva/ProfessorAtiva';
import ProfessorFaltas from '../pages/Professor/ProfessorFaltas/ProfessorFaltas';



//carga horaria
import CadastrarHorario from '../pages/CargaHoraria/CargaHoraria.js';


//turma
import CadastrarTurma from '../pages/Turma/CadastrarTurma/CadastraTurma.js';
import BuscarTurmas from '../pages/Turma/BuscarTurmas/BuscarTurmas.js';
import PerfilTurma from '../pages/Turma/PerfilTurma/PerfilTurma.js';


//disciplina
import CadastrarDisciplina from '../pages/Disciplina/CadastrarDisciplinas/CadastrarDisciplina';
import BuscarDisciplina from '../pages/Disciplina/BuscarDisciplina/BuscarDisciplina.js';
import PerfilDisciplina from '../pages/Disciplina/PerfilDisciplina/PerfilDisciplina.js';
//Leciona
import Leciona from '../pages/Leciona/Leciona';

//ADMINISTRADOR 
import AdministradorInativo from '../pages/Administrador/AdministradorInativo/AdministradorInativo.js';
import AdministradorPerfil from '../pages/Administrador/AdministradorPerfil/AdministradorPerfil.js';
import AdministradorLista from '../pages/Administrador/ListarAdministrador/ListaAdministrador.js';

//Esqueci Minha senha

import EsqueciMinhaSenha from '../pages/AlterarSenha/EsqueciMinhaSenha/EsqueciMinhaSenha.js'

function CustomRoute({ isPrivate, ...rest}){
    const { loading, autorizacao } = useContext(Context);
    
    if(loading){
        return <h1>loading</h1>
    }

    if(isPrivate && !autorizacao){
        return <Redirect to="/login" />

    }

    return <Route {...rest} />
}

function Routes (){
    return(   
        <Switch>
            <CustomRoute exact path='/' component={Cadastro} />
            <CustomRoute exact path='/login' component={Login} />
            <CustomRoute exact path='/homealuno' component={InicialAluno} />
            <CustomRoute exact path='/instituicao' component={Instituicao} />
            <CustomRoute isPrivate exact path='/pesqinstituicao' component={BuscarInstituicao} />
            <CustomRoute exact path='/perfilinstituicao' component={InstituicaoPerfil} />
            <CustomRoute exact path='/pesquisacursos' component={BuscarCurso} />
            <CustomRoute exact path='/cadastrarcursos' component={CadastrarCursos} />
            <CustomRoute exact path='/alunohome' component={AlunosHome} />
            <CustomRoute exact path='/professorhome' component={ProfessorHome} />
            <CustomRoute exact path='/alunos' component={ListarAlunos} />
            <CustomRoute exact path='/cadastrar-semestre' component={CadastrarSemestres} />
            <CustomRoute exact path='/cadastrar-horario' component={CadastrarHorario} />
            <CustomRoute exact path='/cadastrar-turma' component={CadastrarTurma} />
            <CustomRoute exact path='/buscar-turma' component={BuscarTurmas} />
            <CustomRoute exact path='/cadastrar-disciplinas' component={CadastrarDisciplina} />
            <CustomRoute exact path='/buscar-disciplinas' component={BuscarDisciplina} />
            <CustomRoute exact path='/leciona' component={Leciona} />
            <CustomRoute exact path='/professor-turmas' component={ProfessorTurmas} />
            <CustomRoute exact path='/professor-turma-notas' component={ProfessorNotas} />
            <CustomRoute exact path='/perfil-curso' component={PerfilCurso} />
            <CustomRoute exact path='/perfil-turma' component={PerfilTurma} />
            <CustomRoute exact path='/perfil-disciplina' component={PerfilDisciplina} />
            <CustomRoute exact path='/ativar-aluno' component={AtivarAlunos} /> 
            <CustomRoute exact path='/perfil-aluno' component={PerfilAluno} />
            <CustomRoute exact path='/buscar-professores' component={BuscarProfessores} />
            <CustomRoute exact path='/perfil-professor' component={ProfessorPerfil} />
            <CustomRoute exact path='/ativar-professor' component={AtivarProfessor} />
            <CustomRoute exact path='/aluno-cursos' component={AlunoCursos} />
            <CustomRoute exact path='/aluno-info-curso' component={AlunosInfo} />  
            <CustomRoute exact path='/professor-falta-turma' component={ProfessorFaltas} />
            <CustomRoute exact path='/minhas-notas-aluno' component={MinhasNotasAluno}/>
            <CustomRoute exact path='/minhas-faltas-aluno' component={MinhaFaltas}/>
            <CustomRoute exact path='/administrador-inativos' component={AdministradorInativo}/>
            <CustomRoute exact path='/administrador-perfil' component={AdministradorPerfil}/>
            <CustomRoute exact path='/administrador-lista' component={AdministradorLista}/>
            <CustomRoute exact path='/esqueci-minha-senha' component={EsqueciMinhaSenha}/>
            

        </Switch>
  )
}

export default Routes;
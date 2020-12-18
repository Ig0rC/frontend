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
import AlterarMinhaSenha from '../pages/AlterarSenha/AlterarLogin/AlterarSenha.js';

//Lançar Notas do Administrador
import LacarNotasAdministrador from '../pages/Administrador/LançarNotas/LancarNotas.js'

//Buscar Leciona
import BuscarLeciona from '../pages/Leciona/BuscarLeciona/BuscarLeciona.js';
import PerfiLeciona from '../pages/Leciona/PerfilLeciona/PerfilLeciona';

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
            <CustomRoute isPrivate exact path='/homealuno' component={InicialAluno} />
            <CustomRoute isPrivate exact path='/instituicao' component={Instituicao} />
            <CustomRoute isPrivate exact path='/pesqinstituicao' component={BuscarInstituicao} />
            <CustomRoute isPrivate exact path='/perfilinstituicao' component={InstituicaoPerfil} />
            <CustomRoute isPrivate exact path='/pesquisacursos' component={BuscarCurso} />
            <CustomRoute isPrivate exact path='/cadastrarcursos' component={CadastrarCursos} />
            <CustomRoute isPrivateexact path='/alunohome' component={AlunosHome} />
            <CustomRoute isPrivate exact path='/professorhome' component={ProfessorHome} />
            <CustomRoute isPrivate exact path='/alunos' component={ListarAlunos} />
            <CustomRoute isPrivate exact path='/cadastrar-semestre' component={CadastrarSemestres} />
            <CustomRoute isPrivate exact path='/cadastrar-horario' component={CadastrarHorario} />
            <CustomRoute isPrivate exact path='/cadastrar-turma' component={CadastrarTurma} />
            <CustomRoute isPrivate exact path='/buscar-turma' component={BuscarTurmas} />
            <CustomRoute isPrivate exact path='/cadastrar-disciplinas' component={CadastrarDisciplina} />
            <CustomRoute isPrivate exact path='/buscar-disciplinas' component={BuscarDisciplina} />
            <CustomRoute isPrivate exact path='/leciona' component={Leciona} />
            <CustomRoute isPrivate exact path='/professor-turmas' component={ProfessorTurmas} />
            <CustomRoute isPrivate exact path='/professor-turma-notas' component={ProfessorNotas} />
            <CustomRoute isPrivate exact path='/perfil-curso' component={PerfilCurso} />
            <CustomRoute isPrivate exact path='/perfil-turma' component={PerfilTurma} />
            <CustomRoute isPrivate exact path='/perfil-disciplina' component={PerfilDisciplina} />
            <CustomRoute isPrivate exact path='/ativar-aluno' component={AtivarAlunos} /> 
            <CustomRoute isPrivate exact path='/perfil-aluno' component={PerfilAluno} />
            <CustomRoute isPrivate exact path='/buscar-professores' component={BuscarProfessores} />
            <CustomRoute isPrivate exact path='/perfil-professor' component={ProfessorPerfil} />
            <CustomRoute isPrivate exact path='/ativar-professor' component={AtivarProfessor} />
            <CustomRoute isPrivate exact path='/aluno-cursos' component={AlunoCursos} />
            <CustomRoute isPrivate exact path='/aluno-info-curso' component={AlunosInfo} />  
            <CustomRoute isPrivate exact path='/professor-falta-turma' component={ProfessorFaltas} />
            <CustomRoute isPrivate exact path='/minhas-notas-aluno' component={MinhasNotasAluno}/>
            <CustomRoute isPrivate exact path='/minhas-faltas-aluno' component={MinhaFaltas}/>
            <CustomRoute isPrivate exact path='/administrador-inativos' component={AdministradorInativo}/>
            <CustomRoute isPrivate exact path='/administrador-perfil' component={AdministradorPerfil}/>
            <CustomRoute isPrivate exact path='/administrador-lista' component={AdministradorLista}/>
            <CustomRoute isPrivate exact path='/esqueci-minha-senha' component={EsqueciMinhaSenha}/>
            <CustomRoute isPrivate exact path='/alterar-minha-login' component={AlterarMinhaSenha}/>
            <CustomRoute isPrivate exact path='/lancar-notas-administrador' component={LacarNotasAdministrador}/>
            <CustomRoute isPrivate exact path='/buscar-leciona-professores' component={BuscarLeciona}/>
            <CustomRoute isPrivate exact path='/buscar-leciona-professores-perfil' component={PerfiLeciona}/>
        </Switch>
  )
}

export default Routes;
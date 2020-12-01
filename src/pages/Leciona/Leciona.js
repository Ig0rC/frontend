import React, {useEffect , useState} from 'react';
import Menu from '../../Components/administrador/header/header';
import api from '../../services/api';



export default function Leciona(){


    // Buscar Instituições, curso e turmas:
    
    const [ instituicao, setInstituicao ] = useState([]);
    const [ cursoInstituicao, setCursoInstituicao ] = useState([]);
    const [ turmaPIC, setTurmaPIC ] = useState([]);
    const [disciplina, setDisciplina] = useState([]);
    const [professor, setProfessor ] = useState([]);
    const [ Semestre, setSemestre ] = useState([]);
    const [ ano, setAno ] = useState([]);


    //Salvando as Escolhas
    const [ idInstituicao, setIdInstituicao ] = useState(0);
    const [ idCurso, setIdCurso] = useState(0);
    const [diaSemana , setDiaSemana] = useState('');
    const [horarioAula, setHorarioAula] = useState('');
    const [escolhaSemestre, setEscolhaSemestre ] = useState('');
    const [escolhaAno, setEscolhaAno ] = useState('');
    const [escolhaTurma, setEscolhaTurma ] = useState(0); 
    const [ escolhaProfessor, setEscolhaProfessor ] = useState('');
    const [ escolhaDisciplina, setEscolhaDisciplina ] = useState(0);

   



    useEffect(() =>{
        (async () => { 
            // Consumindo web service para buscar Instituições, curso e turmas:
            const responseInstituicao = await api.get('/leciona');
            setInstituicao(responseInstituicao.data);
            const responseSemestre = await api.get('semestre');
            setSemestre(responseSemestre.data)
            const responseProfessor = await api.get('/professor/buscar/leciona/all');
            setProfessor(responseProfessor.data)
        })();
    }, []);

    useEffect( () => {
        (async () =>{
            const responseAno = await api.get(`/semestre/${escolhaSemestre}`);
            setAno(responseAno.data)
            
        })();
    }, [escolhaSemestre, escolhaAno]);
    
    async function criarLeciona(){
        try {
            const response = await api.post(`/leciona`,{
                disciplina: escolhaDisciplina,
                cpf_professor: escolhaProfessor,
                id_turma: escolhaTurma,
                semestre: escolhaSemestre,
                ano: escolhaAno,
                diasemana: diaSemana,
                horario_aula: horarioAula

            });
            alert('Cadastrado com sucesso')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        (async () =>{
            const responseTurmaPInstCurso = await api.get(`/leciona/${idInstituicao}/${idCurso}`);
            setTurmaPIC(responseTurmaPInstCurso.data)
            
            const responseCursoInstuicao = await api.get(`/instituicao/cursos-ativos/turmas/${idInstituicao}`)
            setCursoInstituicao(responseCursoInstuicao.data)

            const responseDisciplinaCurso = await api.get(`/leciona/disciplina/curso/${idCurso}`)
            setDisciplina(responseDisciplinaCurso.data)

        })();
      

    }, [idInstituicao, idCurso])
    return(
        <>
            <Menu />
            <div class="titulo-styles-cadastrar-cursos">
                    <h1>Cadastrar Leciona</h1>
            </div>
            <div class="columns-flex-cadastrar-cursos">
                <div class="column-div-instituicao-cadastro">
                    <div>
                            <p>Escolha Instituição:</p>
                            <select 
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: {value }}) => setIdInstituicao(value)}
                           > 
                            <option></option>
                               {instituicao.map(instituicao =>(
                                    <option value={instituicao.id_instituicao}>
                                       Código: {instituicao.id_instituicao} ||
                                       Nome: {instituicao.nome_instituicao}
                                    </option>
                               ))} 
                          </select>
                    </div>
                    <div>
                        <p>Escolha o Curso:</p>
                        <select 
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: {value }}) => setIdCurso(value)}
                        > 
                            <option></option>
                               {cursoInstituicao.map(cursoInstituicao =>(
                                   <option value={cursoInstituicao.id_curso}>{cursoInstituicao.nome_curso}</option>
                               ))} 
                        </select>
                    </div>
                    <div>
                        <p>Escolha a Disciplina:</p>
                        <select 
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: {value }}) => setEscolhaDisciplina(value)}
                        > 
                            <option></option>
                               {disciplina.map(disciplina =>(
                                   <option value={disciplina.id_disciplina}>{disciplina.nome_disciplina}</option>
                               ))} 
                        </select>
                    </div>
                    <div>
            
                        <p>Escolha a Turma:</p>
        
                            <select 
                                class="input-styles-IT text-aling-center-cadastrar-curso"
                                onChange={({ target: {value }}) => setEscolhaTurma(value)}
                            > 
                                <option></option>
                                {turmaPIC.map(turmaPIC =>(
                                    <option value={turmaPIC.id_turma}>
                                        Nome:{turmaPIC.nome_turma} || 
                                        Turno: {turmaPIC.turno}</option>
                                      ))} 
                            </select>
          
                    </div>
                <div>
                    <p>Escolha o Professor(a):</p>
                            <select 
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: {value }}) => setEscolhaProfessor(value)}
                           > 
                            <option></option>
                               {professor.map(professor =>(
                                   <option value={professor.cpf}>{professor.nome}</option>
                               ))} 
                          </select>
                    </div>
                    <div>
                    <p>Semestre:</p>
                           <select 
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: {value }}) => setEscolhaSemestre(value)}
                           > 
                            <option></option>
                               {Semestre.map(Semestre =>(
                                   <option value={Semestre.semestre}>{Semestre.semestre}</option>
                               ))} 
                                   
                            
        
                          </select>
                    </div>
                   
                    <div>
                    <p>Ano:</p>
                           <select 
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value }}) => setEscolhaAno(value)}
                           > 
                            <option></option>
                               {ano.map(ano =>(
                                   <option>{ano.ano}</option>
                               ))} 
                          </select>
                    </div>
                     
                    <div>
                        <p>Horário da Aula:</p>
                        <input
                            class="input-styles-IT"
                            type="text"
                            onChange={({ target: { value }}) => setHorarioAula(value)}
                        />
                    </div>
    
                    <div>
                        <p>Dia da Semana:</p>
                        <select
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value } }) => setDiaSemana(value)}
                        >
                            <option ></option>
                            <option value="Segunda-Feira">Segunda-Feira</option>
                            <option value="Terça-Feira">Terça-Feira</option>
                            <option value="Quarta-Feira">Quarta-Feira</option>
                            <option value="Quinta-Feira">Quinta-Feira</option>
                            <option value="Sexta-Feira">Sexta-Feira</option>
                            <option value="Sábado">Sábado</option>
                            <option value="Domingo">Domingo</option>
                        </select>
                    </div>
                </div>    
            </div>
            <div class="flex-button-cadastrar-cursos">
                    <button    
                    onClick={criarLeciona}
                    class="styles-button-instituicao-env">Cadastrar
                    </button>
            </div>
        </>
    )
}
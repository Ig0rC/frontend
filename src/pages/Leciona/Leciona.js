import React, {useEffect , useState} from 'react';
import Menu from '../../Components/administrador/header/header';
import api from '../../services/api';
import './leciona.css'



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

   
    function validarCampos(){
        if(
            !disciplina === false 
            && 
            idInstituicao !== 0 
            && 
            idCurso !== 0 
            && 
            !diaSemana === false
            &&
            !horarioAula === false
            &&
            !escolhaSemestre === false
            &&
            !escolhaAno === false
            && 
            !escolhaProfessor === false
            &&
            escolhaDisciplina !== 0
            &&
            escolhaTurma !== 0
            ){
                criarLeciona();
            }
        else {
            alert("Preencha todos os campos")
        }
    }
    



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
            await api.post(`/leciona`,{
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
       
            <div class="perfil-instituicao-bg" >
                    <div class="perfil-titulo">
                        <h2>Cadastrar Leciona</h2>
                    </div>
            </div>

            <div class="flex-leciona-cadastrar">
                    <p>Escolha Instituição:</p>
                        <select 
                            class="styles-select-global"
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
                        <p>Escolha o Curso:</p>
                        <select 
                            class="styles-select-global"
                            onChange={({ target: {value }}) => setIdCurso(value)}
                        > 
                            <option></option>
                               {cursoInstituicao.map(cursoInstituicao =>(
                                   <option value={cursoInstituicao.id_curso}>{cursoInstituicao.nome_curso}</option>
                               ))} 
                        </select>
                        <p>Escolha a Disciplina:</p>
                        <select 
                            class="styles-select-global"
                            onChange={({ target: {value }}) => setEscolhaDisciplina(value)}
                        > 
                            <option></option>
                               {disciplina.map(disciplina =>(
                                   <option value={disciplina.id_disciplina}>{disciplina.nome_disciplina}</option>
                               ))} 
                        </select>
                        <p>Escolha a Turma:</p>
                            <select 
                                class="styles-select-global"
                                onChange={({ target: {value }}) => setEscolhaTurma(value)}
                            > 
                                <option></option>
                                {turmaPIC.map(turmaPIC =>(
                                    <option value={turmaPIC.id_turma}>
                                        Nome:{turmaPIC.nome_turma} || 
                                        Turno: {turmaPIC.turno}</option>
                                      ))} 
                        </select>
                        <p>Escolha o Professor(a):</p>
                            <select 
                            class="styles-select-global"
                            onChange={({ target: {value }}) => setEscolhaProfessor(value)}
                           > 
                            <option></option>
                               {professor.map(professor =>(
                                   <option value={professor.cpf}>{professor.nome}</option>
                               ))} 
                        </select>
                        <p>Semestre:</p>
                            <select 
                            class="styles-select-global"
                            onChange={({ target: {value }}) => setEscolhaSemestre(value)}
                            > 
                            <option></option>
                               {Semestre.map(Semestre =>(
                                   <option value={Semestre.semestre}>{Semestre.semestre}</option>
                               ))} 
                            </select>
                            <p>Ano:</p>
                            <select 
                                class="styles-select-global"
                                onChange={({ target: { value }}) => setEscolhaAno(value)}
                            > 
                            <option></option>
                               {ano.map(ano =>(
                                   <option>{ano.ano}</option>
                               ))} 
                            </select>
                            <p>Horário da Aula:</p>
                            <input
                                class="input-leciona-entrada"
                                type="text"
                                onChange={({ target: { value }}) => setHorarioAula(value)}
                            />
                             <p>Dia da Semana:</p>
                            <select
                                class="styles-select-global"
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
                            
                            <button    
                            onClick={validarCampos}
                            class="styles-button-instituicao-env">Cadastrar
                            </button>
            </div>

   
           
        </>
    )
}
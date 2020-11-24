import React, {useEffect , useState} from 'react';
import Menu from '../../Components/administrador/header/header';
import api from '../../services/api';



export default function Leciona(){

    const [disciplina, setDisciplina] = useState([]);
    const [professor, setProfessor ] = useState([]);
    const [ turma, setTurma ] = useState([]);
    const [ Semestre, setSemestre ] = useState([]);
    const [ ano, setAno ] = useState([]);
    const [escolhaSemestre, setEscolhaSemestre ] = useState('');
    const [ escolhaAno, setEscolhaAno ] = useState('');
    const [escolhaTurma, setEscolhaTurma ] = useState(0);
    const [ escolhaProfessor, setEscolhaProfessor ] = useState('');
    const [ escolhaDisciplina, setEscolhaDisciplina ] = useState(0);

    useEffect(() =>{
        (async () => {
            const responseSemestre = await api.get('semestre');
            setSemestre(responseSemestre.data)
            //turma
            // const responseTurma = await api.get('/turma');
            // setTurma(responseTurma.data)
            //professor
            const responseProfessor = await api.get('/professor');
            setProfessor(responseProfessor.data)
            //disciplina
            const responseDisciplina = await api.get('/disciplina')
            setDisciplina(responseDisciplina.data);
        })();
    }, []);

    useEffect( () => {
        console.debug('professor', escolhaProfessor)
        console.debug('turma', escolhaTurma)
        console.debug('semestre', escolhaSemestre)
        console.debug('ano', escolhaAno)
        console.debug('disciplina', escolhaDisciplina)
        if(!escolhaSemestre){
            return alert('escolha um semestre');
        }
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
                ano: escolhaAno

            });
            console.log(response);
            alert('Cadastrado com sucesso')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        (async () =>{
            const response = await api.get(`/leciona/${escolhaDisciplina}`)
            setTurma(response.data)
        })();
      

    }, [escolhaDisciplina])
    return(
        <>
            <Menu />
            <div class="titulo-styles-cadastrar-cursos">
                    <h1>Cadastrar Leciona</h1>
            </div>
            <div class="columns-flex-cadastrar-cursos">
                <div class="column-div-instituicao-cadastro">
                    <div>
                            <p>Escolha Disciplina:</p>
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
                            <p>Escolha a Turma:</p>
                            <select 
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: {value }}) => setEscolhaTurma(value)}
                            > 
                            <option></option>
                               {turma.map(turma =>(
                                   <option value={turma.id_turma}>{turma.nome_turma} </option>
                               ))} 
                          </select>
                    </div>
                    <div>
                    <p>Semestre e Ano :</p>
                           <select 
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: {value }}) => setEscolhaSemestre(value)}
                           > 
                            <option></option>
                               {Semestre.map(Semestre =>(
                                   <option value={Semestre.semestre}>{Semestre.semestre} de {Semestre.ano}</option>
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
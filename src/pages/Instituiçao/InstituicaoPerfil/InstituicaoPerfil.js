import React, { useEffect, useState, createContext, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header';
import './Instituicao.css';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faLock } from '@fortawesome/free-solid-svg-icons';
import { ContextInstituicao } from '../../../Context/InstituicaoContext';
import { Context } from '../../../Context/CursoContext';
import { ContextTurma } from '../../../Context/TurmaContext';






function InstituicaoPerfil({ children }) {
    const { SelecionaTurma } = useContext(ContextTurma)
    const { perfilCursoIdc } = useContext(Context)
    const { id } = useContext(ContextInstituicao)

    //buscar Instituição Selecionada!
    const [buscarInstituicao, setBuscarInstituicao] = useState([]);
    const [nome, setNome] = useState('');



    //Buscar Cursos Ativo na instituicao
    const [buscarCursosAtivos, setBuscarCursosAtivos] = useState([]);


    // Buscar Turmas situacao aberto # 3
    const [turma, setTurma] = useState([]);
    const [escolhaCurso, setEscolhaCurso] = useState(0);


    // Recarregar a pagina
    const [reload, setReload] = useState(true);
    const [turmasVinculadas, setTurmasVinculadas] = useState([])


    //Buscar Cursos Vinculados a Instituicao #2
    const [cursoInstituicao, setCursoInstituciao] = useState([]);

    //vincular Curso a Instituição
    const [curso, setCurso] = useState([]);
    const [escolhaInstituicao, setEscolhaInstituicao] = useState(0);
    const [escolhaSituacao, setEscolhaSituacao] = useState('');



    useEffect(() => {
        try {
            async function SelecionarInstituicao() {
                // const responseTableTurma = await api.get(`/turma/curso/${idc}`)
                // setTurmasVinculadas(responseTableTurma.data);


                //Selecionar a insituticao
                const response = await api.get(`/instituicao/perfil/${id}`)
                    setBuscarInstituicao(response.data)

                //Buscar Curso Para vincular a instituicao
                const { data } = await api.get(`/instituicao/cursos/perfil`);
                    setCurso(data)


                //Buscar Cursos Vinculados a Instituicao #2
                const responseCursosInstituicao = await api.get(`/instituicao/curso/${id}`)
                    setCursoInstituciao(responseCursosInstituicao.data);

                // Buscar Turmas situacao aberto # 3
                const responseTurma = await api.get(`/instituicao/turmas/conecttion`)
                    setTurma(responseTurma.data);

                //Buscar Cursos Ativos para incluir na turma
                const responseCursosAtivos = await api.get(`/instituicao/cursos-ativos/turmas/${id}`)
                    setBuscarCursosAtivos(responseCursosAtivos.data);
            }

            SelecionarInstituicao();
        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        (async () => {

        const responseCursosInstituicao = await api.get(`/instituicao/cursos/buscar/${id}`)
            setCursoInstituciao(responseCursosInstituicao.data);

        const ResponseTurmasVIC = await api.get(`/instituicao/curso/turmas/vinculados/${id}`);
            setBuscarTurmaVI(ResponseTurmasVIC.data);

        const responseCursosAtivos = await api.get(`/instituicao/cursos-ativos/turmas/${id}`)
            setBuscarCursosAtivos(responseCursosAtivos.data);

        })();

    }, [reload])

    async function vincularCursoaTurma() {
        console.log(escolhaTurno, escolhaTurma)
        try {
            // await api.post(`turmacurso/${escolhaTurma}/${idc}/${escolhaTurno}`);
            alert('Vinculado');
            if (reload === false) {
                return setReload(true);
            }
            return setReload(false);
        } catch (error) {
            console.log(error)
            alert('error! Verifique os campos.')
        }

    }
    async function desvincularTurmadoCurso(idTurma) {
        try {
            //    await api.delete(`turmacurso/${idTurma}/${idc}`);
            alert('Apagado com Sucesso');
            if (reload === false) {
                return setReload(true);
            }
            return setReload(false);
        } catch (error) {
            alert('Error')
        }
    }





    async function DesativaCursoInstituicao(idI, idC, situacao) {
        try {
            if (situacao === 'Inativo' || situacao === 'INATIVO') {
                if (reload === true) {
                    setReload(false)
                }
                console.log(reload)
                console.log(situacao)
                const response = await api.put(`/instituicao/cursos/${idI}/${idC}/Ativo`);
                console.log(response);
                setReload(true)
                return alert('Ativo')
            }
            else if (situacao === 'Ativo' || situacao === "ATIVO") {
                if (reload === false) {
                    setReload(true)
                }
                console.log(reload)
                console.log(situacao)
                const response = await api.put(`/instituicao/cursos/${idI}/${idC}/Inativo`);
                console.log(response);
                setReload(false)
                alert('Inativado')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function VincularTurmaCursoInstituicao() {
        try {
            alert('ok')
        } catch (error) {

        }
    }
    async function CadastrarCursoInstituicao() {
        try {
            const response = await api.post(`/instituicao/cursos`, {
                idCurso: escolhaCurso,
                idInstituicao: id,
                situacao_curso_instituicao: escolhaSituacao
            })
            setReload(1);
            alert('Cadastrado com sucesso')
        } catch (error) {
            console.log(error)
            alert('Faltou dados')

        }
    }
    async function ExcluirCursoInstituicao(curso, instituicao) {
        try {
            const response = await api.delete(`/instituicao/cursos/${instituicao}/${curso}`);
            await setReload(2);
        
            alert('apagado com sucesso');
        } catch (error) {
            console.log(error)
        }
    }



    //Vincular ou Desvincular Instituição, turma e cursos.

    // Vincular
    const [escolhaTurno, setEscolhaTurno] = useState('');
    const [escolhaTurma, setEscolhaTurma] = useState(0);
    const [escolhaCursoTI, setEscolhaCursoTI] = useState(0);
    const [buscarTurmaVI, setBuscarTurmaVI ] = useState([]);
   

    async function CursoTurmaInstituicao(){
            const response = 
            await 
                api.post(`/instituicao/turmas/curso/connection/${escolhaTurma}/${id}/${escolhaCursoTI}/${escolhaTurno}`);
            
            if(response.data  === 'Vinculado'){
                if(reload === false){
                    alert(response.data)
                    return setReload(true)
                }
                alert(response.data)
                return setReload(false)
            }else(
                alert(response.data)
            )
    }
    //Desvincular
    async function CursoTurmaInstituicaoDelete(idCurso, idTurma){
        try {
            await 
                api.delete(`/instituicao/turmas/curso/connection/${idTurma}/${id}/${idCurso}`);
                    alert('Desvinculado a turma na Instituição');
            if(reload === false){
                return setReload(true);
            }
            return setReload(false);
        } catch (error) {
            alert('error')   
        }
    }     

    return (
        <>
            <Menu />

            <div class="perfil-instituicao-bg" >
                <div class="perfil-titulo">
                    <h2>Dados do Perfil</h2>
                </div>
            </div>
            {buscarInstituicao.map(instituicao => (

                <section key={instituicao.id_instituicao} class="perfil-dados-flex">
                    <div class="flex-1">
                        <p>Nome da Instituição: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.nome_instituicao}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Resposável: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.responsavel}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Unidade: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.unidade}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>E-mail: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.email}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>DDI: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.ddi}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>DDD: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.ddd}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Número Telefone: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.numero_telefone}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>CEP: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.cep}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                    </div>
                    <div class="flex-1">
                        <p>Estado: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.estado}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Cidade: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.cidade}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Bairro: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.bairro}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Quadra: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.quadra}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Número: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.numero_endereco}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Complemento: </p>
                        <input
                            type="text"
                            defaultValue={instituicao.complemento}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                    </div>
                </section>
            ))}
            <section>
                <div class="linha-separado-instituicao-perfil">
                </div>
                <div class="cadastrar-curso-a-instituicao-titulo">
                    <h1>Cadastrar Curso a Instituição</h1>
                </div>
                <div class="input-cadastrar-curso-a-instituicao">
                    <div class="input-cadastrar-curso-a-instituicao-div">
                        <p>Curso</p>
                        <select
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value } }) => setEscolhaCurso(value)}
                        >
                            <option></option>
                            {curso.map(curso => (
                                <option value={curso.id_curso}>
                                    Código: {curso.id_curso} 
                                        ||
                                    Nome: {curso.nome_curso}

                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="input-cadastrar-curso-a-instituicao-div">
                        <p>Situação</p>
                        <select
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value } }) => setEscolhaSituacao(value)}
                        >
                            <option></option>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                    </div>

                </div>
                <div class="button-cadastrar-curso-a-instituicao-div">
                    <button class="button-cadastrar-semestre-env" onClick={CadastrarCursoInstituicao}>Cadastrar</button>
                </div>
            </section>
            <section>
                <div class="linha-separado-instituicao-perfil">
                </div>
                <div class="list-cursos-all-bg">
                    <table >
                        <tr>
                            <th scope="col">
                                Código Curso
                            </th>
                            <th scope="col">
                                Nome Curso
                            </th>
                            <th scope="col">
                                Situação
                            </th>
                            <th scope="col">
                                Ativar / Inativar
                            </th>
                            <th scope="col">
                                Visualizar
                            </th>
                            <th scope="col">
                                Excluir
                            </th>
                        </tr>

                        {cursoInstituicao.map(cursoInstituicao => (

                            <tr key={cursoInstituicao.id_curso}>
                                <td>{cursoInstituicao.id_curso}</td>
                                <td>{cursoInstituicao.nome_curso}</td>
                                <td>{cursoInstituicao.situacao_curso_instituicao}</td>
                                <td>
                                    <a
                                        onClick={() =>
                                        DesativaCursoInstituicao
                                        (id, cursoInstituicao.id_curso, cursoInstituicao.situacao_curso_instituicao)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faLock} size="lg" color="green" />
                                    </a>

                                </td>
                                <td>
                                <a
                                    onClick={() => perfilCursoIdc(cursoInstituicao.id_curso)}
                                >
                                    <FontAwesomeIcon icon={faEdit} size="lg" color="#0060EB" />
                                </a>
                                </td>
                                <td>
                                    <a
                                        onClick={() => ExcluirCursoInstituicao(cursoInstituicao.id_curso, id)}
                                    >
                                    <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </section>
            <div class="linha-separado-instituicao-perfil">
            </div>
            <div class="cadastrar-curso-a-instituicao-titulo">
                <h1>Vincular a Turma a Instituição</h1>
            </div>
            <div class="input-cadastrar-curso-a-instituicao">
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Turma:</p>
                    <select
                        class="input-styles-IT text-aling-center-cadastrar-curso"
                        onChange={({ target: { value } }) => setEscolhaTurma(value)}
                    >
                        <option></option>
                        {turma.map(turma => (
                            <option value={turma.id_turma}>
                                Código: {turma.id_turma} 
                                    ||
                                Nome: {turma.nome_turma}

                            </option>
                        ))}



                    </select>
                </div>
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Turno:</p>

                    <select
                        class="input-styles-IT text-aling-center-cadastrar-curso"
                        onChange={({ target: { value } }) => setEscolhaTurno(value)}
                    >
                        <option></option>
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                        <option value="Noturno">Noturno</option>

                    </select>

                </div>
                <div class="input-cadastrar-curso-a-instituicao-div">
                    <p>Curso:</p>

                    <select
                        class="input-styles-IT text-aling-center-cadastrar-curso"
                        onChange={({ target: { value } }) => setEscolhaCursoTI(value)}
                    >
                        <option></option>
                        {buscarCursosAtivos.map(buscarCursosAtivos => (
                            <option value={buscarCursosAtivos.id_curso}>
                                Código: {buscarCursosAtivos.id_curso} ||
                                Nome: {buscarCursosAtivos.nome_curso}

                            </option>
                        ))}

                    </select>

                </div>
            </div>
            <div class="button-cadastrar-curso-a-instituicao-div">
                <button
                    onClick={CursoTurmaInstituicao}
                    class="button-cadastrar-semestre-env">Cadastrar</button>
            </div>
            <div class="linha-separado-instituicao-perfil">
            </div>
            <div class="cadastrar-curso-a-instituicao-titulo">
                <h1>Turmas</h1>
            </div>
            <section>
                <div class="list-cursos-all-bg">
                    <table >
                        <tr>
                            <th scope="col">
                                Código da Turma
                            </th>
                            <th scope="col">
                                Nome da Turma
                            </th>
                            <th scope="col">
                                Turno
                            </th>
                            <th scope="col">
                                Curso
                            </th>
                            <th scope="col">
                                Visualizar
                            </th>
                            <th scope="col">
                                Excluir
                            </th>
                        </tr>


                        {buscarTurmaVI.map(buscarTurmaVI => (
                            <tr key={buscarTurmaVI.id_turma}>
                                <td>{buscarTurmaVI.id_turma}</td>
                                <td>{buscarTurmaVI.nome_turma}</td>
                                <td>{buscarTurmaVI.turno}</td>
                                <td>{buscarTurmaVI.nome_curso}</td>
                                <td>
                                    <a onClick={() => SelecionaTurma(buscarTurmaVI.id_turma)}>
                                        <FontAwesomeIcon icon={faEdit} size="lg" color="green" />
                                    </a>
                                </td>
                                <td>
                                <a onClick={
                                        () => CursoTurmaInstituicaoDelete(buscarTurmaVI.id_curso,buscarTurmaVI.id_turma)
                                    }
                                >
                                        <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                                    </a>                  
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </section>
        </>
    );
}

export { InstituicaoPerfil }
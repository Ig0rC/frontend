import React, { useEffect, useState, useContext, useRef } from 'react';
import Menu from '../../../Components/administrador/header/header';
import './Instituicao.css';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faLock, faSave } from '@fortawesome/free-solid-svg-icons';
import { ContextInstituicao } from '../../../Context/InstituicaoContext';
import { Context } from '../../../Context/CursoContext';
import { ContextTurma } from '../../../Context/TurmaContext';
import history from '../../history';
var validator = require("email-validator");







function InstituicaoPerfil() {
    const { SelecionaTurma } = useContext(ContextTurma)
    const { perfilCursoIdc } = useContext(Context)
    const { id } = useContext(ContextInstituicao)

    //buscar Instituição Selecionada!
    const [buscarInstituicao, setBuscarInstituicao] = useState([]);



    //Buscar Cursos Ativo na instituicao
    const [buscarCursosAtivos, setBuscarCursosAtivos] = useState([]);


    // Buscar Turmas situacao aberto # 3
    const [turma, setTurma] = useState([]);
    const [escolhaCurso, setEscolhaCurso] = useState(0);


    // Recarregar a pagina
    const [reload, setReload] = useState(true);


    //Buscar Cursos Vinculados a Instituicao #2
    const [cursoInstituicao, setCursoInstituciao] = useState([]);

    //vincular Curso a Instituição
    const [curso, setCurso] = useState([]);
    const [escolhaSituacao, setEscolhaSituacao] = useState('');



    useEffect(() => {
        try {
            async function SelecionarInstituicao() {
                // const responseTableTurma = await api.get(`/turma/curso/${idc}`)
                // setTurmasVinculadas(responseTableTurma.data);


                //Selecionar a insituticao
                const response = await api.get(`/instituicao/perfil/${id}`)
                    setBuscarInstituicao(response.data)
                console.log(response.data)
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

 
    async function CadastrarCursoInstituicao() {
        try {
            const response = await api.post(`/instituicao/cursos`, {
                idCurso: escolhaCurso,
                idInstituicao: id,
                situacao_curso_instituicao: escolhaSituacao
            })
            if(reload === false){
                return await setReload(true)
            }
            return await setReload(false)
        } catch (error) {
            console.log(error)
            alert('Faltou dados')

        }
    }
    async function ExcluirCursoInstituicao(curso) {
        try {
            await api.delete(`/instituicao/cursos/excluir/curso/${id}/${curso}/`);
            if(reload === false){
                alert('apagado com sucesso');
                return await setReload(true)
            }
            alert('apagado com sucesso')
            return await setReload(false)
            
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

    //update

    const nomeI = useRef(null);
    const responsavel = useRef(null);
    const unidade = useRef(null);
    const email = useRef(null);
    const ddd = useRef(null);
    const numero_telefone = useRef(null);
    const cep = useRef(null);
    const estado = useRef(null);
    const cidade = useRef(null);
    const bairro = useRef(null);
    const quadra = useRef(null);
    const numero = useRef(null);
    const complemento = useRef(null);


    async function InstituicaoUpdate(idtelefone, idendereco){

        if(validator.validate(email.current.value) === false){
            return alert('E-mail inválido')
        }
        try {
            console.debug(id, idtelefone, 'endereco', idendereco)
            console.log('ok')
            const response = await api.put(`/instituicao/${id}/${idtelefone}/${idendereco}`,{
                nome: nomeI.current.value,
                responsavel: responsavel.current.value,
                unidade: unidade.current.value,
                email: email.current.value,
                ddd: ddd.current.value ,
                numero_telefone: numero_telefone.current.value,
                cep: cep.current.value,
                estado: estado.current.value,
                bairro: bairro.current.value,
                quadra: quadra.current.value,
                numero_endereco: numero.current.value,
                complemento: complemento.current.value
            })

            alert("Atualizado com sucesso")
        } catch (error) {
            alert(error)
            console.log(error)   
        }
    }

    async function DeleteInstituicao(idtelefone, idendereco){
        try {
            const resposta = window.confirm("Tem certeza que quer excluir ?")
            if(resposta === true){
                const response = await api.delete(`/instituicao/excluir/cascade/delete/${id}/${idtelefone}/${idendereco}`);
                console.log(response)
                alert('Excluido com sucesso!');
                history.push('/pesqinstituicao')
            }
        } catch (error) {
            alert(error)
        }
    }

    async function maxLengthCheck (object) {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
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
            <section >
            {buscarInstituicao.map(instituicao => (

            
                <div key={instituicao.id_instituicao}  class="perfil-dados-flex">
                    <div>
                        <p>Nome da Instituição: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={nomeI}
                            type="text"
                            defaultValue={instituicao.nome_instituicao}
                        />
                        <p>Resposável: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={responsavel}
                            type="text"
                            defaultValue={instituicao.responsavel}
                        />
                        <p>Unidade: </p>
                        <input 
                            className="input-styles-instituicao-perfil"
                            ref={unidade}
                            type="text"
                            defaultValue={instituicao.unidade}
                        />
                        <p>E-mail: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={email}
                            type="text"
                            defaultValue={instituicao.email}
                        />
                        <p>DDD: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={ddd}
                            type="number"
                            onInput={maxLengthCheck}
                            maxLength={3}
                            defaultValue={instituicao.ddd}
                        />
                        <p>Número Telefone: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={numero_telefone}
                            type="number"
                            onInput={maxLengthCheck}
                            maxLength={10}
                            defaultValue={instituicao.numero_telefone}
                        />
                        <p>CEP: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={cep}
                            type="number"
                            onInput={maxLengthCheck}
                            maxLength={8}
                            defaultValue={instituicao.cep}
                        />
                    </div>
                    <div>
                        <p>Estado: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={estado}
                            type="text"
                            defaultValue={instituicao.estado}
                        />
                        <p>Cidade: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={cidade}
                            type="text"
                            defaultValue={instituicao.cidade}
                        />
                        <p>Bairro: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={bairro}
                            type="text"
                            defaultValue={instituicao.bairro}
                        />
                        <p>Quadra: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={quadra}
                            type="text"
                            defaultValue={instituicao.quadra}
                        />
                        <p>Número: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={numero}
                            type="number"
                            onInput={maxLengthCheck}
                            maxLength={4}
                            defaultValue={instituicao.numero_endereco}
                        />
                        <p>Complemento: </p>
                        <input
                            className="input-styles-instituicao-perfil"
                            ref={complemento}
                            type="text"
                            defaultValue={instituicao.complemento}
                        />
                    </div>
                </div>     
            
            ))}
            </section>




            <section>
                {buscarInstituicao.map(int => (
                <div className="icon-lixeira-perfil">
                     <div>
                         <a 
                            onClick={() => DeleteInstituicao(int.id_telefone, int.id_endereco)} 
                          >
                             <FontAwesomeIcon icon={faTrash} size="3x" color="red" />
                         </a>
                     </div>
                     <div>
                         <a 
                          onClick={() =>InstituicaoUpdate(int.id_telefone, int.id_endereco)}
                        >
                             <FontAwesomeIcon icon={faSave} size="3x" color="green" />
                         </a>
                     </div>   
                </div>
                ))}        
            </section>
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
                            class="input-styles-instituicao-perfil"
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
                            class="input-styles-instituicao-perfil"
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
            
            <div class="linha-separado-instituicao-perfil">
            </div>
            {/* DESKTOP */}
            <section class="table-desktop-off">
               
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

            {/* MOBILE */}
   
            <section className="mobile-off">
            {cursoInstituicao.map(cursoInstituicao => (
                <div key={cursoInstituicao.id_curso} className="mobile-table-div">
                    <p>Código do Curso: {cursoInstituicao.id_curso}</p>
                    <p>Nome Curso: {cursoInstituicao.nome_curso} </p>
                    <p>Situação: {cursoInstituicao.situacao_curso_instituicao}</p> 
                    <div className="mobile-table-instituicao">
                        <div>
                            <p>Visualizar: </p>
                            <a
                                    onClick={() => perfilCursoIdc(cursoInstituicao.id_curso)}
                                >
                                    <FontAwesomeIcon icon={faEdit} size="lg" color="#0060EB" />
                            </a>
                        </div>
                        <div>
                            <p>Excluir: </p>
                            <a
                                onClick={() => ExcluirCursoInstituicao(cursoInstituicao.id_curso, id)}
                                    >
                                    <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                                </a>  
                            
                        </div>
                        <div>
                            <p>Ativar / Inativar: </p>  
                            <a
                                onClick={() =>
                                DesativaCursoInstituicao
                                (id, cursoInstituicao.id_curso, cursoInstituicao.situacao_curso_instituicao)
                                }
                                >
                                <FontAwesomeIcon icon={faLock} size="lg" color="green" />
                            </a>          
                        </div>
           
                    </div>
                </div>
            ))}
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
            <section className="table-desktop-off">
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
            </section>
            {/*  mobile */}

            <section className="mobile-off">
            {buscarTurmaVI.map(buscarTurmaVI => (
                <div key={buscarTurmaVI.id_turma} className="mobile-table-div">
                    <p>Código da Turma: {buscarTurmaVI.id_turma}</p>
                    <p>Nome da Turma: {buscarTurmaVI.nome_turma}</p>
                    <p>Turno: {buscarTurmaVI.turno}</p> 
                    <p>Curso: {buscarTurmaVI.nome_curso}</p> 
                    <div className="mobile-table-instituicao">
                        <div>
                            <p>Visualizar: </p>
                            <a onClick={() => SelecionaTurma(buscarTurmaVI.id_turma)}>
                                            <FontAwesomeIcon icon={faEdit} size="lg" color="green" />
                             </a>
                        </div>
                        <div>
                            <p>Excluir: </p>
                            <a onClick={
                                () => CursoTurmaInstituicaoDelete(buscarTurmaVI.id_curso,buscarTurmaVI.id_turma)
                                }
                                    >
                                <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                            </a>     
                        </div>
           
                    </div>
                </div>
            ))}
            </section>
        </>



    );
}

export { InstituicaoPerfil }
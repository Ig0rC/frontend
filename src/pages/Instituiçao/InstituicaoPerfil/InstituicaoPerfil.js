import React, { useEffect, useState, createContext, useContext } from 'react';
import Menu from '../../../Components/administrador/header/header';
import './Instituicao.css';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../../Context/InstituicaoContext'




function InstituicaoPerfil({ children }) {


    const { id } = useContext(Context)



    const [result, setResult] = useState([]);
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState([]);
    const [cursoInstituicao, setCursoInstituciao] = useState([]);
    const [escolhaCurso, setEscolhaCurso] = useState(0);
    const [escolhaInstituicao, setEscolhaInstituicao] = useState(0);
    const [escolhaSituacao, setEscolhaSituacao] = useState('');
    const [reload, setReload] = useState(true);
    const [icon, setIcon ] = useState(faLock)
    console.log(escolhaSituacao)
    useEffect(() => {
        try {
            async function SelecionarInstituicao() {
                const response = await api.get(`/instituicao/perfil/${id}`)
                setResult(response.data)
                const { data } = await api.get(`/instituicao/cursos/perfil`);
                setCurso(data)
                const responseCursosInstituicao = await api.get(`/instituicao/cursos/buscar/${id}`)
                setCursoInstituciao(responseCursosInstituicao.data)
            }

            SelecionarInstituicao();
        } catch (error) {
            console.log(error)
        }

    },[])
    
    useEffect(() =>{
        (async () => {

            const responseCursosInstituicao = await api.get(`/instituicao/cursos/buscar/${id}`)
            setCursoInstituciao(responseCursosInstituicao.data)
        
        })();
      
    }, [reload])




    async function DesativaCursoInstituicao(idI, idC, situacao){
        try {
            if(situacao === 'Inativo' || situacao === 'INATIVO'){
                if(reload === true){
                    setReload(false)
                }
                console.log(reload)
                console.log(situacao)
                const response = await api.put(`/instituicao/cursos/${idI}/${idC}/Ativo`);
                console.log(response);
                setReload(true)
                return alert('Ativo')
            }
            else if(situacao === 'Ativo' || situacao === "ATIVO"){
                if(reload === false){
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
                idInstituicao: escolhaInstituicao,
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

    return (
        <>
            <Menu />

            <div class="perfil-instituicao-bg" >
                <div class="perfil-titulo">
                    <h2>Dados do Perfil</h2>
                </div>
            </div>
            {result.map(result => (

                <section key={result.id_instituicao} class="perfil-dados-flex">
                    <div class="flex-1">
                        <p>Nome da Instituição: {nome}</p>
                        <input
                            type="text"
                            defaultValue={result.nome}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Resposável: </p>
                        <input
                            type="text"
                            defaultValue={result.responsavel}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Unidade: </p>
                        <input
                            type="text"
                            defaultValue={result.unidade}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>E-mail: </p>
                        <input
                            type="text"
                            defaultValue={result.email}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>DDI: </p>
                        <input
                            type="text"
                            defaultValue={result.ddi}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>DDD: </p>
                        <input
                            type="text"
                            defaultValue={result.ddd}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Número Telefone: </p>
                        <input
                            type="text"
                            defaultValue={result.numero_telefone}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>CEP: </p>
                        <input
                            type="text"
                            defaultValue={result.cep}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                    </div>
                    <div class="flex-1">
                        <p>Estado: </p>
                        <input
                            type="text"
                            defaultValue={result.estado}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Cidade: </p>
                        <input
                            type="text"
                            defaultValue={result.cidade}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Bairro: </p>
                        <input
                            type="text"
                            defaultValue={result.bairro}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Quadra: </p>
                        <input
                            type="text"
                            defaultValue={result.quadra}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Número: </p>
                        <input
                            type="text"
                            defaultValue={result.numero_endereco}
                            onChange={({ target: { value } }) => setNome(value)}
                        />
                        <p>Complemento: </p>
                        <input
                            type="text"
                            defaultValue={result.complemento}
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
                        <p>Instituição</p>
                        <select
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value } }) => setEscolhaInstituicao(value)}
                        >
                            <option></option>
                            {result.map(result => (
                                <option value={result.id_instituicao}>
                                    Código: {result.id_instituicao} ||
                                                Nome: {result.nome}

                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="input-cadastrar-curso-a-instituicao-div">
                        <p>Curso</p>
                        <select
                            class="input-styles-IT text-aling-center-cadastrar-curso"
                            onChange={({ target: { value } }) => setEscolhaCurso(value)}
                        >
                            <option></option>
                            {curso.map(curso => (
                                <option value={curso.id_curso}>
                                    Código: {curso.id_curso} ||
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
                            <option value="ATIVO">Ativo</option>
                            <option value="INATIVO">Inativo</option>
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
                                        <FontAwesomeIcon icon={icon} size="lg" color="green" />
                                    </a>

                                </td>

                                <td>

                                    <a
                                        onClick={() => ExcluirCursoInstituicao(cursoInstituicao.id_curso, id)}
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

        </>
    );
}

export { InstituicaoPerfil }
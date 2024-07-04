import styles from './Formulario.module.css';
import InputPesquisa from 'components/Input_Pesquisa';
import Option from './Option';
import Botao from 'components/Botao';
import EditorCodigo from 'components/EditorCodigo';
import { useContext, useEffect, useState } from 'react';
import { CodigoContext } from 'contexts/CodigoContexto';
import { useNavigate } from 'react-router-dom';
import { usePost } from "hooks/usePost"
import { ControleContext } from 'contexts/ControleContexto';

const Formulario = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const [hover, setHover] = useState(false)
    const [spanTitulo, setSpanTitulo] = useState(false);
    const [spanDescricao, setSpanDescricao] = useState(false);
    const [apiLinguage, setApiLinguage] = useState([]);
    const { setState, saveNewPost, savePostEdited } = usePost();
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/leonardoOluz/TEXT-EDITION-API/linguagen')
            .then(resposta => resposta.json())
            .then(dados => {
                setApiLinguage(dados)
            })
    }, [])
    const { setNoCodeSpan } = useContext(ControleContext);
    const { codigo,
        titulo,
        descricao,
        cor,
        setCodigo,
        setTitulo,
        setDescricao,
        setLinguagem,
        setCor,
        id_post
    } = useContext(CodigoContext);

    function configTimeOut() {
        setTimeout(() => {
            setToggle(true);
        }, 300)
    }

    function salvar(e) {
        e.preventDefault()

        if (!codigo || !titulo || !descricao) {
            !codigo && setNoCodeSpan(prev => prev = true)
            !titulo && setSpanTitulo(prev => prev = true)
            !descricao && setSpanDescricao(prev => prev = true)
        } else {
            id_post ? savePostEdited(id_post) : saveNewPost()
            setHover(true);
            setState();
            configTimeOut();
        }
    }

    function onChangeEdition(value) {
        setCodigo((prev) => prev = value)
        setNoCodeSpan(prev => prev = false)
    }

    return (
        <form onSubmit={salvar} className={styles}>

            <EditorCodigo changed={onChangeEdition} valor={codigo} cor={cor} />
            <div className={styles.container_formulario}>
                <label className={styles.label_form}>Seu Projeto</label>
                <InputPesquisa
                    placText='Nome do seu projeto'
                    text='text' stilos=""
                    change={(e) => {
                        setTitulo((prev) => prev = e.target.value)
                        setSpanTitulo(p => p = false)
                    }}
                    valor={titulo} />
                <span className={spanTitulo ? 'no_code' : 'hidden'}>Ops o titulo é obrigatorio!</span>
                <textarea
                    value={descricao}
                    onChange={(e) => {
                        setDescricao((prev) => prev = e.target.value)
                        setSpanDescricao(p => p = false)
                    }}
                    className='input_padrao' style={{ width: 'auto', padding: '1em', resize: 'none' }}
                    placeholder='Descrição do seu projeto'
                />
                <span className={spanDescricao ? 'no_code' : 'hidden'}>Por favor coloque uma descrição!</span>
                <label>Personalização</label>
                <div className={styles.container}>
                    <select
                        onChange={(e) => setLinguagem((prev) => prev = e.target.value)}
                        className={`input_padrao ${styles.seletor}`}
                        style={{ width: '100%' }}
                    >
                        {apiLinguage.map(item => <Option key={item.id} children={item.texto} valores={item.linguagem} />)}
                    </select>
                    <InputPesquisa
                        check
                        nameInput={"color"}
                        valor={cor}
                        change={(e) => setCor((prev) => prev = e.target.value)}
                        placText='Nome do seu projeto' text='color' stilos='color'
                    />
                </div>
                <Botao Children='Salvar Projeto' hovered={hover && "btn_hover"} />
                {toggle && navigate("/")}
            </div>
        </form>
    )
};

export default Formulario
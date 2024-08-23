/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Formulario.module.css";
import InputPesquisa from "components/Input_Pesquisa";
import Option from "./Option";
import Botao from "components/Botao";
import EditorCodigo from "components/EditorCodigo";
import { useContext, useEffect, useState } from "react";
import { CodigoContext } from "contexts/CodigoContexto";
import { Navigate, useParams } from "react-router-dom";
import { usePost } from "hooks/usePost";
import { ControleContext } from "contexts/ControleContexto";
import { useConnectApi } from "hooks/useConnectApi";

const Formulario = () => {
  const [toggle, setToggle] = useState(false);
  const [hover, setHover] = useState(false);
  const [spanTitulo, setSpanTitulo] = useState(false);
  const [spanDescricao, setSpanDescricao] = useState(false);
  const [apiLinguage, setApiLinguage] = useState([]);
  const { setState, saveNewPost } = usePost();
  const { setNoCodeSpan } = useContext(ControleContext);
  const {
    codigo,
    titulo,
    descricao,
    cor,
    setCodigo,
    setTitulo,
    setDescricao,
    setLinguagem,
    setCor,
    linguagem,
  } = useContext(CodigoContext);
  const { editionPost } = usePost();
  const { putApi, postApi, getApi } = useConnectApi();
  const params = useParams();

  function configTimeOut() {
    setTimeout(() => {
      setToggle(true);
    }, 300);
  }

  async function salvar(e) {
    e.preventDefault();
    const query = "postagem";

    if (!codigo || !titulo || !descricao) {
      !codigo && setNoCodeSpan((prev) => (prev = true));
      !titulo && setSpanTitulo((prev) => (prev = true));
      !descricao && setSpanDescricao((prev) => (prev = true));
    } else {
      params.id
        ? await putApi(`${query}/${params.id}`, {
            titulo,
            descricao,
            linguagem,
            codigo,
            cor,
          })
        : await postApi(query, saveNewPost());
      setHover(true);
      setState();
      configTimeOut();
    }
  }

  function onChangeEdition(value) {
    setCodigo((prev) => (prev = value));
    setNoCodeSpan((prev) => (prev = false));
  }

  useEffect(() => {
    if (params.id) {
      editionPost(params.id);
    }
  }, [params.id]);

  /* Inicando lista de linguagens disponiveis na api */
  useEffect(() => {
    const getLinguagens = async () => {
      const { data } = await getApi("linguagens");
      setApiLinguage(data);
    };
    getLinguagens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={salvar} className={styles}>
      <EditorCodigo changed={onChangeEdition} valor={codigo} cor={cor} />
      <div className={styles.container_formulario}>
        <label className={styles.label_form}>Seu Projeto</label>
        <InputPesquisa
          placText="Nome do seu projeto"
          text="text"
          stilos=""
          change={(e) => {
            setTitulo((prev) => (prev = e.target.value));
            setSpanTitulo((p) => (p = false));
          }}
          valor={titulo}
        />
        <span className={spanTitulo ? "no_code" : "hidden"}>
          Ops o titulo é obrigatorio!
        </span>
        <textarea
          value={descricao}
          onChange={(e) => {
            setDescricao((prev) => (prev = e.target.value));
            setSpanDescricao((p) => (p = false));
          }}
          className="input_padrao"
          style={{ width: "auto", padding: "1em", resize: "none" }}
          placeholder="Descrição do seu projeto"
        />
        <span className={spanDescricao ? "no_code" : "hidden"}>
          Por favor coloque uma descrição!
        </span>
        <label>Personalização</label>
        <div className={styles.container}>
          <select
            onChange={(e) => setLinguagem((prev) => (prev = e.target.value))}
            className={`input_padrao ${styles.seletor}`}
            style={{ width: "100%" }}
            value={linguagem}
          >
            {apiLinguage.map((item) => (
              <Option
                key={item._id}
                children={item.texto}
                valores={item.linguagem}
              />
            ))}
          </select>
          <InputPesquisa
            check
            nameInput={"color"}
            valor={cor}
            change={(e) => setCor((prev) => (prev = e.target.value))}
            placText="Nome do seu projeto"
            text="color"
            stilos="color"
          />
        </div>
        <Botao Children="Salvar Projeto" hovered={hover && "btn_hover"} />
        {toggle && <Navigate to="/" />}
      </div>
    </form>
  );
};

export default Formulario;

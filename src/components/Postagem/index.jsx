import { FaHeart } from "react-icons/fa";
import styles from "./Postagem.module.css";
import iconMensagem from "./icon_mensagem.png";
import Imagem from "components/Cabecalho/Imagem";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs/';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDownload } from "hooks/useDownload";

const Postagem = ({ poster, usuario, like, logado, posterMessage = false, handleDeletePoster }) => {
  const { clickPng, clickJpeg, clickJSvg, ref } = useDownload();
  const [nomeDownload, setNomeDownload] = useState("Png");

  const onBtnClickPng = () => {
    switch (nomeDownload) {
      case "Png":
        clickPng();
        break;
      case "Jpeg":
        clickJpeg();
        break;
      case "Svg":
        clickJSvg();
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.postagem}>
      <Link
        ref={ref}
        to={`/poster/${poster._id}`}
        className={styles.border} style={{ backgroundColor: `${poster.cor}` }}>
        <SyntaxHighlighter
          style={atomOneDark}
          customStyle={{
            width: "90%",
            paddingTop: "2.5em",
            borderRadius: "8px"
          }}
          wrapLongLines={true}
        >
          {poster.codigo}
        </SyntaxHighlighter>
        <div className={styles.container}>
          <div className={styles.circulos} />
          <div className={styles.circulos} style={{ backgroundColor: '#FFBD2E' }} />
          <div className={styles.circulos} style={{ backgroundColor: '#27C93F' }} />
        </div>
      </Link>
      <div className={styles.containerTitulo}>
        <h2>{poster.titulo}</h2>
        <p>{poster.descricao}</p>
      </div>
      {logado === poster.id_usuario ?
        <div className={styles.containerEditarExcluir}>
          <Link
            to={logado === poster.id_usuario && `/editar/${poster._id}`}
          >
            <button className={styles.btnEditar}>
              Editar
            </button>
          </Link>
          <button
            onClick={() => handleDeletePoster(poster._id)}
            className={styles.btnExcluir}
          >
            Excluir
          </button>
        </div>
        : <></>
      }
      <div className={posterMessage ? styles.posterMessage : styles.descricao}>
        <div className={`perfil`}>
          <Link
            className={`${styles.enjoyMessage}`}
            to={`/poster/${poster._id}`}
          >
            <img src={iconMensagem} alt="icone de mensagem" />
            <span>{poster.mensagem?.length}</span>
          </Link>
          <div className={`${styles.enjoyMessage}`} onClick={() => like(poster._id)}>
            {poster.curtidas_id_usuario.length > 0 && poster.curtidas_id_usuario.includes(logado)
              ? <FaHeart color="#f65151" size={20} />
              : <FaHeart size={20} />
            }
            <span>{poster.curtidas_id_usuario.length}</span>
          </div>
        </div>
        <div className={styles.download}>
          <label>Selecione</label>
          <select className={`btn_padrao`} onChange={e => setNomeDownload(e.target.value)}>
            <option defaultChecked value="Png">PNG</option>
            <option value="Jpeg">JPEG</option>
            <option value="Svg">SVG</option>
          </select>
          <button className={`btn_padrao`} onClick={onBtnClickPng}>{`Download`}</button>
        </div>
        <div className={`perfil ${styles.perfil_post}`} >
          <Imagem src={usuario.id_image.url}
            alt='foto perfil'
            lg="postagem"
            altura="25px"
            comprimento="35px" />
          <p className={styles.perfil}>{usuario.apelido}</p>
        </div>
      </div>
    </div>
  )
};

export default Postagem;
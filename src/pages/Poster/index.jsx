/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Postagem from "components/Postagem";
import styles from "./Poster.module.css";
import { CodigoContext } from "contexts/CodigoContexto";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useConnectApi } from "hooks/useConnectApi";
import { useSession } from "hooks/useSession";

const Poster = () => {
  const { userLogged, post, setPost, usuarios, setUsuarios } =
    useContext(CodigoContext);
  const [message, setMessage] = useState([]);
  const [texto, setTexto] = useState("");
  const { getApi, postApi, deleteApi } = useConnectApi();
  const paramns = useParams();
  const { verificarSessao } = useSession();
  const user = verificarSessao();
  const navigate = useNavigate();

  const getApiPoster = async () => {
    const messagePosters = await getApi(
      `mensagens/poster/?id_postagem=${paramns.id}`
    );
    const usuariosPoster = await getApi(`usuarios`);
    const postResult = await getApi(`postagem/${paramns.id}`);
    setPost({ status: true, data: postResult.data });
    setMessage(messagePosters.data);
    setUsuarios(usuariosPoster);
  };

  const handleNewMessage = async (event) => {
    event.preventDefault();
    if (texto) {
      const result = await postApi("mensagem", {
        id_usuario: user._id,
        id_postagem: paramns.id,
        texto: texto,
      });
      if (result.status) {
        setTexto("");
        getApiPoster();
      }
    }
  };

  const handleDeletePoster = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta postagem?"
    );
    if (confirmDelete) {
      // Lógica para excluir a postagem
      await deleteApi(`postagem/${id}`);
      navigate("/");
    }
  };

  useEffect(() => {
    if (paramns.id) {
      getApiPoster();
    }
  }, [paramns.id]);

  return (
    <>
      {post.status ? (
        <section className={styles.messagePost}>
          <Postagem
            key={userLogged.data._id}
            handleDeletePoster={handleDeletePoster}
            posterMessage={true}
            like={() => {}}
            logado={userLogged.data}
            poster={post.data}
            usuario={userLogged.data}
          />
          <form
            className={styles.formularioMessagem}
            onClick={handleNewMessage}
            style={{ borderColor: `${post.data.cor}` }}
          >
            <h3>Escreva um comentario</h3>
            <textarea
              key={userLogged.data._id}
              value={texto}
              name="texto"
              id="texto"
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Coloque seu comentario aqui !"
            />
            <button className="btn_padrao" type="submit">
              Enviar
            </button>
          </form>
          <h4>Comentarios</h4>
          {message.map((msg) => (
            <div
              key={msg._id}
              className={styles.containerMessage}
              style={{ borderColor: `${post.data.cor}` }}
            >
              {usuarios.data.map((usuario) => {
                if (usuario._id === msg.id_usuario) {
                  return <h3 key={usuario._id}>{usuario.apelido}</h3>;
                }
                return <></>;
              })}
              <p>{msg.texto}</p>
            </div>
          ))}
        </section>
      ) : (
        <span className={styles.loadingMsg}>Carregando...</span>
      )}
    </>
  );
};

export default Poster;

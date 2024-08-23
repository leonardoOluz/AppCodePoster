import { CodigoContext } from "contexts/CodigoContexto";
import { ControleContext } from "contexts/ControleContexto";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useConnectApi } from "./useConnectApi";


export const usePost = () => {
    const { codigo,
        linguagem,
        cor,
        titulo,
        descricao,
        setCodigo,
        setTitulo,
        setDescricao,
        setLinguagem,
        setCor,
        setId_post,
        userLogged,
        setPosters
    } = useContext(CodigoContext);
    const { setNoCodeSpan } = useContext(ControleContext)
    const { getApi } = useConnectApi();
    const navigate = useNavigate();

    /* Funções para postagem */
    let data = {
        titulo,
        descricao,
        linguagem,
        codigo,
        cor
    }

    const setState = () => {
        setCodigo("")
        setTitulo("")
        setDescricao("")
        setLinguagem("")
        setCor("#5081FB")
        setId_post()
        setNoCodeSpan(p => p = false)
    }

    const saveNewPost = () => {
        data.id_usuario = userLogged.data._id;
        return data;
    }

    const editionPost = async (id_post) => {
        let { data } = await getApi(`postagem/${id_post}`)
        setCodigo(data.codigo)
        setTitulo(data.titulo)
        setDescricao(data.descricao)
        setLinguagem(data.linguagem)
        setCor(data.cor)
    }

    const searchTitulo = async (e) => {
        setPosters(await getApi(`postagens/result/pesquisa?titulo=${e.target.value}`));
        navigate("/")
    }


    return {
        setState,
        saveNewPost,
        editionPost,
        searchTitulo
    }
}
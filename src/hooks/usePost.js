import { CodigoContext } from "contexts/CodigoContexto";
import { ControleContext } from "contexts/ControleContexto";
import { useContext } from "react";
import uuid from "react-native-uuid";
import { useNavigate } from "react-router-dom";


export const usePost = () => {
    const { codigo,
        linguagem,
        cor,
        titulo,
        descricao,
        usuarios,
        poster,
        setPoster,
        setCodigo,
        setTitulo,
        setDescricao,
        setLinguagem,
        setCor,
        setId_post,
        setPost,
    } = useContext(CodigoContext);
    const { setNoCodeSpan } = useContext(ControleContext)
    const navigate = useNavigate();

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
        const post = {
            id: uuid.v4(),
            id_usuario: usuarios[1].id,
            titulo,
            descricao,
            linguagem,
            codigo,
            cor,
            curtidas: {
                id_usuario: []
            },
            mensagem: []
        }
        setPoster([...poster, post])
    }

    const editionPost = (id_post) => {
        let thereIsEdition = poster.find((item) => item.id === id_post)
        setCodigo(thereIsEdition.codigo)
        setTitulo(thereIsEdition.titulo)
        setDescricao(thereIsEdition.descricao)
        setLinguagem(thereIsEdition.linguagem)
        setCor(thereIsEdition.cor)
    }

    const savePostEdited = (id_post) => {
        setPoster(poster.map(prev => {
            if (prev.id === id_post) {
                prev.titulo = titulo
                prev.descricao = descricao
                prev.linguagem = linguagem
                prev.codigo = codigo
                prev.cor = cor
                return prev
            }
            return prev
        }))
    }

    const searchPost = (e) => {
        setPost(poster.filter((item) => item.descricao.toLowerCase().includes(e.target.value.toLowerCase())))
        navigate("/")
    }

    const getPoster = () => {
        setPost([...poster])
    }

    return {
        setState,
        saveNewPost,
        editionPost,
        savePostEdited,
        searchPost,
        getPoster
    }

}
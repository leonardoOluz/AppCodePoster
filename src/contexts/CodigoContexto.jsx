import { createContext, useState } from "react";

export const CodigoContext = createContext();
CodigoContext.displayName = "Codigo";

export const CodigoProvider = ({ children }) => {
    const dataInicial = {
        data: [],
        status: false
    }
    /* VAriavies de estado da api/json */
    const [usuarios, setUsuarios] = useState(dataInicial)
    const [posters, setPosters] = useState(dataInicial)
    const [myPosters, setMyPosters] = useState(dataInicial)
    const [userLogged, setUserLogged] = useState(dataInicial)
    const [post, setPost] = useState({
        data: {},
        status: false
    });

    /* Variaveis de controle do formulario*/
    const [codigo, setCodigo] = useState("");
    const [linguagem, setLinguagem] = useState("");
    const [cor, setCor] = useState("#5081FB");
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [id_post, setId_post] = useState("");

    return (
        <CodigoContext.Provider value={{
            posters, setPosters, usuarios, setUsuarios,
            codigo, setCodigo, linguagem, setLinguagem,
            cor, setCor, titulo, setTitulo, descricao, setDescricao,
            id_post, setId_post, userLogged, setUserLogged,
            myPosters, setMyPosters, post, setPost
        }}>
            {children}
        </CodigoContext.Provider>
    )
}
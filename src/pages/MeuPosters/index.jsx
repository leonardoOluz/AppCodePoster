import Postagem from "components/Postagem";
import Secao from "components/Secao";
import { CodigoContext } from "contexts/CodigoContexto";
import { ControleContext } from "contexts/ControleContexto";
import { useConnectApi } from "hooks/useConnectApi";
import { useContext, useEffect } from "react";

const MeuPoster = () => {
    const { myPosters, setMyPosters, userLogged } = useContext(CodigoContext)
    const { status, setStatus, msg, setMsg } = useContext(ControleContext)
    const { getApiPoster, acessTokenSessao, putApi, deleteApi } = useConnectApi();

    async function getPosters() {
        let dadtaApi = await getApiPoster();
        setMsg(dadtaApi.msg)
        if (dadtaApi.status) {
            setMyPosters({ ...dadtaApi, data: dadtaApi.data })
            setStatus(dadtaApi.status)
            acessTokenSessao()
        }
    }

    const liked = async (id) => {
        let poster = myPosters.data.find((item) => item._id === id)
        const result = poster.curtidas_id_usuario.includes(userLogged.data._id)
        result
            ? poster.curtidas_id_usuario = poster.curtidas_id_usuario
                .filter(id => id !== userLogged.data._id)
            : poster.curtidas_id_usuario
                .push(userLogged.data._id)
        const query = `postagem/${poster._id}`
        await putApi(query, { curtidas_id_usuario: poster.curtidas_id_usuario })
        getPosters()
    }

    const handleDeletePoster = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta postagem?");
        if (confirmDelete) {
            // Lógica para excluir a postagem
            await deleteApi(`postagem/${id}`);
            await getPosters();
        }
    };

    useEffect(() => {
        getPosters()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (<Secao>{
        !status
            ? (<h1 style={{ color: 'white' }}>{msg}</h1>)
            : (myPosters.data.map((poster) => <Postagem
                handleDeletePoster={handleDeletePoster}
                poster={poster}
                like={liked}
                usuario={userLogged.data}
                logado={userLogged.data._id}
                key={poster._id}
            />))
    }
    </Secao>)
}

export default MeuPoster;
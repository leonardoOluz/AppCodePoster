import Postagem from "components/Postagem";
import Secao from "components/Secao";
import { useContext, useEffect } from "react";
import { useConnectApi } from 'hooks/useConnectApi';
import { CodigoContext } from "contexts/CodigoContexto";
import { ControleContext } from "contexts/ControleContexto";

const Comunidade = () => {
    const { posters, setPosters, setUsuarios, usuarios, userLogged } = useContext(CodigoContext)
    const { status, setStatus, msg, setMsg } = useContext(ControleContext)
    const { getApi, putApi, deleteApi } = useConnectApi();

    const liked = async (id) => {
        let poster = posters.data.find((item) => item._id === id)
        const result = poster.curtidas_id_usuario.includes(userLogged.data._id)
        result
            ? poster.curtidas_id_usuario = poster.curtidas_id_usuario
                .filter(id => id !== userLogged.data._id)
            : poster.curtidas_id_usuario
                .push(userLogged.data._id)
        const query = `postagem/${poster._id}`
        await putApi(query, { curtidas_id_usuario: poster.curtidas_id_usuario })
        setPosters(await getApi('postagens'));
    }

    const handleDeletePoster = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta postagem?");
        if (confirmDelete) {
            // Lógica para excluir a postagem
            await deleteApi(`postagem/${id}`)
            let dataApi = await getApi('usuarios-posters');
            if (dataApi) {
                const { resultUsers, resultsPosters } = dataApi.data;
                if (dataApi.status) {
                    setUsuarios({ ...dataApi, data: resultUsers })
                    setPosters({ ...dataApi, data: resultsPosters })
                }
            }
        }
    };

    useEffect(() => {
        async function getDate() {
            let dataApi = await getApi('usuarios-posters');
            if (dataApi) {
                const { resultUsers, resultsPosters } = dataApi.data;
                setMsg(dataApi.msg)
                if (dataApi.status) {
                    setUsuarios({ ...dataApi, data: resultUsers })
                    setPosters({ ...dataApi, data: resultsPosters })
                    setStatus(dataApi.status)
                }
            }
        }
        getDate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<Secao>{
        !status
            ? (<h1 style={{ color: 'white' }}>{msg}</h1>)
            : (posters.data.map((poster) => <Postagem
                handleDeletePoster={handleDeletePoster}
                poster={poster}
                like={liked}
                usuario={usuarios.data.find((user) => user._id === poster.id_usuario)}
                logado={userLogged.data._id}
                key={poster._id}
            />))
    }
    </Secao>)
};

export default Comunidade;
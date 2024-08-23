import { useContext } from "react";
import { useCookies } from "./useCookies";
import { useSession } from "./useSession";
import api from "config/configApi";
import { useNavigate } from 'react-router-dom';
import { CodigoContext } from "contexts/CodigoContexto";

export const useConnectApi = () => {
    const { setUserLogged, userLogged, setPosters, setMyPosters, setUsuarios } = useContext(CodigoContext)
    const { getCookie, removeCookie } = useCookies();
    const { limparSessao, verificarSessao } = useSession();
    const navegate = useNavigate();
    let token;
    let sessao;
    const dataInicial = {
        data: [],
        status: false
    }

    // appCodePoster
    const acessTokenSessao = () => {
        sessao = verificarSessao();
        setUserLogged({ ...userLogged, status: true, data: sessao });
        token = getCookie();
    }

    /* Deslogar */
    const handleClickDeslogar = () => {
        limparSessao();
        removeCookie();
        setPosters(dataInicial);
        setMyPosters(dataInicial);
        setUserLogged(dataInicial);
        setUsuarios(dataInicial);
        navegate('/login');
    }

    /* remover token expirado e sessão de usuario */
    const errorTokenExpired = () => {
        removeCookie()
        limparSessao();
        navegate('/login');
    }

    /* Get in API Text-edition-code */
    const getApi = async (query) => {
        acessTokenSessao();
        let newData = {
            data: [],
            status: true
        }

        try {
            if (!token) {
                navegate('/login');
                return false;
            } else {
                const response = await api.get(`/${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                newData.msg = 'carregado';
                newData.data = response.data;
                return newData;
            }
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                newData.msg = 'Erro de servidor, tente mais tarde';
                newData.status = false
                return newData
            }
            if (error.response.data.message.message === 'jwt expired') {
                errorTokenExpired();
                return newData;
            }
        }
    }

    const getApiPoster = async () => {
        acessTokenSessao();
        let newData = {
            data: [],
            status: true
        }

        const query = `postagens/buscar/usuario?id_usuario=${sessao._id}`
        try {
            if (!token) {
                navegate('/login');
            } else {
                const response = await api.get(`/${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                newData.msg = 'carregado';
                newData.data = response.data;
                return newData;
            }
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                newData.msg = 'Erro de servidor, tente mais tarde';
                newData.status = false
                return newData
            }
            if (error.response.data.message.message === 'jwt expired') {
                errorTokenExpired();
                return newData;
            }
        }
    }

    /* Post in API text-edition-code */
    const postApi = async (query, data) => {
        acessTokenSessao();
        const newData = {
            data: [],
            status: true
        }

        try {
            if (!token) {
                navegate('/login');
            }

            const response = await api.post(`/${query}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            newData.data = response.data;
            return newData;
        } catch (error) {
            if (error.response.data.message.message === 'jwt expired') {
                errorTokenExpired();
            }
            newData.msg = `Erro ao cadastrar ${query}`;
            newData.status = false;
            return newData;
        }
    }

    /* Put in Api text-edition-code */
    const putApi = async (query, data) => {
        acessTokenSessao();
        const newData = {
            data: [],
            status: true
        }

        try {
            if (!token) {
                navegate('/login');
            } else {
                const response = await api.put(`/${query}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                newData.data = response.data;
                return newData;
            }
        } catch (error) {
            if (error.response.data.message.message === 'jwt expired') {
                errorTokenExpired();
            }
            newData.msg = `Erro ao atualizar ${query}`;
            newData.status = false
            return newData
        }
    }

    const deleteApi = async (query) => {
        acessTokenSessao();
        let newData = {
            data: [],
            status: true
        }

        try {
            if (!token) {
                navegate('/login');
                return false;
            } else {
                const response = await api.delete(`/${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                newData.msg = 'carregado';
                newData.data = response.data;
                return newData;
            }
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                newData.msg = 'Erro de servidor, tente mais tarde';
                newData.status = false
                return newData
            }
            if (error.response.data.message.message === 'jwt expired') {
                errorTokenExpired();
                return newData;
            }
        }
    }

    return {
        acessTokenSessao,
        handleClickDeslogar,
        getApi,
        putApi,
        postApi,
        getApiPoster,
        deleteApi,
        userLogged
    }
};


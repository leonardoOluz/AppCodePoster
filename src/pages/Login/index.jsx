import { Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import ContainerInputLabel from "components/BotaoRegistros";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import api from 'config/configApi';
import { useCookies } from 'hooks/useCookies';
import { useSession } from 'hooks/useSession';
import { CodigoContext } from 'contexts/CodigoContexto';

const Login = () => {
    const { userLogged, setUserLogged } = useContext(CodigoContext);
    const loginIncial = {
        email: "",
        senha: ""
    }
    const [login, setLogin] = useState(loginIncial);
    const [toggle, setToggle] = useState(false);
    const [msgErro, setMsgErro] = useState('');
    const [msgSuccessfull, setMsgSuccessfull] = useState('');
    const { setCookie, } = useCookies();
    const { saveSession } = useSession();

    /* Tratando o pôs envio o formulario e direcionando rotas */
    const successufulyConection = () => {
        setMsgSuccessfull('Login efetuado com sucesso');
        setTimeout(() => {
            setToggle(true)
        }, 1000);
    }

    /* Lindando com as mudanças do input */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
        setMsgErro('');
    }

    /* Enviando formulario via post para logar */
    const postLogar = async () => {
        try {
            const resp = await api.post('/user/login', login, {
                headers: { 'Content-Type': 'application/json' }
            });
            const { payload, token } = resp.data;
            setUserLogged({ ...userLogged, status: true, data: payload });
            setCookie(token);
            saveSession(payload);
            successufulyConection();
        } catch (error) {
            setMsgSuccessfull('');
            setMsgErro(error.response.data.message);
        }
    }

    /* Tratando o submit do formulario */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (login.email && login.senha) await postLogar();
    }

    return (
        <form className={styles.login_form} onSubmit={handleSubmit} encType="multipart/form-data">
            {!!msgErro ? (<span className={styles.error}>{msgErro}</span>) : <></>}
            {!!msgSuccessfull ? (<span className={styles.successfully}>{msgSuccessfull}</span>) : <></>}
            <h2>Faça seu login</h2>
            <ContainerInputLabel
                type="email"
                children="Digite seu email:"    
                require id="email"
                handleChange={handleChange}
                name='email'
            />
            <ContainerInputLabel
                isPassword type="password"
                children="Digite sua senha"
                require id="password"
                handleChange={handleChange}
                name='senha'
            />
            <button type="submit">Entrar</button>
            <p>Ainda não tem cadastro?
                <Link style={{ color: '#03e0f0' }} to="/sign-up"> Cadastre-se</Link>
            </p>
            <p>AppCodePoster sua rede social dos codigos</p>
            {toggle && <Navigate to="/" />}
        </form>
    )
}

export default Login;
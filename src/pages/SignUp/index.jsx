import ContainerInputLabel from "components/BotaoRegistros";
import styles from "./SignUp.module.css";
import { useEffect, useState } from "react";
import { useValidations } from "hooks/useValidations";
import api from "config/configApi";
import { Link, Navigate } from 'react-router-dom';

const SignUp = () => {
    const { validate, validationsEmptPass } = useValidations()
    const initialValues = {
        nome: '',
        apelido: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [msgSuccesuful, setMsgSuccesuful] = useState('');
    const [msgErro, setMsgErro] = useState('');
    const [file, setFile] = useState(null);
    const [toggle, setToggle] = useState(false);
    /* função para enviar os dados do formulario para api */
    const postSignUp = async () => {
        try {
            const response = await api.postForm('/usuario/sign-up', formValues)
            setMsgErro('')
            setMsgSuccesuful(response.data.message)
            resetFieldForm();
            navegate();
        } catch (error) {
            setMsgSuccesuful('')
            setMsgErro(error.response.data.message)
        }
    };

    /* Navegar para pagina de logar */
    const navegate = () => {
        setInterval(() => {
            setTimeout(() => {
                setToggle(true)
            }, 1300)
        });
    }

    /* lidando com as mudanças no input para salvar e validar os campos */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setFormErrors(validationsEmptPass({ [name]: value }, formErrors));
    };

    /* função para zerar o formulario*/
    const resetFieldForm = () => {
        setFormValues({
            nome: '',
            apelido: '',
            email: '',
            senha: '',
            confirmarSenha: ''
        });
    };

    /* Lidando com o envio de formulario */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formErrors).length === 0 && !!file) {
            await postSignUp();
        };
    };

    /* Mapeando o file para adicionar erros caso esteja com campo de input vazio */
    useEffect(() => {
        if (!!file) setFormValues({ ...formValues, image: file });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    return (<form className={styles.cadastro_form} onSubmit={handleSubmit} encType="multipart/form-data">
        {!!msgSuccesuful ? <h2 className={styles.successfully}>{msgSuccesuful}</h2> : <></>}
        {!!msgErro ? <h2 className={styles.error}>{msgErro}</h2> : <></>}
        <h3>Registre-se!</h3>
        <ContainerInputLabel
            name='nome'
            valued={formValues.nome}
            min={6}
            children='Nome:'
            id="nome"
            handleChange={handleChange}
        />
        {!!formErrors.nome ? <span>{formErrors.nome}</span> : <></>}
        <ContainerInputLabel
            name='apelido'
            children='Diga seu Apelido:'
            id="apelido"
            valued={formValues.apelido}
            handleChange={handleChange}
        />
        {!!formErrors.apelido ? <span >{formErrors.apelido}</span> : <></>}
        <ContainerInputLabel
            name='email'
            valued={formValues.email}
            min={4}
            children='Email:'
            type="email"
            id="email"
            handleChange={handleChange}
        />
        {!!formErrors.email ? <span >{formErrors.email}</span> : <></>}
        <ContainerInputLabel
            name='senha'
            valued={formValues.senha}
            min={8}
            children='Digite uma senha:'
            type="password"
            id="senha"
            handleChange={handleChange}
            isPassword
        />
        {!!formErrors.senha ? <span >{formErrors.senha}</span> : <></>}
        <ContainerInputLabel
            name='confirmarSenha'
            valued={formValues.confirmarSenha}
            min={8}
            children='Confirme sua senha:'
            type="password"
            id="confirmarSenha"
            handleChange={handleChange}
            isPassword
        />
        {!!formErrors.confirmarSenha ? <span >{formErrors.confirmarSenha}</span> : <></>}
        <div className={styles.div_file}>
            <h3>Envie a foto do perfil</h3>
            <label htmlFor="foto">Anexar arquivo</label>
            <input
                type="file" id="foto"
                accept=".png, .jpeg, .jpg"
                onChange={e => setFile(e.target.files[0])}
                name="uploaded_file"
            />
        </div>
        {!file ? <span >{formErrors.image}</span> : <></>}
        <button onClick={() => { setFormErrors(validate(formValues)) }} type="submit">Cadastrar</button>
        <p>Já tem uma conta?
            <Link style={{ color: '#03e0f0' }} to="/login"> Faça login</Link>
        </p>
        <p>AppCodePoster sua rede social dos codigos</p>
        {toggle && <Navigate to='/login' />}
    </form >)
};

export default SignUp;
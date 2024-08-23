import styles from './Cabecalho.module.css';
import Imagem from './Imagem';
import logo from './image/Logo.png'
import { IoClose } from "react-icons/io5";
import InputPesquisa from '../Input_Pesquisa';
import { useContext } from 'react';
import { LuMenu } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { usePost } from 'hooks/usePost';
import { Link } from 'react-router-dom';
import { ControleContext } from 'contexts/ControleContexto';
import { CodigoContext } from 'contexts/CodigoContexto';

const Cabecalho = () => {
    const { userLogged } = useContext(CodigoContext);
    const {
        click,
        setClick,
        clickPesquisa,
        setClickPesquisa
    } = useContext(ControleContext);
    const { searchTitulo } = usePost();

    function clickMenu() {
        setClick((prev) => prev = !prev);
    }

    function clickInput() {
        setClickPesquisa((prev) => prev = !prev);
        if (click) setClick((prev) => prev = !prev);
    }

    return (clickPesquisa ? (<></>) :
        (<header className={styles.cabecalho} >
            <div className={styles.logo}>
                <Link to="/">
                    <Imagem src={logo} alt='logo alura' altura='35px' />
                </Link>
            </div>
            <div className={styles.container}>
                <InputPesquisa change={searchTitulo} placText='Busque por algo' text='text' stilos='pesquisa' />
                {clickPesquisa
                    ? <></>
                    : <FaSearch className={styles.lupa_span} onClick={clickInput} size={20} color='white' />
                }
                {click
                    ? <IoClose className={styles.menu_hamburguer} onClick={clickMenu} size={25} color='white' />
                    : <LuMenu className={styles.menu_hamburguer} onClick={clickMenu} size={25} color='white' />
                }
            </div>
            <div className={`${styles.perfil_lg_none} perfil`}>
                {
                    userLogged.status ? (
                        <>
                            <Imagem src={userLogged.data.id_image.url} alt='foto perfil' lg='foto' altura="25px" comprimento="35px" />
                            <p>{userLogged.data.apelido}</p>
                        </>
                    ) : (
                        <Link to="/sign-up" style={{ color: 'white' }}>Cadastre-se</Link>
                    )
                }
            </div>
        </header>)
    )
};

export default Cabecalho;
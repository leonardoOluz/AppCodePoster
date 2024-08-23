import Imagem from "components/Cabecalho/Imagem";
import CampoLista from "components/Campo_Lista";
import { useContext } from "react";
import styles from "./MenuFlutuante.module.css"
import { ControleContext } from "contexts/ControleContexto";
import { useConnectApi } from "hooks/useConnectApi";
import { CodigoContext } from "contexts/CodigoContexto";

const MenuFlutuante = () => {
    const { click } = useContext(ControleContext);
    const { userLogged } = useContext(CodigoContext);
    const { handleClickDeslogar } = useConnectApi()

    return (<>
        {click ? <span className={styles.menu_span}>
            <CampoLista />
            <button className='button_deslogar' onClick={handleClickDeslogar}>Deslogar</button>
            <div className={styles.container_usuario}>
                <Imagem src={userLogged.data.id_image.url} alt='foto perfil' lg='postagem' altura="25px" comprimento="35px" />
                <p>{userLogged.data.apelido}</p>
            </div>
        </span> : <></>}
    </>)
};

export default MenuFlutuante;
import styles from "./MenuNavegacao.module.css";
import Titulo from "components/Titulo";
import CampoLista from "components/Campo_Lista";
import { useConnectApi } from "hooks/useConnectApi";

const MenuNavegacao = () => {
    const {handleClickDeslogar} = useConnectApi()

    return (
        <aside className={styles.menu_navegacao}>
            <Titulo>Menu</Titulo>
            <CampoLista />
            <button className=' button_deslogar ' onClick={handleClickDeslogar}>Deslogar</button>
        </aside>
    )
}

export default MenuNavegacao;
import Cabecalho from "components/Cabecalho";
import ContainerDisplay from "components/ContainerDisplay";
import ContainerMain from "components/ContainerMain";
import InputFlutuante from "components/InputFlutuante";
import MenuFlutuante from "components/MenuFlutuante";
import MenuNavegacao from "components/Menu_Navegacao";
import styles from "./PaginaBase.module.css";
import { CodigoProvider } from "contexts/CodigoContexto";
import { ControleProvider } from "contexts/ControleContexto";
import { Outlet, useLocation } from "react-router-dom";

const PaginaBase = () => {
    let path = useLocation();
    return (
        <CodigoProvider>
            <ControleProvider>

                {
                    path.pathname === '/login' || path.pathname === '/sign-up'
                        ? (
                            <ContainerMain stylesCss>
                                <Outlet />
                            </ContainerMain>
                        )
                        : (
                            <div className={styles.paginaBase}>
                                <ContainerDisplay >
                                    <InputFlutuante />
                                    <Cabecalho />
                                    <MenuNavegacao />
                                    <ContainerMain>
                                        <Outlet />
                                    </ContainerMain>
                                    <MenuFlutuante />
                                </ContainerDisplay >
                            </div>
                        )
                }

            </ControleProvider>
        </CodigoProvider >
    )
};

export default PaginaBase;
import Cabecalho from "components/Cabecalho";
import ContainerDisplay from "components/ContainerDisplay";
import InputFlutuante from "components/InputFlutuante";
import MenuFlutuante from "components/MenuFlutuante";
import MenuNavegacao from "components/Menu_Navegacao";
import { CodigoProvider } from "contexts/CodigoContexto";
import { ControleProvider } from "contexts/ControleContexto";
import { Outlet } from "react-router-dom";

const PaginaBase = () => {
    return (
        <ContainerDisplay>
            <CodigoProvider>
                <ControleProvider>
                    <InputFlutuante />
                    <Cabecalho />
                    <MenuNavegacao />
                    <Outlet />
                    <MenuFlutuante />
                </ControleProvider>
            </CodigoProvider>
        </ContainerDisplay>
    )
};

export default PaginaBase;
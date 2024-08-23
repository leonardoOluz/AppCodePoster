import InputPesquisa from "components/Input_Pesquisa";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import styles from "./InputFlutuante.module.css";
import { usePost } from "hooks/usePost";
import { ControleContext } from "contexts/ControleContexto";

const InputFlutuante = () => {
    const { clickPesquisa, setClickPesquisa } = useContext(ControleContext);
    const {searchTitulo} = usePost();
    return (<>
        {clickPesquisa
            ? <span className={styles.input_span_code_edition}>
                <InputPesquisa change={searchTitulo} placText='Busque por algo' text='text' stilos='input_flutuante' />
                <IoClose onClick={() => { setClickPesquisa((prev) => prev = !prev) }} size={28} color='white' />
            </span>
            : <></>
        }
    </>
    )
}

export default InputFlutuante;
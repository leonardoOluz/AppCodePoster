/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import styles from "./PaginaNaoEncontrada.module.css";
import { useConnectApi } from "hooks/useConnectApi";

const PaginaNaoEncontrada = () => {
  const { acessTokenSessao } = useConnectApi();

  useEffect(() => {
    acessTokenSessao()
  }, [])

  return (<div className={styles.not_found}>
    <h2>Pagina não encontrada !</h2>
    <p>AppCodePoster sua rede social dos codigos</p>
  </div>)
};

export default PaginaNaoEncontrada;
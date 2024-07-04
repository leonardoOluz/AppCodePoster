import { Editor } from "@monaco-editor/react";
import styles from "./TextEditor.module.css";
import { useContext } from "react";
import { CodigoContext } from "contexts/CodigoContexto";

const TextEditor = ({ changed, valor, show }) => {
    const { linguagem } = useContext(CodigoContext)
    return (
        <Editor  
            className={styles.editor}
            value={valor}
            language={show ? linguagem : ""}
            theme="vs-dark"
            loading="Carregando..."
            onChange={changed}
        />
    )
};

export default TextEditor;
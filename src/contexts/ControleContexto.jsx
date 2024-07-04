const { createContext, useState, useEffect } = require("react");

export const ControleContext = createContext();
ControleContext.displayName = 'Controles';

export const ControleProvider = ({ children }) => {
    /* Variaveis de controle */
    const [show, setShow] = useState(false);
    const [click, setClick] = useState(false);
    const [clickPesquisa, setClickPesquisa] = useState(false);
    const [noCodeSpan, setNoCodeSpan] = useState(false);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight
    ])

    useEffect(() => {

        const windowSizeHandler = () => {
            setWindowSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener("resize", windowSizeHandler)

        setClickPesquisa((prev) => windowSize[0] > 767 ? prev = false : prev)

        return () => {
            window.removeEventListener("resize", windowSizeHandler)
        }

    }, [windowSize, setWindowSize, setClickPesquisa, clickPesquisa])

    return (<ControleContext.Provider
        value={{
            show,
            setShow,
            click,
            setClick,
            clickPesquisa,
            setClickPesquisa,
            noCodeSpan,
            setNoCodeSpan,
            windowSize,
            setWindowSize
        }}
    >
        {children}
    </ControleContext.Provider>)
};
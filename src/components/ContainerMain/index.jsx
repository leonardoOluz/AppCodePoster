import styles from './ContainerRegister.module.css'

const ContainerMain = ({ children, stylesCss = false }) => {
    return (<main className={stylesCss ? styles.main_login_sign_up : styles.ContainerMain}>
        {children}
    </main>)
}

export default ContainerMain;
import styles from './Cabecalho.module.css';
import Imagem from './Imagem';
import logo from './image/Logo.png'
import lupa from './image/Font Awesome Icon (1).png'
import menuHamburgue from './image/Menu hamburguer.png';

const Cabecalho = () => {
    return (
        <header className={styles.cabecalho}>
            <Imagem src={logo} alt='logo alura' altura='35px' />
            <div className={styles.container}>
                <input type='text' placeholder='Busque por algo' className={styles.pesquisa}/>
                <Imagem src={lupa} alt='lupa_pesquisa' altura='29px' newClass/>
                <Imagem src={menuHamburgue} alt='menu_hamburgue' altura='48px' />
            </div>
        </header>
    )
};

export default Cabecalho;
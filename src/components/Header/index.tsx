
import styles   from './Header.module.css'
import textLogo from '../../assets/LogoTrue.png'
import subtitleLogo from '../../assets/Logo Text True.png'
import { Link } from 'react-router-dom'

export const Header: React.FC = ()=>{

   

    return(

        <header className={styles.header}>

            <Link to='/' className={styles.buttonHome}>
                <img 
                    src={textLogo}
                    alt="logo criptApp"
                    className={styles.logo}
                />

                <img 
                    src={subtitleLogo}
                    alt="logo criptApp"
                    className={styles.logo}
                />
            </Link>



        </header>
    )
}
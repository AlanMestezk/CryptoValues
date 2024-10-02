import { Link }          from 'react-router-dom';
import styles            from './HomeApp.module.css'
import { RiSearch2Line } from "react-icons/ri";

export const HomeApp: React.FC = ()=>{

    return(

        <main className={styles.container}>


            <form className={styles.form}>

                <input 
                    type="text"
                    placeholder='Aqui você digita o nome da moeda... '
                    className={styles.input}
                />

                <button type='submit' className={styles.button}>

                    <RiSearch2Line size={30} color='red' className={styles.iconButton}/>

                </button>

            </form>

            <table>

                <thead>

                    <tr>

                        <th scope='col'>Nome</th>
                        <th scope='col'>Valor mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                        <th scope='col'>Mudança 24h</th>

                    </tr>

                </thead>

                <tbody id='tbody'>

                    <tr className={styles.tr}>

                        <td className={styles.tdLabel} data-label= 'Moeda'>

                            <div className={styles.name}>

                                <Link to='/detail/Bitcoin' className={styles.buttonCoin}>

                                    <span>Bitcoin</span> | BTC

                                </Link>

                            </div>

                        
                        </td>

                        <td className={styles.tdLabel} data-label= 'Valor Mercado'>
                            1T
                        </td>

                        <td className={styles.tdLabel} data-label= 'Preço'>
                            8.000
                        </td>

                        <td className={styles.tdLabel} data-label= 'Volume'>
                            2B
                        </td>

                        <td className={styles.tdProfit} data-label= 'Mudança 24h'>
                            <span>1.20</span>
                        </td>

                    </tr>

                </tbody>

            </table>

        </main>

    )
}
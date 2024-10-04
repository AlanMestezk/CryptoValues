import { Link, useNavigate }              from 'react-router-dom';
import styles                             from './styles/HomeApp.module.css' 
import { RiSearch2Line }                  from "react-icons/ri";
import { FormEvent, useEffect, useState } from 'react';

interface CoinPorps{

    id              : string,
    name            : string,
    rank            : string,
    suply           : string,
    symbol          : string,
    priceUsd        : string,
    vwap24Hr        : string,
    explorer        : string
    maxSuply        : string,
    marketCapUsd    : string,
    volumeUsd24Hr   : string
    changePercent24h: string,
}

interface DataProp{
    data: CoinPorps[]
}

export const HomeApp: React.FC = ()=>{

    const [input, setInput] = useState<string>("")
    //const [coins, setCoins] = useState<CoinPorps[]>([])

    const navigate = useNavigate()

    useEffect(

        ()=>{

            getData()

        }, []
    )

    const getData = async() =>{

        fetch('https://api.coincap.io/v2/assets?limit=10&offset=0')
        .then(response => response.json())
        .then(
            (data:DataProp)=>{
                
                const coinsData = data.data;

                console.log(coinsData)

                const price = Intl.NumberFormat(
                    "en-US",
                    {

                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2
                    }
                )

                const formatedResult = coinsData.map(

                    (item)=>{

                        const formated = {

                            ...item,
                            formatedPrice : price.format(Number(item.priceUsd))
                        }

                        return formated

                    }
                )

                console.log(formatedResult)

            }
        )

    }

    const handleSubmit = (event: FormEvent)=>{

        event.preventDefault()

        console.log(`Moeda ${input}$`)

        if(input === ''){

            alert("Campo obrigatório")
            return

        }else{
            navigate (`/detail/${input}`)
        }

    }

    

    const handleGetMore = ()=>{


       
    }

    return(

        <main className={styles.container}>


            <form className={styles.form} onSubmit={handleSubmit}>

                <input 
                    type="text"
                    placeholder='Aqui você digita o nome da moeda... '
                    className={styles.input}
                    value={input}
                    onChange={(e)=> setInput(e.target.value)}
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

            <button className={styles.buttonMore} onClick={handleGetMore}>More coin</button>

        </main>

    )
}
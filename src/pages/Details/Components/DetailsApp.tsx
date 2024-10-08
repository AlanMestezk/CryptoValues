import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles/Details.module.css'
import { useEffect, useState } from 'react'
import {CoinPorps} from '../../Home/Components/HomeApp'

interface ResponseData {

    data: CoinPorps
}

interface ErrorData{

    error: string
}

type DataProps = ResponseData | ErrorData

export const DetailApp: React.FC = ()=>{

    const {crypto} = useParams()
    const navigate = useNavigate()

    const [coin, setCoin] = useState<CoinPorps>()
    const [load, setLoad] = useState<boolean>(true)

    useEffect(
        ()=>{  

            const getIdCrypto = async ()=>{

                try {
                    
                    fetch(`https://api.coincap.io/v2/assets/${crypto}`)
                    .then(response => response.json())
                    .then((data: DataProps) => {
                        
                       if("error" in data){

                            navigate('/')
                            return;
                        }

                        const price = Intl.NumberFormat(
                            "en-US",
                            {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2
                            }
                        );
        
                        const priceCompact = Intl.NumberFormat(
                            "en-US",
                            {
                                style: "currency",
                                currency: "USD",
                                notation: 'compact',
                            }
                        );

                        let changePercentRaw = data.data.changePercent24Hr;

                        if (!changePercentRaw || changePercentRaw === '' || isNaN(parseFloat(changePercentRaw))) {
                            console.error(`Invalid changePercent24hr value for ${data.data.name}: ${changePercentRaw}`);
                            changePercentRaw = '0'; // Define um valor padrão de '0' se inválido
                        }

                        

                        if (!changePercentRaw || changePercentRaw === '' || isNaN(parseFloat(changePercentRaw))) {
                            console.error(`Invalid changePercent24hr value for ${data.data.name}: ${changePercentRaw}`);
                            changePercentRaw = '0'; // Define um valor padrão de '0' se inválido
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            changePercentRaw
                        }

                        const resultData = {
                            ...data.data,

                            ...data.data,
                            formatedPrice : price.format(Number(data.data.priceUsd)),
                            formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
                            formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr)),
                            changePercentRaw
                        }

                        setCoin(resultData)
                        setLoad(false)
                    })

                    
                } catch (error) {

                    console.error(`Ops ocorreu o erro: ${error}`)
                    navigate('/')
                }

            }

            getIdCrypto()

        }, [crypto, navigate]
    )

    if(load){
        return <div>Carregando...</div>
    }
    
    return(

        <main className={styles.container}>

            <section className={styles.sectionTitle}>

                <strong>{coin?.name}</strong>

                <strong>{coin?.symbol}</strong>

            </section>

            <section className={styles.sectionContent}>


                <div className={styles.divTitle}>

                    <h1>{coin?.name}</h1>
                    <img 
                        src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
                        alt="" 
                    />
                </div>

                <div className={styles.divdetails}>

                    <h2>Preço: {coin?.formatedPrice}</h2>
                    <h2>Valor mercado: {coin?.formatedMarket}</h2>
                    <h2>Volume: {coin?.formatedVolume}</h2>
                    

                </div>

            </section>



        </main>
    )
}
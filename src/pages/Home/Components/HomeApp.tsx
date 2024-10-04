/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate, /*useNavigate*/ }              from 'react-router-dom';
import styles                             from './styles/HomeApp.module.css';
import { RiSearch2Line }                  from "react-icons/ri";
import { FormEvent, useEffect, useState } from 'react';

interface CoinPorps{
    id               : string,
    name             : string,
    rank             : string,
    suply            : string,
    symbol           : string,
    priceUsd         : string,
    vwap24Hr         : string,
    explorer         : string,
    maxSuply         : string,
    marketCapUsd     : string,
    formatedPrice   ?: string,
    volumeUsd24Hr    : string,
    formatedMarket  ?: string,
    formatedVolume  ?: string,
    changePercent24Hr: string | null | undefined,
}

interface DataProp{
    data: CoinPorps[]
}

export const HomeApp: React.FC = ()=>{

    const [input,     setInput] = useState<string>("");
    const [coins,     setCoins] = useState<CoinPorps[]>([]);
    const [offset,   setOffset] = useState(0)
    const [message, setMessage] = useState<boolean >(false);

    const navigate = useNavigate();

    useEffect(
        () => {

            getData();

        }, [offset]
    );


    const getData = async() => {
        fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
        .then(response => response.json())
        .then(
            (data: DataProp) => {
                
                const coinsData = data.data;

                console.log(coinsData);

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

                const formatedResult = coinsData.map(
                    (item) => {
                        // Verifica se changePercent24hr é válido e tenta converter
                        let changePercentRaw = item.changePercent24Hr;

                        if (!changePercentRaw || changePercentRaw === '' || isNaN(parseFloat(changePercentRaw))) {
                            console.error(`Invalid changePercent24hr value for ${item.name}: ${changePercentRaw}`);
                            changePercentRaw = '0'; // Define um valor padrão de '0' se inválido
                        }

                        const changePercent = parseFloat(changePercentRaw);

                        const formated = {
                            ...item,
                            formatedPrice : price.format(Number(item.priceUsd)),
                            formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
                            formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
                            changePercent24hrs: changePercent
                        };

                        return formated;
                    }
                );
                
                const listCoins = [...coins, ...formatedResult]

                setCoins(listCoins);
            }
        );
    };

    const handleSubmit = (event: FormEvent) => {

        event.preventDefault();

        console.log(`Moeda ${input}$`);

        navigate(`/detail/${input}`);

        if(input === ''){
            setMessage(true)
        }else{
            setMessage(false)
        }
    };

    const handleGetMore = () => {
        
        if(offset === 0){
            setOffset(10)
            return
        }

        setOffset(offset + 10)

    };

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

                { 
                    message &&
                    <div className={styles.sectionMessage}>

                        <strong className={styles.text}>Primeiro digite a moeda desejada</strong> 

                    </div>
                }

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
                  {
                    coins.length > 0 && coins.map(
                        (item) => (
                            <tr className={styles.tr} key={item.id}>
                                <td className={styles.tdLabel} data-label='Moeda'>
                                    <div className={styles.name}>
                                        <img 
                                            className={styles.logoCoin}
                                            src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                                            alt="Crypto icon" 
                                        />
                                        <Link to={`/detail/${item.id}`} className={styles.buttonCoin}>
                                            <span>{item.name}</span> | {item.symbol}
                                        </Link>
                                    </div>
                                </td>

                                <td className={styles.tdLabel} data-label='Valor Mercado'>
                                    {item.formatedMarket}
                                </td>

                                <td className={styles.tdLabel} data-label='Preço'>
                                    {item.formatedPrice}
                                </td>

                                <td className={styles.tdLabel} data-label='Volume'>
                                    {item.formatedVolume}
                                </td>

                                <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} 
                                    data-label='Mudança 24h'
                                >
                                    {/* Converte changePercent24hr para string antes de renderizar */}
                                    <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                                </td>
                            </tr>
                        )
                    )
                  }
                </tbody>
            </table>

            <button className={styles.buttonMore} onClick={handleGetMore}>More coin</button>

        </main>
    );
};

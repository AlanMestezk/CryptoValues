import { useParams } from "react-router-dom"

export const NotFound: React.FC = ()=>{

    const {crypto} = useParams()

    return(
        <div>
            <h1>Error 404</h1>

            <h2>A moeda {crypto} não foi encontrada</h2>

            <strong>Not Found</strong>
        </div>
    )
}
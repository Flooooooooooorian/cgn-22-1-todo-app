import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import useDetailedTodo from '../hooks/useDetailedTodo'
import './DetailsPage.css'

export default function DetailsPage() {
    const {id} = useParams()

    const {detailedTodo, getTodoById} = useDetailedTodo()

    useEffect(() => {
        if (id) {
            getTodoById(id)
        }
    }, [id, getTodoById])

    return (
        <div className={"detail"}>
            <h2>TODO</h2>
            {detailedTodo &&
                <div >
                    <p className={"detail__description"}>
                        {detailedTodo.status} ({detailedTodo.id}){' '}
                    </p>
                    <p >{detailedTodo.description}</p>
                </div>}
        </div>
    )
}



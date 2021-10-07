import {useParams} from "react-router-dom";
import {getTodoBy} from "../service/todo-api-service";
import {useEffect, useState} from "react";
import styled from "styled-components/macro";

export default function DetailsPage() {

    const [todo, setTodo] = useState({})
    const {id} = useParams()

    useEffect(() => {
        getTodoBy(id)
            .then(response => response.data)
            .then(data => setTodo(data))
            .catch(error => console.error(error))

    }, [id])

    return (
        <Wrapper>
            <h2>TODO</h2>
            <SubTitle>{todo.status}  ({todo.id}) </SubTitle>
            <p>{todo.description}</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    text-align: center;
    margin: 12px;
`

const SubTitle = styled.p`
    font-style: italic;
    font-size: 90%;
`

import Board from "./Board";
import {useParams} from "react-router-dom";
import styled from "styled-components/macro";

export default function BoardPage({todos, onAdvance, onDelete}) {

    const {statusSlug} = useParams()

    const slugToStatus = {
        "open": 'OPEN',
        "in-progress": 'IN_PROGRESS',
        "done": "DONE"
    }

    const filteredTodos = todos.filter(todo => todo.status === slugToStatus[statusSlug])

    const statusToTitle = {
        "open": "Open",
        "in-progress": "In Progress",
        "done": "Done"
    }

    const title = statusToTitle[statusSlug]

    return (
        <Wrapper>
            <Board
                todos={filteredTodos}
                onAdvance={onAdvance}
                onDelete={onDelete}
                title={title}
            />
        </Wrapper>
    )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
`
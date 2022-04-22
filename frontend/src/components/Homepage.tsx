import BoardsOverview from './BoardsOverview'
import NewTodo from './NewTodo'
import {Todo} from "../model/Todo";

type HomepageProps = {
    todos: Todo[]
    onAdvance: (todo: Todo) => void
    onDelete: (id: string) => void
    onAdd: (description: string) => void
}

export default function Homepage({todos, onAdvance, onDelete, onAdd}: HomepageProps) {
    return (
        <>
            <BoardsOverview todos={todos} onAdvance={onAdvance} onDelete={onDelete}/>
            <NewTodo onAdd={onAdd}/>
        </>
    )
}

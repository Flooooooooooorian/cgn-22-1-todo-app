import TodoItem from './TodoItem'
import {Todo} from "../model/Todo";
import "./Board.css"

type BoardProps = {
    title: string
    todos: Todo[]
    onAdvance?: (todo: Todo) => void
    onDelete?: (id: string) => void
}


export default function Board({ title, todos, onAdvance, onDelete } : BoardProps) {
    return (
        <section className={"board"}>
            <div >
            <h2 className={"board-title"}>{title}</h2>
                {todos.map((todo: Todo) => {
                    return ( <TodoItem todo={todo} onAdvance={onAdvance} onDelete={onDelete} /> )
                })}
            </div>
        </section>
    )
}

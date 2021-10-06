import Board from "./Board";

export default function BoardPage({todos, status, onAdvance, onDelete}) {

    const filteredTodos = todos.filter(todo => todo.status === status)

    const statusToTitle = {
        OPEN: "Open",
        IN_PROGRESS: "In Progress",
        DONE: "Done"
    }

    const title = statusToTitle[status]

    return (
        <Board
            todos={filteredTodos}
            onAdvance={onAdvance}
            onDelete={onDelete}
            title={title}
        />
    )
};
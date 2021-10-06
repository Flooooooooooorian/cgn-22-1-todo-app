import BoardsOverview from "./BoardsOverview";
import NewTodo from "./NewTodo";

export default function Homepage({todos, onAdvance, onDelete, onAdd}) {
    return (
        <>
            <BoardsOverview
                todos={todos}
                onAdvance={onAdvance}
                onDelete={onDelete}
            />
            <NewTodo onAdd={onAdd}/>
        </>
    )
};
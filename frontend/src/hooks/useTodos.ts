import {useEffect, useState} from 'react'
import {deleteTodo, getTodos, postTodo, putTodo,} from '../service/todo-api-service'
import {getNextStatus} from '../service/todo-service'
import {Todo} from "../model/Todo";
import {toast} from "react-toastify";

export default function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (description: string) => {
        postTodo(description).then(addedTodo => setTodos([...todos, addedTodo]))
            .then(() => toast.success("Todo Added"))
            .catch((error) => toast.error(error))
    }

    const advanceTodo = (todo: Todo) => {
        const newStatus = getNextStatus(todo.status)
        const advancedTodo = {...todo, status: newStatus}
        putTodo(advancedTodo)
            .then(updatedTodo =>
                setTodos(
                    todos.map((item: Todo) => (updatedTodo.id === item.id ? advancedTodo : item))
                )
            )
            .then(() => toast.success("Todo advanced"))
            .catch((error) => toast.error(error))
    }

    const removeTodo = (id: string) => {
        deleteTodo(id)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .then(() => toast.success("Todo removed"))
            .catch((error) => toast.error(error))
    }

    useEffect(() => {
        getTodos()
            .then((todos) => setTodos(todos))
            .then(() => toast.success("Done"))
            .catch((error) => toast.error(error))
    }, [])

    return {todos, addTodo, advanceTodo, removeTodo}
}

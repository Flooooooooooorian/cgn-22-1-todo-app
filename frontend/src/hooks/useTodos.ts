import {useContext, useEffect, useState} from 'react'
import {deleteTodo, getTodos, postTodo, putTodo,} from '../service/todo-api-service'
import {getNextStatus} from '../service/todo-service'
import {Todo} from "../model/Todo";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthProvider";

export default function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const {token} = useContext(AuthContext);

    const addTodo = (description: string) => {
        postTodo(description, token).then(addedTodo => setTodos([...todos, addedTodo]))
            .then(() => toast.success("Todo Added"))
            .catch(() => toast.error("Error while adding todo!"))
    }

    const advanceTodo = (todo: Todo) => {
        const newStatus = getNextStatus(todo.status)
        const advancedTodo = {...todo, status: newStatus}
        putTodo(advancedTodo, token)
            .then(updatedTodo =>
                setTodos(
                    todos.map((item: Todo) => (updatedTodo.id === item.id ? advancedTodo : item))
                )
            )
            .then(() => toast.success("Todo advanced"))
            .catch(() => toast.error("Error while advancing todo!"))
    }

    const removeTodo = (id: string) => {
        deleteTodo(id, token)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .then(() => toast.success("Todo removed"))
            .catch(() => toast.error("Error while removing todo!"))
    }

    useEffect(() => {
        getTodos(token)
            .then((todos) => setTodos(todos))
            .then(() => toast.success("Done"))
            .catch(() => toast.error("Error while retrieving todos!"))
    }, [])

    return {todos, addTodo, advanceTodo, removeTodo}
}

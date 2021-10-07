import {useEffect, useState} from "react";
import {deleteTodo, getTodos, postTodo, putTodo} from "../service/todo-api-service";
import {getNextStatus} from "../service/todo-service";


export default function useTodos() {

    const [todos, setTodos] = useState([]);

    const addTodo = (description) => {
        postTodo(description)
            .then(addedTodo => setTodos([...todos, addedTodo]))
    }

    const advanceTodo = (todo) => {
        const newStatus = getNextStatus(todo.status)
        const advancedTodo = {...todo, status: newStatus}
        putTodo(advancedTodo)
            .then(updatedTodo =>
                setTodos(todos.map(item => updatedTodo.id === item.id ? advancedTodo : item)))
    }

    const removeTodo = (id) => {
        deleteTodo(id)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
    }

    useEffect(() => {
        getTodos()
            .then(todos => setTodos(todos))
    }, [])

    return {todos, addTodo, advanceTodo, removeTodo}
}
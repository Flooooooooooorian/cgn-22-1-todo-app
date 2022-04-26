import axios from 'axios'
import {Todo} from "../model/Todo";

export const getTodos: () => Promise<Todo[]> = () => {
    return axios.get<Todo[]>("/api/todo")
        .then(response => response.data)
}

export const postTodo: (newDescription: string) => Promise<Todo> = (newDescription) => {
    const newTodo: Todo = {
        id: "new",
        description: newDescription,
        status: 'OPEN',
    }

    return axios.post('/api/todo', newTodo)
        .then(response => response.data)
        .then((todo: Todo) => todo)
}

export const putTodo = (todo: Todo) => {
    return axios.put(`/api/todo/${todo.id}`, todo).then(response => response.data)
}

export const deleteTodo: (id: string) => Promise<void> = (id: string) => {
    return axios.delete(`/api/todo/${id}`)
}

export const getTodoBy = (id: string) => {
    return axios.get(`/api/todo/${id}`)
}

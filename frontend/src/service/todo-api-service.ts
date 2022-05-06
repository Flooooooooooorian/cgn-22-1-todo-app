import axios from 'axios'
import {Todo} from "../model/Todo";

export const getTodos: (token?: string) => Promise<Todo[]> = (token) => {
    return axios.get<Todo[]>("/api/todo", token
        ? {headers: {
                "Authorization": token,
            }}
        : {})
        .then(response => response.data)
}

export const postTodo: (newDescription: string, token?: string) => Promise<Todo> = (newDescription, token) => {
    const newTodo = {
        description: newDescription,
        status: 'OPEN',
    }

    return axios.post('/api/todo', newTodo, token
        ? {headers: {
                "Authorization": token,
            }}
        : {})
        .then(response => response.data)
        .then((todo: Todo) => todo)
}

export const putTodo = (todo: Todo, token?: string) => {
    return axios.put(`/api/todo/${todo.id}`, todo, token
        ? {headers: {
                "Authorization": token,
            }}
        : {}).then(response => response.data)
}

export const deleteTodo: (id: string, token?: string) => Promise<void> = (id: string, token) => {
    return axios.delete(`/api/todo/${id}`, token
        ? {headers: {
                "Authorization": token,
            }}
        : {})
}

export const getTodoBy = (id: string) => {
    return axios.get(`/api/todo/${id}`)
}

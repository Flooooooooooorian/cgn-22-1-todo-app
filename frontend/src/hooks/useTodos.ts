import {useEffect, useState} from 'react'
import {deleteTodo, getTodos, postTodo, putTodo,} from '../service/todo-api-service'
import {getNextStatus} from '../service/todo-service'
import {Todo} from "../model/Todo";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (description: string) => {
    postTodo(description).then(addedTodo => setTodos([...todos, addedTodo]))
  }

  const advanceTodo = (todo: Todo) => {
    const newStatus = getNextStatus(todo.status)
    const advancedTodo = { ...todo, status: newStatus }
    putTodo(advancedTodo)
        .then(updatedTodo =>
            setTodos(
                todos.map((item: Todo) => (updatedTodo.id === item.id ? advancedTodo : item))
      )
    )
  }

  const removeTodo = (id: string) => {
    deleteTodo(id).then(() => setTodos(todos.filter(todo => todo.id !== id)))
  }

  useEffect(() => {
    getTodos()
        .then((todos) => setTodos(todos))
        .catch(console.error)
  }, [])

  return { todos, addTodo, advanceTodo, removeTodo }
}

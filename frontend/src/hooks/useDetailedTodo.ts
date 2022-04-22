import { useState } from 'react'
import { getTodoBy } from '../service/todo-api-service'
import {Todo} from "../model/Todo";

export default function useDetailedTodo() {
  const [detailedTodo, setDetailedTodo] = useState<Todo>()

  const getTodoById = (id: string) => {
    getTodoBy(id)
      .then(response => response.data)
      .then(data => setDetailedTodo(data))
      .catch(error => console.error(error))
  }

  return { detailedTodo, getTodoById }
}

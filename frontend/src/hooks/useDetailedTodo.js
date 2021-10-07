import { useState } from 'react'
import { getTodoBy } from '../service/todo-api-service'

export default function useDetailedTodo() {
  const [detailedTodo, setDetailedTodo] = useState({})

  const getTodoById = id => {
    getTodoBy(id)
      .then(response => response.data)
      .then(data => setDetailedTodo(data))
      .catch(error => console.error(error))
  }

  return { detailedTodo, getTodoById }
}

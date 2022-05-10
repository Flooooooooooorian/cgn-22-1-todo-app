import {useContext, useState} from 'react'
import { getTodoBy } from '../service/todo-api-service'
import {Todo} from "../model/Todo";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthProvider";

export default function useDetailedTodo() {
  const [detailedTodo, setDetailedTodo] = useState<Todo>()
  const {token} = useContext(AuthContext)

  const getTodoById = (id: string) => {
    getTodoBy(id, token)
      .then(response => response.data)
      .then(data => setDetailedTodo(data))
      .catch(() => toast.error("Error while getting todo from server!"))
  }

  return { detailedTodo, getTodoById }
}

import { useNavigate } from 'react-router-dom'
import {Todo} from "../model/Todo";
import './TodoItem.css'

type TodoItemProps = {
  todo: Todo
  onAdvance?: (todo: Todo) => void
  onDelete?: (id: string) => void
}

export default function TodoItem({ todo, onAdvance, onDelete }: TodoItemProps) {
  const navigate = useNavigate()

  return (
    <div className={"todo-item"}>
      <h3>{todo.description}</h3>
      {onAdvance && <button onClick={() => onAdvance(todo)}>Advance</button>}
      {onDelete && <button onClick={() => onDelete(todo.id)}>Delete</button>}
      <button onClick={() => navigate(`/todo/${todo.id}`)}>Details</button>
    </div>
  )
}

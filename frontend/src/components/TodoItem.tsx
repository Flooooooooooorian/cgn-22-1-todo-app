import styled from 'styled-components/macro'
import { useNavigate } from 'react-router-dom'
import {Todo} from "../model/Todo";

type TodoItemProps = {
  todo: Todo
  onAdvance?: (todo: Todo) => void
  onDelete?: (id: string) => void
}

export default function TodoItem({ todo, onAdvance, onDelete }: TodoItemProps) {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <h3>{todo.description}</h3>
      {onAdvance && <button onClick={() => onAdvance(todo)}>Advance</button>}
      {onDelete && <button onClick={() => onDelete(todo.id)}>Delete</button>}
      <button onClick={() => navigate(`/todo/${todo.id}`)}>Details</button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 3px solid darkblue;
  background-color: ghostwhite;
  border-radius: 12px;
  padding: 12px;
  margin: 12px;
`

import styled from 'styled-components/macro'
import TodoItem from './TodoItem'
import {Todo} from "../model/Todo";

type BoardProps = {
  title: string
  todos: Todo[]
  onAdvance?: (todo: Todo) => void
  onDelete?: (id: string) => void
}



export default function Board({ title, todos, onAdvance, onDelete } : BoardProps) {
  return (
    <section>
      <h2>{title}</h2>
      <List>
        {todos.map((todo: Todo) => {
          return (
            <li key={todo.id}>
              <TodoItem todo={todo} onAdvance={onAdvance} onDelete={onDelete} />
            </li>
          )
        })}
      </List>
    </section>
  )
}

const List = styled.ul`
  list-style: none;
  padding: 0;
`

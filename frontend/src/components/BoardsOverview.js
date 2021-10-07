import styled from 'styled-components/macro'
import Board from './Board'

export default function BoardsOverview({ todos, onAdvance, onDelete }) {
  const openTodos = todos.filter(todo => todo.status === 'OPEN')
  const inProgressTodos = todos.filter(todo => todo.status === 'IN_PROGRESS')
  const doneTodos = todos.filter(todo => todo.status === 'DONE')

  return (
    <Main>
      <Board title="Open" todos={openTodos} onAdvance={onAdvance} />
      <Board
        title="In Progress"
        todos={inProgressTodos}
        onAdvance={onAdvance}
      />
      <Board title="Done" todos={doneTodos} onDelete={onDelete} />
    </Main>
  )
}

const Main = styled.main`
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
`

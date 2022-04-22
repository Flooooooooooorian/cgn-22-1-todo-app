import "./BoardsOverview.css"
import Board from './Board'
import {Todo} from "../model/Todo";

type BoardsOverviewProps = {
    todos: Todo[]
    onAdvance: (todo: Todo) => void
    onDelete: (id: string) => void
}

export default function BoardsOverview({ todos, onAdvance, onDelete }: BoardsOverviewProps) {
  const openTodos = todos.filter(todo => todo.status === 'OPEN')
  const inProgressTodos = todos.filter(todo => todo.status === 'IN_PROGRESS')
  const doneTodos = todos.filter(todo => todo.status === 'DONE')

  return (
    <main>
      <Board title="Open" todos={openTodos} onAdvance={onAdvance} />
      <Board
        title="In Progress"
        todos={inProgressTodos}
        onAdvance={onAdvance}
      />
      <Board title="Done" todos={doneTodos} onDelete={onDelete} />
    </main>
  )
}


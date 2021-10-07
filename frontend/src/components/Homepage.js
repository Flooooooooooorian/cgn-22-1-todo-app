import BoardsOverview from './BoardsOverview'
import NewTodo from './NewTodo'
import PropTypes from 'prop-types'

Homepage.propTypes = {
  todos: PropTypes.array.isRequired,
  onAdvance: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default function Homepage({ todos, onAdvance, onDelete, onAdd }) {
  return (
    <>
      <BoardsOverview todos={todos} onAdvance={onAdvance} onDelete={onDelete} />
      <NewTodo onAdd={onAdd} />
    </>
  )
}

import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

TodoItem.propTypes = {
  todos: PropTypes.array,
  onAdvance: PropTypes.func,
  onDelete: PropTypes.func,
}

export default function TodoItem({ todo, onAdvance, onDelete }) {
  const history = useHistory()

  return (
    <Wrapper>
      <h3>{todo.description}</h3>
      {onAdvance && <button onClick={() => onAdvance(todo)}>Advance</button>}
      {onDelete && <button onClick={() => onDelete(todo.id)}>Delete</button>}
      <button onClick={() => history.push(`/todo/${todo.id}`)}>Details</button>
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

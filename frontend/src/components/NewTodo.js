import styled from 'styled-components/macro'
import { useState } from 'react'
import PropTypes from 'prop-types'

NewTodo.propTypes = {
  onAdd: PropTypes.func.isRequired,
}

export default function NewTodo({ onAdd }) {
  const [description, setDescription] = useState('')

  const handleClick = event => {
    event.preventDefault()
    if (!description) {
      return
    }
    onAdd(description)
    setDescription('')
  }

  return (
    <Form onSubmit={handleClick}>
      <Input
        placeholder="Add a description..."
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <Button>Add</Button>
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
  justify-items: center;
  margin-bottom: 18px;
`

const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  width: 80%;
  justify-self: end;
`

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
`

import styled from 'styled-components/macro'
import { useState } from 'react'
import PropTypes from 'prop-types'

NewTodo.propTypes = {
  onAdd: PropTypes.func.isRequired,
}

export default function NewTodo({ onAdd }) {
  const [description, setDescription] = useState('')

  const handleClick = () => {
    onAdd(description)
    setDescription('')
  }

  return (
    <FooterStyled>
      <Input
        placeholder="Add a description..."
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <Button onClick={handleClick}>Add</Button>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
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

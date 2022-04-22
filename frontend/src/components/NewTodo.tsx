import styled from 'styled-components/macro'
import {FormEvent, useState} from 'react'


type NewTodoProps = {
  onAdd: (description: string) => void
}

export default function NewTodo({ onAdd } : NewTodoProps) {
  const [description, setDescription] = useState('')

  const handleClick = (event: FormEvent<HTMLFormElement>) => {
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

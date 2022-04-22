import {FormEvent, useState} from 'react'
import './NewTodo.css'


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
    <form onSubmit={handleClick} className={"add-form"}>
      <input className={"description-input"}
        placeholder="Add a description..."
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <button className={"add-button"}> Add </button>
    </form>
  )
}



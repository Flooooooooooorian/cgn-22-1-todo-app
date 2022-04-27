import {FormEventHandler, useState} from 'react'
import './NewTodo.css'


type NewTodoProps = {
  onAdd: (description: string) => void
}

export default function NewTodo({ onAdd } : NewTodoProps) {
  const [description, setDescription] = useState('')

  const handleClick: FormEventHandler = (event) => {
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
      <button type={"submit"} className={"add-button"}> Add </button>
    </form>
  )
}



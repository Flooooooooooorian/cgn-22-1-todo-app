import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import styled from 'styled-components/macro'
import useDetailedTodo from '../hooks/useDetailedTodo'

export default function DetailsPage() {
  const { id } = useParams()

  useEffect(() => {
    getTodoById(id)
  }, [])

  const { detailedTodo, getTodoById } = useDetailedTodo()

  return (
    <Wrapper>
      <h2>TODO</h2>
      <SubTitle>
        {detailedTodo.status} ({detailedTodo.id}){' '}
      </SubTitle>
      <p>{detailedTodo.description}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 12px;
`

const SubTitle = styled.p`
  font-style: italic;
  font-size: 90%;
`

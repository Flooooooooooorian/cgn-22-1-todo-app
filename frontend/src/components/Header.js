import styled from 'styled-components/macro'

export default function Header() {
  return (
    <HeaderStyled>
      <h1>Super Todo App</h1>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  text-align: center;
`

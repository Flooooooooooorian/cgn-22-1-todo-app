import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export default function NavigationBar() {
  return (
    <Wrapper>
      <NavLinkStyled to="/" exact>
        Home
      </NavLinkStyled>
      <NavLinkStyled to="/todos/open">Open</NavLinkStyled>
      <NavLinkStyled to="/todos/in-progress">In Progress</NavLinkStyled>
      <NavLinkStyled to="/todos/done">Done</NavLinkStyled>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 1.2em;

  .active {
    color: red;
  }
`

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
`

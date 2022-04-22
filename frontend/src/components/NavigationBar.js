import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export default function NavigationBar() {
  return (
    <Wrapper>
      <NavLinkStyled to="/" exact>
        Home
      </NavLinkStyled>
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

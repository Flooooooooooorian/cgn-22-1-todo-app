import {NavLink} from "react-router-dom";
import styled from "styled-components/macro";

export default function NavigationBar() {
    return (
        <Wrapper>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/todos/open">Open</NavLink>
            <NavLink to="/todos/in-progress">In Progress</NavLink>
            <NavLink to="/todos/done">Done</NavLink>
        </Wrapper>
    )
};

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
`
import {NavLink} from "react-router-dom";
import './NavigationBar.css'

export default function NavigationBar() {
  return (
    <div className={"navigation-bar"}>
      <NavLink to="/" className={"nav-link"}>
        Home
      </NavLink>
    </div>
  )
}



import { useState } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import NavItem from "./NavItem";

const Nav = () => {
  const [active, setActive] = useState<string>("home");

  return (
    <nav>
      <ul className="mt-2">
        <NavItem eventKey="home" active={active} setActive={setActive} to="/">
          <FaHome color="white" size={24} />
        </NavItem>
        <NavItem
          eventKey="planner"
          active={active}
          setActive={setActive}
          to="/planner"
        >
          <BsCalendar3 color="white" size={24} />
        </NavItem>
      </ul>
    </nav>
  );
};

export default Nav;

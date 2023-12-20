import { Link, LinkProps } from "react-router-dom";

interface NavItemProps extends LinkProps {
  eventKey: string;
  active: string;
  setActive: (key: string) => void;
  children: React.ReactNode;
}

const NavItem = ({
  eventKey,
  active,
  setActive,
  children,
  ...rest
}: NavItemProps) => {
  const clickHandler = () => {
    setActive(eventKey);
  };

  return (
    <li className={`p-2 my-2 ${active === eventKey && "bg-oxford_blue-300"}`}>
      <Link onClick={clickHandler} {...rest}>
        {children}
      </Link>
    </li>
  );
};

export default NavItem;

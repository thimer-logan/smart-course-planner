import React, { useState } from "react";
import { Outlet, Link, LinkProps } from "react-router-dom";
import { Nav, Sidenav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";

interface NavLinkProps extends Omit<LinkProps, "to"> {
  href: string;
  children: React.ReactNode;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, children, ...rest }, ref) => (
    <Link ref={ref} to={href} {...rest}>
      {children}
    </Link>
  )
);

const Layout = () => {
  const [active, setActive] = useState<string>("planner");
  return (
    <div className="flex h-screen">
      <div className="w-60 bg-oxford_blue">
        <Sidenav>
          <Sidenav.Body>
            <Nav vertical activeKey={active} onSelect={setActive}>
              <Nav.Item
                as={NavLink}
                href="/"
                eventKey="planner"
                icon={<HomeIcon />}
              >
                Planner
              </Nav.Item>
              <Nav.Item eventKey="news">News</Nav.Item>
              <Nav.Item eventKey="solutions">Solutions</Nav.Item>
              <Nav.Item eventKey="products">Products</Nav.Item>
              <Nav.Item eventKey="about">About</Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const dispatch = useDispatch();
  const handleLogoutAction = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="md" sticky="top">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Expenditure tracker logo"
            />{" "}
            Expenditure Tracker
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="mr-auto">
          {user && user.token && (
              <LinkContainer to="group">
                <Nav.Link>
                  Group
                </Nav.Link>
              </LinkContainer>
            )}
            {user && user.token && (
              <LinkContainer to="item-list">
                <Nav.Link>
                  Item
                </Nav.Link>
              </LinkContainer>
            )}
            {user && user.token && (
              <Nav.Link onClick={handleLogoutAction}>
                Logout
                <ExitToAppIcon />
              </Nav.Link>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const { cartList } = useSelector((state) => state.cartList);
  const noAuthCart = useSelector((state) => state.noAuthCart);
  const dispatch = useDispatch();
  const handleLogoutAction = () => {
    dispatch(logout());
  };
  let cartItems;
  if (user) {
    cartItems = user.cartItems;
  } else {
    cartItems = localStorage.getItem("thevickyk.com-cartItems")
      ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
      : null;
  }
  useEffect(() => {
    if (user) {
      cartItems = user.cartItems;
    } else {
      cartItems = localStorage.getItem("thevickyk.com-cartItems")
        ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
        : null;
    }
  }, [cartList, noAuthCart]);
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
              alt="React Bootstrap logo"
            />{" "}
            thevickyk.com
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="mr-auto">
            {user && user.token && (
              <Nav.Link onClick={handleLogoutAction}>
                Logout
                <ExitToAppIcon />
              </Nav.Link>
            )}
            {/* {user && user.token && (
              <LinkContainer to="account">
                <Nav.Link>
                  Account <PersonIcon />
                </Nav.Link>
              </LinkContainer>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

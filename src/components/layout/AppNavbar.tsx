import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const AppNavbar = () => {
  const { totalItems } = useCart();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Sembark
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <div className="d-flex gap-3">
          <Nav.Link as={Link} to="/">
            Products
          </Nav.Link>

          <Nav.Link as={Link} to="/cart">
            <FaShoppingCart size={20} />
            <Badge bg="danger" className="ms-2">
              {totalItems}
            </Badge>
          </Nav.Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
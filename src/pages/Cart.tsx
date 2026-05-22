import {
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import type { SyntheticEvent } from "react";
import { formatCurrency } from "../utils/currency";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
  } = useCart();

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
  };

  return (
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <FaShoppingCart size={80} className="text-muted mb-4" />

              <h3 className="fw-bold mb-3">Your Cart is Empty</h3>

              <p className="text-muted mb-4">
                Looks like you haven't added anything to your cart yet.
              </p>

              <Link to="/" className="btn btn-dark btn-lg px-5">
                Shop Now
              </Link>
            </div>
          ) : (
            <Row>
              <Col md={8}>
                {cart.map((item) => (
                  <Card className="mb-3 shadow-sm" key={item.id}>
                    <Card.Body>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={item.images?.[0] || "https://placehold.co/600x600?text=No+Image"}
                          onError={handleImageError}
                          width={100}
                          height={100}
                          style={{ objectFit: "cover" }}
                          loading="lazy"
                        />

                        <div className="flex-grow-1">
                          <h5>{item.title}</h5>

                          <p>{formatCurrency(item.price)}</p>

                          <div className="d-flex gap-2 align-items-center">
                            <Button
                              variant="dark"
                              onClick={() =>
                                decreaseQty(item.id)
                              }
                            >
                              -
                            </Button>

                            <span>{item.quantity}</span>

                            <Button
                              variant="dark"
                              disabled={item.quantity >= 5}
                              onClick={() =>
                                increaseQty(item.id)
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        <Button
                          variant="danger"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Col>

              <Col md={4}>
                <Card className="shadow border-0">
                  <Card.Body>
                    <h4>Order Summary</h4>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <span>Total</span>

                      <strong>
                        {formatCurrency(totalPrice)}
                      </strong>
                    </div>

                    <Button
                      className="w-100 mt-4"
                      variant="dark"
                    >
                      Checkout
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </motion.div>
      </Container>
  );
};

export default Cart;
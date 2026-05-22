import { Button, Card } from "react-bootstrap";
import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { SyntheticEvent } from "react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/currency";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }} className="h-100">
      <Card as={Link} to={`/product/${product.id}`} className="border-0 shadow-sm h-100 product-card text-decoration-none">
        <Card.Img
          variant="top"
          src={product.images?.[0] || "https://placehold.co/600x600?text=No+Image"}
          onError={handleImageError}
          style={{ height: 300, objectFit: "cover" }}
          className="product-image"
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.title}</Card.Title>

          <p className="text-muted small mb-1">
            {product.category.name}
          </p>

          <h5 className="fw-bold mb-3">
            {formatCurrency(product.price)}
          </h5>

          <div className="d-flex gap-2 mt-auto">
            <Button
              variant="dark"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
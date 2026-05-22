import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api/productApi";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";
import { motion } from "framer-motion";
import { Button, Carousel, Container, Row, Col, Card } from "react-bootstrap";
import Loader from "../components/common/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // For handling image error
  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
  };


  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getSingleProduct(id!);

      setProduct(response);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return null;
  }

  return (
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Row className="align-items-center g-5">
            <Col md={6}>
              <Card className="rounded-4 shadow overflow-hidden border-0 object-fit-cover h-75">
              <Carousel variant="dark" interval={null}>
                {(product.images && product.images.length > 0
                  ? product.images
                  : ["https://placehold.co/600x600?text=No+Image"]
                ).map((image: string, index: number) => (
                  <Carousel.Item key={index}>
                    <img
                      src={image}
                      onError={handleImageError}
                      className="img-fluid d-block w-100"
                      alt={`${product.title} - ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              </Card>
            </Col>

            <Col md={6}>
              <p className="text-muted text-uppercase fw-semibold">
                {product.category.name}
              </p>

              <h1 className="fw-bold mb-3">
                {product.title}
              </h1>

              <h2 className="mb-4 text-dark fw-bold">
                {formatCurrency(product.price)}
              </h2>

              <p className="text-secondary lh-lg">
                {product.description}
              </p>

              <Button
                variant="dark"
                size="lg"
                className="mt-3 px-5"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </Button>
            </Col>
          </Row>
        </motion.div>
      </Container>
  );
};

export default ProductDetail;
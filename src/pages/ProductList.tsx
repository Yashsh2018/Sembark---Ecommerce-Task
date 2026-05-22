import { useMemo } from "react";
import type { ChangeEvent } from "react";
import {
  Col,
  Container,
  Form,
  Pagination,
  Row,
} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import Loader from "../components/common/Loader";
import { useProducts } from "../hooks/useProducts";

const ProductList = () => {
  const { products, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const selectedCategories = useMemo(() => {
    const cats = searchParams.get("categories");
    return cats ? cats.split(",") : [];
  }, [searchParams]);

  const limit = 12;

  /* For categories */
  const categories = useMemo(() => {
    const allCategories = products
      .map((p) => p.category?.name)
      .filter(Boolean);
    return Array.from(new Set(allCategories));
  }, [products]);
/* For categories */
 

  const updateParams = (
    newParams: Record<string, string | null>,
    replace = false
  ) => {
    const current = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });
    setSearchParams(current, { replace });
  };

  /* for search bar */
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateParams({ search: e.target.value, page: "1" }, true);
  };
  /* for search bar */

  /* for sort */
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateParams({ sort: e.target.value, page: "1" }, false);
  };
  /* for sort */

  /* for category */
  const handleCategoryChange = (category: string, checked: boolean) => {
    const nextCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);

    updateParams(
      {
        categories: nextCategories.length > 0 ? nextCategories.join(",") : null,
        page: "1",
      },
      false
    );
  };

  // For pagination
  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) }, false);
  };

  // For filtering products based on search, categories and sort
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      data = data.filter(
        (item) =>
          item.category &&
          selectedCategories.includes(item.category.name)
      );
    }

    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [products, search, selectedCategories, sort]);

  const totalPages = Math.ceil(filteredProducts.length / limit);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
      <Container className="py-4">
        <Row>
          <Col md={3} className="mb-4">
            <h5 className="mb-3">Categories</h5>
            {categories.map((category) => (
              <Form.Check
                key={category}
                type="checkbox"
                id={`category-${category}`}
                label={category}
                checked={selectedCategories.includes(category)}
                onChange={(e) =>
                  handleCategoryChange(category, e.target.checked)
                }
                className="mb-2"
              />
            ))}
          </Col>

          <Col md={9}>
            <Row className="mb-4">
              <Col md={8}>
                <Form.Control
                  placeholder="Search products..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </Col>

              <Col md={4}>
                <Form.Select
                  value={sort}
                  onChange={handleSortChange}
                >
                  <option value="">Sort By</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </Form.Select>
              </Col>
            </Row>

            {loading ? (
              <Loader />
            ) : (
              <>
                <Row className="g-4">
                  {paginatedProducts.map((product) => (
                    <Col md={4} key={product.id}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>

                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination>
                      {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                          active={page === index + 1}
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
  );
};

export default ProductList;
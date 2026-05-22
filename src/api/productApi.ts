import axios from "axios";

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

/* For getting products */
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

/* For getting single product */
export const getSingleProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
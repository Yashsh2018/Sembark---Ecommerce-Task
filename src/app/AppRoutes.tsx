import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import MainLayout from "../components/layout/MainLayout";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />} >
                    {/* Root route - renders ProductList */}
                    <Route
                        index
                        path="/"
                        element={<ProductList />}
                    />

                    {/* Product detail route */}
                    <Route
                        index
                        path="/product/:id"
                        element={<ProductDetail />}
                    />

                    {/* Cart route */}
                    <Route
                        index
                        path="/cart"
                        element={<Cart />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
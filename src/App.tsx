import AppRoutes from "./app/AppRoutes"
import { CartProvider } from "./context/CartContext"
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {

  return (
   <CartProvider>
      <AppRoutes />
    </CartProvider>
     
  )
}

export default App


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppIcon from "./components/WhatsAppIcon";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import OrderHistory from "./pages/OrderHistory";
import { CartProvider } from "./context/CartContext"; 
function App() {
  return (
    <Router>
      <CartProvider> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <WhatsAppIcon/>
        <Footer />
      </CartProvider>
    </Router>
  );
}
export default App;
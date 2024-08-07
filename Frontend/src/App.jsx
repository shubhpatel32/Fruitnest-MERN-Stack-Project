import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';
import About from './Pages/About/About';
import Review from './Pages/Review/Review';
import Blog from './Pages/Blog/Blog';
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Login/Login';
import Cart from './Pages/Cart/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import Signup from './Pages/SignUp/Signup';
import Error from './Pages/Error/Error';
import Logout from './Pages/Logout/Logout';
import { Profile } from './Pages/Profile/Profile';
import Order from './Pages/Order/Order';


function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <CartProvider>
          <Header />
          <Routes>
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/shop" element={<Shop />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/review" element={<Review />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/order" element={<Order />} />
            <Route exact path="*" element={<Error />} />
          </Routes>
          <Footer />
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;

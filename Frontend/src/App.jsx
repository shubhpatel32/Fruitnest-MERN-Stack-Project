import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import ProtectedRoute from './Pages/ProtectedRoute';

const Home = lazy(() => import('./Pages/Home/Home'));
const Shop = lazy(() => import('./Pages/Shop/Shop'));
const About = lazy(() => import('./Pages/About/About'));
const Review = lazy(() => import('./Pages/Review/Review'));
const Blog = lazy(() => import('./Pages/Blog/Blog'));
const Contact = lazy(() => import('./Pages/Contact/Contact'));
const Login = lazy(() => import('./Pages/Login/Login'));
const Signup = lazy(() => import('./Pages/SignUp/Signup'));
const Error = lazy(() => import('./Pages/Error/Error'));
const Logout = lazy(() => import('./Pages/Logout/Logout'));
const Profile = lazy(() => import('./Pages/Profile/Profile'));
const Order = lazy(() => import('./Pages/Order/Order'));
const MyOrders = lazy(() => import('./Pages/MyOrders/MyOrders'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));

function App() {

  return (
    <div>
      <Router>
        <ScrollToTop />
        <CartProvider>
          <Header />
          <Suspense fallback="loading...">
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/shop" element={<Shop />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/review" element={<Review />} />
              <Route exact path="/blog" element={<Blog />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/logout" element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/order" element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              } />
              <Route path="/myorder" element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              } />
              <Route exact path="*" element={<Error />} />
            </Routes>
            <Footer />
          </Suspense>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;

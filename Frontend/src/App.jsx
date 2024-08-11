import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import ProtectedRoute from './Pages/ProtectedRoute';
import AdminLayout from './Components/Layouts/AdminLayout';
import AdminUsers from './Pages/Admin/AdminUsers';
import AdminReviews from './Pages/Admin/AdminReviews';
import AdminOrders from './Pages/Admin/AdminOrders';
import AdminFruits from './Pages/Admin/AdminFruits';
import AdminBlogs from './Pages/Admin/AdminBlogs';
import AdminGallery from './Pages/Admin/AdminGallery';

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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/review" element={<Review />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order" element={<Order />} />
                <Route path="/myorder" element={<MyOrders />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="reviews" element={<AdminReviews />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="fruits" element={<AdminFruits />} />
                  <Route path="gallery" element={<AdminGallery />} />
                  <Route path="blogs" element={<AdminBlogs />} />
                </Route>
              </Route>


              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </Suspense>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;

import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ScrollToTop from './Components/ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import ProtectedRoute from './Pages/ProtectedRoute';

const EditBlog = lazy(() => import('./Pages/Admin/EditBlog'));
const AdminLayout = lazy(() => import('./Components/AdminLayout'));
const AdminUsers = lazy(() => import('./Pages/Admin/AdminUsers'));
const AdminReviews = lazy(() => import('./Pages/Admin/AdminReviews'));
const AdminOrders = lazy(() => import('./Pages/Admin/AdminOrders'));
const AdminFruits = lazy(() => import('./Pages/Admin/AdminFruits'));
const AdminBlogs = lazy(() => import('./Pages/Admin/AdminBlogs'));
const AdminGallery = lazy(() => import('./Pages/Admin/AdminGallery'));
const Home = lazy(() => import('./Pages/Home'));
const Shop = lazy(() => import('./Pages/Shop'));
const About = lazy(() => import('./Pages/About'));
const Review = lazy(() => import('./Pages/Review'));
const Blog = lazy(() => import('./Pages/Blog'));
const Contact = lazy(() => import('./Pages/Contact'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/Signup'));
const Error = lazy(() => import('./Pages/Error'));
const Logout = lazy(() => import('./Pages/Logout'));
const Profile = lazy(() => import('./Pages/Profile'));
const EditProfile = lazy(() => import('./Pages/EditProfile'));
const Order = lazy(() => import('./Pages/Order'));
const MyOrders = lazy(() => import('./Pages/MyOrders'));
const Cart = lazy(() => import('./Pages/Cart'));

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
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/order" element={<Order />} />
                <Route path="/myorder" element={<MyOrders />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="reviews" element={<AdminReviews />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="gallery" element={<AdminGallery />} />
                  <Route path="fruits" element={<AdminFruits />} />
                  <Route path="blogs" element={<AdminBlogs />} />
                  <Route path="blogs/edit/:id" element={<EditBlog />} />
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

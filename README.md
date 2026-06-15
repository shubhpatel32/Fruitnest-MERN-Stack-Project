# Fruitnest

Fruitnest is a full-stack fruit e-commerce web application with a React frontend and an Express/MongoDB backend. It provides user authentication, product browsing, shopping cart, order checkout, Razorpay integration, admin management, blog and gallery features, review submission, and order invoice generation.

## Project Structure

- `Backend/`: Express API and MongoDB models for authentication, products, cart, orders, blogs, gallery, reviews, and admin management.
- `Frontend/`: React + Vite web application with public landing pages, shop, cart, order checkout, profile, and admin dashboards.

## Core Functionality

### User Experience
- User signup and login with JWT authentication.
- Password reset flow via email.
- Browse fruit products on the shop page.
- Search fruit items by name.
- Add/remove items in cart with quantity controls.
- Place orders with address form.
- Payment via Razorpay or cash on delivery.
- View order history and order status.
- Download PDF invoice for orders.
- Profile page for viewing and navigating to edit user details.

### Shop & Products
- Retrieve fruit product data from backend API.
- Display product image, name, price, and stock availability.
- Prevent adding items beyond available stock.
- Show out-of-stock state on product cards.

### Cart
- Persistent cart state while user is logged in.
- Increment/decrement item quantities.
- Remove items from cart.
- Checkout cart to place an order.

### Orders
- Place orders with `Razorpay` integration and payment verification.
- Save orders in MongoDB.
- Cancel orders and restore stock.
- Send order confirmation and cancellation emails.
- Generate and download invoice PDFs.

### Admin Panel
- Admin-protected dashboard for managing:
  - Users
  - Orders
  - Fruits
  - Blogs
  - Gallery items
  - Reviews
- Admin routes support adding, updating, deleting, and fetching resources.
- Upload images through Cloudinary for fruits, blogs, and gallery.

### Blog, Gallery, Reviews
- Public blog listing page.
- Public gallery listing page.
- Review form submission and review listing.
- Admin moderation for blog posts, gallery items, and reviews.

## Backend Features

### API Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/user`
- `PATCH /api/auth/user/update`
- `GET /api/fruit/data`
- `GET /api/blog/data`
- `GET /api/gallery/data`
- `GET /api/review/data`
- `POST /api/review/form`
- `POST /api/cart/data`
- `POST /api/cart/add`
- `POST /api/cart/remove`
- `POST /api/cart/delete`
- `POST /api/order/place`
- `GET /api/order/show`
- `POST /api/order/cancel`
- `POST /api/order/verify`
- `POST /api/order/cancel-razorpay`
- `GET /api/order/invoice/:orderId`

### Admin Routes
- `GET /api/admin/users`
- `GET /api/admin/users/:id`
- `PATCH /api/admin/users/update/:id`
- `DELETE /api/admin/users/delete/:id`
- `GET /api/admin/fruits`
- `POST /api/admin/fruits/add`
- `GET /api/admin/fruits/:id`
- `PATCH /api/admin/fruits/update/:id`
- `DELETE /api/admin/fruits/delete/:id`
- `GET /api/admin/blogs`
- `POST /api/admin/blogs/add`
- `GET /api/admin/blogs/:id`
- `PATCH /api/admin/blogs/update/:id`
- `DELETE /api/admin/blogs/delete/:id`
- `GET /api/admin/gallery`
- `POST /api/admin/gallery/add`
- `DELETE /api/admin/gallery/delete/:id`
- `GET /api/admin/orders`
- `GET /api/admin/orders/:id`
- `PATCH /api/admin/orders/update/:id`
- `DELETE /api/admin/orders/delete/:id`
- `GET /api/admin/reviews`
- `DELETE /api/admin/reviews/delete/:id`

## Frontend Features

### Public Pages
- Home page with slideshow, banners, and latest blog highlights.
- Shop page for browsing fruits with search and add-to-cart interactions.
- Review page for customer reviews.
- Blog page for articles and blog listings.
- Contact page.
- About page.
- Error page for undefined routes.

### Protected Pages
- Cart page for viewing selected items and checkout.
- Order page for address and payment details.
- My Orders page for order history, cancellation, and invoice download.
- Profile page for viewing account details.
- Logout page.

### Admin Interface
- Admin dashboard route under `/admin`.
- Add and manage fruits, blogs, gallery items, orders, users, and reviews from the admin panel.

## Setup Instructions

### Backend
1. Navigate to `Backend/`
2. Install dependencies: `npm install`
3. Create `.env` with keys:
   - `MONGODB_URI`
   - `JWT_SECRET_KEY`
   - `GMAIL_USER`
   - `GMAIL_PASS`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `NODE_ENV` (optional)
   - `FRONTEND_URL` (optional)
4. Start server: `npm start`

### Frontend
1. Navigate to `Frontend/`
2. Install dependencies: `npm install`
3. Create `.env` with keys:
   - `VITE_API_URL` (backend base URL)
   - `VITE_RAZORPAY_KEY_ID`
4. Start development: `npm run dev`

## Notes
- Admin routes require authenticated admin users and admin middleware.
- Image uploads use Cloudinary storage for fruits, blogs, and gallery content.
- Order emails are sent through Gmail SMTP using configured credentials.
- Razorpay payment verification uses HMAC signature verification.

## Contact
For updates or improvements, update controllers and React page components in the `Backend/` and `Frontend/` folders.

GenZZ Library Backend
Backend for the GenZZ Library project, built with Node.js, Express, and MongoDB.
Setup

Install Dependencies:
npm install


Environment Variables:Create a .env file in the root directory with the following:
PORT=5000
JWT_SECRET=9xPzvz5YJ3kQzX8W2gL9mF7nR4tH6yK8jP2vL5mN3qW=
ADMIN_PASSWORD=GENZCODERSAREKING
MONGO_URI=mongodb+srv://arshtyagi007:6RiTmTYWMfstWitu@genzcluster.le9k61p.mongodb.net/?retryWrites=true&w=majority&appName=genzcluster
NODE_ENV=production
FREEIMAGE_API_KEY=6d207e02198a847aa98d0a2a901485a5
TELEGRAM_BOT_TOKEN=7734702812:AAFDTgLR8cdMoh8un4JZoOR4bw1UlUUZ9cY
TELEGRAM_CHAT_ID=-1002562154053
FRONTEND_URL=https://your-frontend-url.com
SHRTFLY_API_KEY=b1e68efc5f09dcef3cbce17a4b0aaf00


Favicon:

Download favicon from Favicon.io.
Place favicon.ico in public/assets/.


Run Server:
npm start

For development:
npm run dev



Deployment

Render.com:
Push to GitHub.
Create a new Node.js service.
Set .env variables in Render dashboard.
Deploy.



API Endpoints

Books:

GET /api/books: Fetch books with pagination, search, and filters.
POST /api/books: Add a new book (admin only).
DELETE /api/books/:id: Delete a book (admin only).


Auth:

GET /api/auth/csrf-token: Generate CSRF token.
POST /api/auth/validate-key: Validate user access key.
POST /api/auth/admin-login: Admin login.
GET /api/auth/validate-admin: Validate admin session.
POST /api/auth/logout: Logout.


Reviews:

POST /api/reviews: Submit review (forwarded to Telegram).



Security

JWT-based authentication
CSRF protection
Rate limiting
Helmet for HTTP headers
Secure cookies (HttpOnly, Secure, SameSite=Strict)


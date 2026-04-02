# r.e.m. beauty - Frontend

A full stack e-commerce web application inspired by the **r.e.m. beauty** brand, developed as a final project at Henry Bootcamp.

---

## 🚀 Tech Stack

- Next.js 15
- React
- TypeScript
- TailwindCSS
- Context API (AuthContext)

---

## ✨ Features

- 🔐 User registration and login with JWT authentication
- 🛍️ Product catalog with individual product detail view
- 🛒 Shopping cart
- 📦 Order management
- 👤 User profile
- 🔒 Protected routes

---

## 📁 Project Structure

```
src/
├── app/               # Pages (login, register, products, cart, profile...)
├── components/        # Navbar, Footer, Card
├── context/           # AuthContext
├── services/          # API calls (auth, products)
├── ui/                # Main views
├── lib/               # Validations
└── types/             # Types & interfaces
```

---

## ⚙️ Installation & Setup

```bash
npm install
# Set up environment variables in .env.local
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🌐 Environment Variables

Create a `.env.local` file in the root of the project:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 👩‍💻 Author

**Guadalupe Rojas G.**  
[GitHub](https://github.com/GuadaRojasG) | [LinkedIn](#)

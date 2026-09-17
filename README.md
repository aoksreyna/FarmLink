# FarmLink

A digital B2B agricultural marketplace connecting local Cambodian farmers directly with commercial buyers (restaurants, supermarkets, and wholesalers).

---

## Features

### Farmer Features
- User registration and login (Farmer role)
- Create and manage produce listings with price and stock
- View incoming wholesale orders
- Browse buyer sourcing demands and submit price offers
- Chat directly with buyers
- Manage farm profile and location

### Buyer Features
- User registration and login (Buyer role)
- Browse and search fresh produce with category and province filters
- Add items to bulk cart and view product details
- Post sourcing demands with target price, quantity, and deadline
- View order records
- Chat directly with farmers

### Admin Features
- Dashboard overview of total users, products, and orders
- Review and manage produce listings
- Verify farmer and buyer accounts
- View platform activity by province

---

## Technologies Used

### Frontend
- Next.js 16.3.4
- React 19.2.8
- Tailwind CSS 4.x
- Lucide React 1.38.0

### Backend & Database
- Supabase (PostgreSQL & Auth) 2.x
- Node.js 22.x

### Containerization & Tools
- Docker
- Docker Compose
- Git

---

## System Workflow

1. Farmer creates an account and lists fresh produce with price, stock, and location.
2. Buyer browses marketplace to find produce, or posts a custom bulk sourcing demand.
3. Farmer views buyer demands and submits price offers.
4. Buyer and farmer chat directly to coordinate order terms.
5. Admin oversees platform activity, approves products, and verifies user accounts.

---

## How to Run

### 1. Local Development
```bash
git clone https://github.com/aoksreyna/FarmLink.git
cd FarmLink/farmlink-frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 2. Run with Docker
```bash
cd FarmLink
docker compose up --build -d
```
Open `http://localhost:3001` in your browser.
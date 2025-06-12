# Foley’s Place Web App

This is the complete, production-ready web app for inventory, accounting, and invoicing at Foley’s Place.

## Features

- Multi-user roles: Admin, Manager, Sales Rep, Accountant
- Authentication (JWT)
- Inventory management
- Invoicing with print-ready, branded template
- Sales Rep performance tracking
- Dashboard with reporting
- API with Express/MongoDB (backend) and React (frontend)
- Ready for deployment

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (Atlas or local)

### 1. Backend

```bash
cd backend
cp .env.example .env # Fill in your MongoDB URI and JWT_SECRET
npm install
npm start
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env # (Edit if backend is remote)
npm install
npm start
```
Open http://localhost:3000

### 3. Deployment

- **Backend:** Use Render, Railway, or Heroku. Set your .env variables.
- **Frontend:** Use Vercel or Netlify. Set `REACT_APP_API_URL` to your deployed backend.

## Company Branding

- Name: **Foley’s Place**
- Logo: See `frontend/src/assets/logo.png`
- Tel.: 08189430651, 08034726654  
- Email: foley'splace@yahoo.com  
- Address: 8, EMMANUEL KOLAWOLE STREET OFF BAJULAIYE ROAD SHOMOLU

## Default Roles

- Admins can manage users and all data.
- Managers can manage inventory, invoices, and view reports.
- Sales can only manage their own invoices.
- Accountants can view inventory and reports.

## Invoice Format

- Header: logo, name, contact, address
- Title: SALES INVOICE (centered)
- Table: S/N, Description, Qty., Unit, Price, Amount (NGN)
- Grand total (figures & words)
- Terms (bottom-left), signatures (bottom-right)

---

**Ready to upload to GitHub! Add your actual logo to `frontend/src/assets/logo.png`.**

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <header>
        <img src={require("../assets/logo.png")} alt="logo" style={{ height: 48 }} />
        <div><b>Foley's Place</b></div>
        <div>
          Logged in as <strong>{user.name}</strong> ({user.role}) &nbsp;
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <nav>
        <Link to="/dashboard">Dashboard</Link> |{" "}
        {(user.role === "admin" || user.role === "manager" || user.role === "accountant") && <Link to="/inventory">Inventory</Link>} |{" "}
        <Link to="/invoice">Invoices</Link> |{" "}
        {(user.role === "admin" || user.role === "manager" || user.role === "accountant") && <Link to="/reports">Reports</Link>}
      </nav>
      <main>
        <h1>Welcome, {user.name}!</h1>
        <p>Use the navigation menu to manage inventory, create or view invoices, and access performance reports.</p>
      </main>
    </div>
  );
        }

import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, { email, password });
      login({ ...data.user, token: data.token });
      window.location.href = "/dashboard";
    } catch {
      setErr("Invalid login");
    }
  };

  return (
    <div className="login-container">
      <h2>Foley's Place Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        {err && <div className="err-msg">{err}</div>}
      </form>
    </div>
  );
                                                         }

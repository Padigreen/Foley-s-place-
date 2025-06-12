import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function InventoryPage() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", quantity: 0, unit: "", price: 0 });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  const fetchItems = async () => {
    const { data } = await axios.get(`${API_URL}/inventory`, { headers: { Authorization: `Bearer ${user.token}` } });
    setItems(data);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/inventory/${editId}`, form, { headers: { Authorization: `Bearer ${user.token}` } });
    } else {
      await axios.post(`${API_URL}/inventory`, form, { headers: { Authorization: `Bearer ${user.token}` } });
    }
    fetchItems();
    setForm({ name: "", description: "", quantity: 0, unit: "", price: 0 });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete item?")) {
      await axios.delete(`${API_URL}/inventory/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      fetchItems();
    }
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <form onSubmit={handleAddOrUpdate}>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
        <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />
        <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: +e.target.value })} placeholder="Qty" required />
        <input value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} placeholder="Unit" required />
        <input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} placeholder="Price" required />
        <button type="submit">{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={() => { setForm({ name: "", description: "", quantity: 0, unit: "", price: 0 }); setEditId(null); }}>Cancel</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Description</th><th>Qty</th><th>Unit</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                {user.role === "admin" && <button onClick={() => handleDelete(item._id)}>Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
                                     }

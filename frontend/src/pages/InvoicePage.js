import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import InvoiceTemplate from "../components/InvoiceTemplate";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function InvoicePage() {
  const { user } = useContext(AuthContext);
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    customerName: "",
    items: [{ description: "", qty: 1, unit: "", price: 0, amount: 0 }],
    total: 0,
    terms: "Payment due within 30 days. Goods sold are not returnable.",
    salesRep: user.id
  });
  const [showPrint, setShowPrint] = useState(null);

  useEffect(() => {
    fetchInvoices();
    // eslint-disable-next-line
  }, []);

  const fetchInvoices = async () => {
    let url = `${API_URL}/invoices`;
    if (user.role === "sales") url += "/mine";
    const { data } = await axios.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
    setInvoices(data);
  };

  const handleItemChange = (idx, field, value) => {
    const items = [...newInvoice.items];
    items[idx][field] = value;
    items[idx].amount = items[idx].qty * items[idx].price;
    setNewInvoice({
      ...newInvoice,
      items,
      total: items.reduce((sum, i) => sum + (i.amount || 0), 0)
    });
  };

  const addItem = () => setNewInvoice({ ...newInvoice, items: [...newInvoice.items, { description: "", qty: 1, unit: "", price: 0, amount: 0 }] });
  const removeItem = idx => setNewInvoice({ ...newInvoice, items: newInvoice.items.filter((_, i) => i !== idx) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/invoices`, newInvoice, { headers: { Authorization: `Bearer ${user.token}` } });
    fetchInvoices();
    setNewInvoice({
      customerName: "",
      items: [{ description: "", qty: 1, unit: "", price: 0, amount: 0 }],
      total: 0,
      terms: newInvoice.terms,
      salesRep: user.id
    });
  };

  return (
    <div>
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <input value={newInvoice.customerName} onChange={e => setNewInvoice({ ...newInvoice, customerName: e.target.value })} placeholder="Customer Name" required />
        {newInvoice.items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: 4 }}>
            <input value={item.description} onChange={e => handleItemChange(idx, "description", e.target.value)} placeholder="Description" required />
            <input type="number" value={item.qty} onChange={e => handleItemChange(idx, "qty", +e.target.value)} placeholder="Qty" min="1" required />
            <input value={item.unit} onChange={e => handleItemChange(idx, "unit", e.target.value)} placeholder="Unit" required />
            <input type="number" value={item.price} onChange={e => handleItemChange(idx, "price", +e.target.value)} placeholder="Price" min="0" required />
            <span>Amt: {item.amount}</span>
            {newInvoice.items.length > 1 && <button type="button" onClick={() => removeItem(idx)}>-</button>}
          </div>
        ))}
        <button type="button" onClick={addItem}>Add Item</button>
        <div>Total: {newInvoice.total}</div>
        <textarea value={newInvoice.terms} onChange={e => setNewInvoice({ ...newInvoice, terms: e.target.value })} rows={2} />
        <button type="submit">Save Invoice</button>
      </form>
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Customer</th><th>Total</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv._id}>
              <td>{inv._id}</td>
              <td>{inv.customerName}</td>
              <td>{inv.total}</td>
              <td>{(new Date(inv.date)).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setShowPrint(inv)}>Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPrint && (
        <div className="modal">
          <button onClick={() => setShowPrint(null)}>Close</button>
          <InvoiceTemplate invoiceData={showPrint} />
          <button onClick={() => window.print()}>Print</button>
        </div>
      )}
    </div>
  );
              }

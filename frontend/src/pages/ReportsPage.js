import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Bar } from "react-chartjs-2";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function ReportsPage() {
  const { user } = useContext(AuthContext);
  const [repStats, setRepStats] = useState([]);
  const [summary, setSummary] = useState({ totalInvoices: 0, totalAmount: 0 });

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, []);

  const fetchStats = async () => {
    const { data: stats } = await axios.get(`${API_URL}/reports/sales-reps`, { headers: { Authorization: `Bearer ${user.token}` } });
    setRepStats(stats);
    const { data: sum } = await axios.get(`${API_URL}/reports/summary`, { headers: { Authorization: `Bearer ${user.token}` } });
    setSummary(sum);
  };

  return (
    <div>
      <h2>Reports</h2>
      <div>Total Invoices: {summary.totalInvoices}. Total Sales: NGN {summary.totalAmount}</div>
      <Bar
        data={{
          labels: repStats.map(r => r._id || "Unknown"),
          datasets: [{
            label: "Total Sales by Rep",
            data: repStats.map(r => r.totalSales),
            backgroundColor: "rgba(75,192,192,0.6)"
          }]
        }}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
      />
    </div>
  );
}

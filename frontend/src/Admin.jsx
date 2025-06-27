import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './Admin.css';
import axios from 'axios';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const Admin = () => {
  const navigate = useNavigate();
  const [orgs, setOrgs] = useState([]);

  const fallbackData = [
    { id: 1, name: "Red Cross", location: "USA", type: "NGO" },
    { id: 2, name: "UNICEF", location: "Global", type: "UN Agency" },
    { id: 3, name: "Teach for India", location: "India", type: "Education" },
    { id: 4, name: "Goonj", location: "India", type: "NGO" },
    { id: 5, name: "CRY", location: "India", type: "Education" },
    { id: 6, name: "Smile Foundation", location: "India", type: "NGO" }
  ];

  useEffect(() => {
    axios
      .get() //api link
      .then((res) => {
        setOrgs(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API failed, using fallback data", error);
        setOrgs(fallbackData);
        setLoading(false);
      });
  }, []);

  const orgTypeCount = orgs.reduce((acc, org) => {
    acc[org.type] = (acc[org.type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(orgTypeCount).map(([type, value]) => ({
    name: type,
    value
  }));

  const leaderboardData = [...chartData].sort((a, b) => b.value - a.value);

  const handlelistview = () =>{
    navigate('/admin/organizations')
  }
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Monitor participation and distribution</p>
      </header>

      <section className="analytics-section">
        <div className="leaderboard-container">
          <h2 className="leaderboard-title">🏆 Top Organization Types</h2>
          <ul className="leaderboard-list">
            {leaderboardData.map((item, index) => (
              <li key={index} className="leaderboard-item">
                <span>{index + 1}. {item.name}</span>
                <span className="count">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="chart-container">
          <h2 className="chart-title">📊 Organization Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="redirect-panel">
        <button className="redirect-btn" onClick={handlelistview}>View Organizations</button>
      </section>
    </div>
  );
};

export default Admin;

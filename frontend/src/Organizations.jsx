import React, { useState, useEffect } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Organizations = () => {
  const [orgs, setOrgs] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const navigate = useNavigate();

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
      .get() //API link here
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

  const sortOrganizations = (field) => {
    const sorted = [...orgs].sort((a, b) => a[field].localeCompare(b[field]));
    setOrgs(sorted);
  };

  const handleSortChange = (e) => {
    const field = e.target.value;
    setSortBy(field);
    sortOrganizations(field);
  };

const handleViewAnalytics = (name) => {
    navigate(`/admin/organizations/${name}`);
}

  return (
    <div className="organizations-container">
      <header className="admin-header">
        <h1 className="admin-title">🌍 NGO's Participating</h1>
      </header>

      <section className="sort-section">
        <label className="sort-label">Sort Organizations By:</label>
        <select value={sortBy} onChange={handleSortChange} className="sort-select">
          <option value="name">Name</option>
          <option value="location">Location</option>
          <option value="type">Type</option>
        </select>
      </section>

      <section className="table-section">
        <h2 className="section-heading">📋 Organization List</h2>
        <div className="table-container">
          <table className="org-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Type</th>
                <th>View Analytics</th>
              </tr>
            </thead>
            <tbody>
              {orgs.map((org, index) => (
                <tr key={index}>
                  <td>{org.name}</td>
                  <td>{org.location}</td>
                  <td>{org.type}</td>
                  <td><button className='redirect-btn' onClick={()=>{handleViewAnalytics(org.name)}}>View Analytics</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Organizations;
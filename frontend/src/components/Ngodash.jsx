import React, { useEffect, useState, useMemo } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Tabs, Tab,
  Container, Dialog,
  TextField, MenuItem, Grid, Paper, Button, Box, Stack,
  Menu, Divider, CircularProgress // Import CircularProgress for loading state
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, isValid } from 'date-fns';

import AddDonationForm from './AddDonationForm';

// ====================================================================================
// --- CONFIGURATION: SET YOUR BACKEND API URL HERE ---
// ====================================================================================
const API_BASE_URL = 'http://localhost:5000/api'; // Example: Replace with your actual backend URL

const Ngodash = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [ngoData, setNgoData] = useState(null);
  const [donations, setDonations] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);
  const [filters, setFilters] = useState({ place: '', ageGroup: '', date: null });
  
  const [isLoading, setIsLoading] = useState(true); // State to manage loading spinner

  // --- 1. BACKEND INTEGRATION: FETCH ALL DONATIONS (HTTP GET) ---
  // This useEffect hook runs once when the component first loads.
  // It's the perfect place to fetch the initial data for your dashboard.
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true); // Show the loading spinner
      try {
        // Fetch the list of all donations from your backend
        const response = await fetch(`${API_BASE_URL}/donations`);
        if (!response.ok) {
          throw new Error('Network response was not ok. Could not fetch donations.');
        }
        const donationsData = await response.json();
        setDonations(donationsData); // Populate the state with data from the backend

        // You could also fetch NGO profile data here
        // const ngoResponse = await fetch(`${API_BASE_URL}/ngo/profile`);
        // const ngoProfileData = await ngoResponse.json();
        // setNgoData(ngoProfileData);
        setNgoData({ name: 'Helping Hands NGO', key: 'NGO-2025-XY789' }); // Using dummy data for now

      } catch (error) {
        console.error("Backend Error:", error);
        // In a real app, you'd show a user-friendly error message (e.g., a toast notification)
        alert("Error: Could not load data from the server.");
      } finally {
        setIsLoading(false); // Hide the loading spinner regardless of success or failure
      }
    };

    fetchAllData();
  }, []); // The empty array `[]` ensures this effect runs only once on mount.


  const isProfileMenuOpen = Boolean(anchorEl);
  const filteredDonations = useMemo(() => { /* ... (no changes needed) ... */ return donations.filter(d => { const placeMatch = filters.place ? d.place.toLowerCase().includes(filters.place.toLowerCase()) : true; const ageGroupMatch = filters.ageGroup ? d.ageGroup === filters.ageGroup : true; const dateMatch = (filters.date && isValid(filters.date)) ? d.date === format(filters.date, 'yyyy-MM-dd') : true; return placeMatch && ageGroupMatch && dateMatch; }); }, [donations, filters]);
  const donationTypeTotals = useMemo(() => { /* ... (no changes needed) ... */ return donations.reduce((totals, donation) => { totals.food += parseInt(donation.foodQty) || 0; totals.clothes += parseInt(donation.clothes) || 0; return totals; }, { food: 0, clothes: 0 }); }, [donations]);
  const peopleHelpedTotals = useMemo(() => { /* ... (no changes needed) ... */ return donations.reduce((totals, donation) => { const peopleCount = parseInt(donation.people) || 0; if (donation.ageGroup === 'children') totals.children += peopleCount; else if (donation.ageGroup === 'adults') totals.adults += peopleCount; else if (donation.ageGroup === 'elderly') totals.elderly += peopleCount; return totals; }, { children: 0, adults: 0, elderly: 0 }); }, [donations]);

  // --- 2. & 3. BACKEND INTEGRATION: ADD (POST) & UPDATE (PUT) DONATIONS ---
  // This single function handles both creating a new donation and updating an existing one.
  const handleSaveDonation = async (formData) => {
    // Sanitize the form data before sending
    const processedData = {
      ...formData,
      people: parseInt(formData.people) || 0,
      foodQty: parseInt(formData.foodQty) || 0,
      clothes: parseInt(formData.clothes) || 0,
    };

    try {
      if (editingDonation) {
        // --- UPDATE (PUT) Logic ---
        // If we are editing, we send a PUT request to a specific donation's URL.
        const response = await fetch(`${API_BASE_URL}/donations/${editingDonation.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(processedData),
        });

        if (!response.ok) throw new Error('Failed to update donation.');
        
        const updatedDonation = await response.json();
        // Update the UI only after the backend confirms success.
        setDonations(donations.map(d => (d.id === updatedDonation.id ? updatedDonation : d)));
        
      } else {
        // --- ADD (POST) Logic ---
        // If we are adding, we send a POST request to the main donations URL.
        const response = await fetch(`${API_BASE_URL}/donations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(processedData),
        });

        if (!response.ok) throw new Error('Failed to add donation.');
        
        // The backend should return the newly created donation, including the ID from the database.
        const newDonationFromServer = await response.json(); 
        // Add the new donation to our local state to update the UI.
        setDonations([newDonationFromServer, ...donations]);
      }
      handleCloseForm(); // Close the modal on success
    } catch (error) {
      console.error("Backend Error:", error);
      alert("Error: Could not save the donation. Please try again.");
    }
  };

  // --- 4. BACKEND INTEGRATION: DELETE A DONATION (HTTP DELETE) ---
  // This function handles deleting a record from the database.
  const handleDeleteDonation = async (id) => {
    if (window.confirm("Are you sure you want to delete this donation? This action cannot be undone.")) {
      try {
        // Send a DELETE request to the specific donation's URL.
        const response = await fetch(`${API_BASE_URL}/donations/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete donation from the server.');

        // If the backend deletion is successful, update the UI by removing the item from the state.
        setDonations(donations.filter(d => d.id !== id));
        
      } catch (error) {
        console.error("Backend Error:", error);
        alert("Error: Could not delete the donation. Please try again.");
      }
    }
  };

  const columns = [ /* ... (your columns definition is fine) ... */ { field: 'date', headerName: 'Date', width: 120 }, { field: 'place', headerName: 'Place', width: 180 }, { field: 'people', headerName: 'People', type: 'number', width: 100 }, { field: 'ageGroup', headerName: 'Age Group', width: 120 }, { field: 'foodQty', headerName: 'Food (kg)', type: 'number', width: 120 }, { field: 'clothes', headerName: 'Clothes', type: 'number', width: 120 }, { field: 'actions', headerName: 'Actions', sortable: false, width: 150, renderCell: (params) => (<Stack direction="row" spacing={1}><Button variant="outlined" size="small" onClick={() => handleOpenEditForm(params.row)}>Edit</Button><Button variant="outlined" size="small" color="error" onClick={() => handleDeleteDonation(params.row.id)}>Delete</Button></Stack>) } ];
  const handleTabChange = (_, newValue) => setTabIndex(newValue);
  const handleFilterChange = (e) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleDateChange = (newDate) => setFilters(prev => ({ ...prev, date: newDate }));
  const clearFilters = () => setFilters({ place: '', ageGroup: '', date: null });
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => { handleProfileMenuClose(); console.log("User logged out"); alert("You have been successfully logged out."); };
  const handleOpenAddForm = () => { setEditingDonation(null); setIsFormOpen(true); };
  const handleOpenEditForm = (donation) => { setEditingDonation(donation); setIsFormOpen(true); };
  const handleCloseForm = () => { setIsFormOpen(false); setEditingDonation(null); };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppBar position="static">
         {/* ... (App Bar content is fine) ... */ }
         <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>NGO Dashboard</Typography>
          <Tabs value={tabIndex} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary">
            <Tab label="Home" />
            <Tab label="Visualize Data" />
          </Tabs>
          <IconButton onClick={handleProfileMenuOpen} color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={anchorEl} open={isProfileMenuOpen} onClose={handleProfileMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
         {/* ... (Menu content is fine) ... */ }
         <MenuItem disabled><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{ngoData?.name || 'Loading...'}</Typography></MenuItem>
         <Divider />
         <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Dialog open={isFormOpen} onClose={handleCloseForm}>
        <AddDonationForm onSave={handleSaveDonation} onCancel={handleCloseForm} initialData={editingDonation} />
      </Dialog>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {tabIndex === 0 && (
          <Stack spacing={2}>
            {/* ... (Header and Filter controls are fine) ... */ }
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Typography variant="h5">Donation Records</Typography><Button variant="contained" onClick={handleOpenAddForm}>Add New Donation</Button></Box>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}><DatePicker label="Filter by Date" value={filters.date} onChange={handleDateChange} renderInput={(params) => <TextField {...params} size="small" fullWidth />} /></Grid>
                <Grid item xs={12} sm={3}><TextField size="small" name="place" label="Filter by Place" value={filters.place} onChange={handleFilterChange} fullWidth /></Grid>
                <Grid item xs={12} sm={3}><TextField size="small" select name="ageGroup" label="Filter by Age Group" value={filters.ageGroup} onChange={handleFilterChange} fullWidth><MenuItem value=""><em>All Groups</em></MenuItem><MenuItem value="children">Children</MenuItem><MenuItem value="adults">Adults</MenuItem><MenuItem value="elderly">Elderly</MenuItem></TextField></Grid>
                <Grid item xs={12} sm={2}><Button onClick={clearFilters} variant="text" fullWidth>Clear</Button></Grid>
              </Grid>
            </Paper>

            <Paper sx={{ height: 600, width: '100%' }}>
              {/* --- UI UPDATE: SHOW SPINNER WHILE LOADING --- */}
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                  <Typography sx={{ ml: 2 }}>Loading Donations...</Typography>
                </Box>
              ) : (
                <DataGrid
                  rows={filteredDonations}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              )}
            </Paper>
          </Stack>
        )}

        {tabIndex === 1 && ( /* ... (Pie chart tab is fine) ... */ <Grid container spacing={4}><Grid item xs={12} md={6}><Paper elevation={3} sx={{ p: 2 }}><Typography variant="h6" align="center">Donations by Type</Typography><PieChart series={[{ data: [{ id: 0, value: donationTypeTotals.food, label: 'Food (kg)' }, { id: 1, value: donationTypeTotals.clothes, label: 'Clothes (items)' }], highlightScope: { faded: 'global', highlighted: 'item' }, faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' } }]} height={300} /></Paper></Grid><Grid item xs={12} md={6}><Paper elevation={3} sx={{ p: 2 }}><Typography variant="h6" align="center">People Helped by Age Group</Typography><PieChart series={[{ data: [ { id: 0, value: peopleHelpedTotals.children, label: 'Children' }, { id: 1, value: peopleHelpedTotals.adults, label: 'Adults' }, { id: 2, value: peopleHelpedTotals.elderly, label: 'Elderly' }], highlightScope: { faded: 'global', highlighted: 'item' }, faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' } }]} height={300} /></Paper></Grid></Grid>)}
      </Container>
    </LocalizationProvider>
  );
};

export default Ngodash;
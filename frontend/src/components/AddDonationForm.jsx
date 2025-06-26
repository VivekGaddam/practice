// --- START OF FILE AddDonationForm.jsx (Updated) ---

import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Button, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// Add new props: initialData and onCancel
const AddDonationForm = ({ onSave, onCancel, initialData }) => {
  const isEditMode = Boolean(initialData); // Check if we are in "edit" mode

  const [form, setForm] = useState({
    date: '',
    people: '',
    ageGroup: '',
    foodQty: '',
    clothes: '',
    place: ''
  });

  // This effect runs when the component mounts or when initialData changes.
  // If we are in edit mode, it populates the form with the existing donation's data.
  useEffect(() => {
    if (isEditMode) {
      setForm(initialData);
    }
  }, [initialData, isEditMode]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form); // The parent component will handle if it's an add or update
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <DialogTitle>{isEditMode ? 'Edit Donation' : 'Add New Donation'}</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Date" name="date" type="date" fullWidth value={form.date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
        <TextField margin="dense" label="No. of People Impacted" name="people" type="number" fullWidth value={form.people} onChange={handleChange} required />
        <TextField margin="dense" label="Age Group Most Impacted" name="ageGroup" select fullWidth value={form.ageGroup} onChange={handleChange} required>
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="children">Children</MenuItem>
          <MenuItem value="adults">Adults</MenuItem>
          <MenuItem value="elderly">Elderly</MenuItem>
        </TextField>
        <TextField margin="dense" label="Food Quantity Donated (kg)" name="foodQty" type="number" fullWidth value={form.foodQty} onChange={handleChange} required />
        <TextField margin="dense" label="Clothes Donated (items)" name="clothes" type="number" fullWidth value={form.clothes} onChange={handleChange} required />
        <TextField margin="dense" label="Place of Donation" name="place" fullWidth value={form.place} onChange={handleChange} required />
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 16px' }}>
        <Button onClick={onCancel} variant="outlined">Cancel</Button>
        <Button type="submit" variant="contained">{isEditMode ? 'Save Changes' : 'Add Donation'}</Button>
      </DialogActions>
    </Box>
  );
};

export default AddDonationForm;
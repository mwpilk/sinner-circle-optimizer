import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Paper,
  Box
} from '@mui/material';

const industries = [
  'Agriculture',
  'Automotive',
  'Construction',
  'Contract Cleaning',
  'Food & Beverage',
  'Marine',
  'Government',
  'Education'
];

const cleaningMethods = [
  'Hand & Bucket',
  'Pressure Washer',
  'Steam Cleaning',
  'Foam Lance',
  'CIP (Clean in Place)',
  'Automatic Washer'
];

const CleaningForm = ({ onAnalyze }) => {
  const [formData, setFormData] = useState({
    industry: '',
    surface: '',
    method: '',
    currentTime: '',
    laborCostPerHour: ''
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze({
      ...formData,
      currentTime: parseInt(formData.currentTime, 10),
      laborCostPerHour: parseFloat(formData.laborCostPerHour)
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Describe Your Cleaning Scenario
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gap: 3, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Industry</InputLabel>
            <Select
              value={formData.industry}
              onChange={handleChange('industry')}
              label="Industry"
              required
            >
              {industries.map((industry) => (
                <MenuItem key={industry} value={industry}>
                  {industry}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Surface / Equipment cleaned"
            value={formData.surface}
            onChange={handleChange('surface')}
            fullWidth
            required
            helperText="e.g., metal tanks, concrete floor, glass windows"
          />

          <FormControl fullWidth>
            <InputLabel>Current cleaning method</InputLabel>
            <Select
              value={formData.method}
              onChange={handleChange('method')}
              label="Current cleaning method"
              required
            >
              {cleaningMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Average time per cleaning (minutes)"
            type="number"
            value={formData.currentTime}
            onChange={handleChange('currentTime')}
            fullWidth
            required
            inputProps={{ min: 1 }}
          />

          <TextField
            label="Labor cost per hour ($)"
            type="number"
            value={formData.laborCostPerHour}
            onChange={handleChange('laborCostPerHour')}
            fullWidth
            required
            inputProps={{ min: 0, step: 0.01 }}
            helperText="Enter the hourly labor cost for cleaning staff"
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Analyze My Setup
        </Button>
      </form>
    </Paper>
  );
};

export default CleaningForm;

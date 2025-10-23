import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Paper,
} from '@mui/material';

const FilterPanel = ({
  nameFilter,
  setNameFilter,
  p75Threshold,
  setP75Threshold,
  thresholdOperator,
  setThresholdOperator,
  sortBy,
  setSortBy,
  clearFilters,
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Global Filters & Sorting
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Filter by Metric Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            size="small"
            fullWidth
            placeholder="e.g., largest_contentful_paint"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl size="small" sx={{ width: 180 }}>
            <InputLabel>Operator</InputLabel>
            <Select
              value={thresholdOperator}
              onChange={(e) => setThresholdOperator(e.target.value)}
              label="Operator"
            >
              <MenuItem value="gte">≥ (Greater or equal)</MenuItem>
              <MenuItem value="lte">≤ (Less or equal)</MenuItem>
              <MenuItem value="eq">= (Equal)</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="p75 Threshold"
            type="number"
            value={p75Threshold}
            onChange={(e) => setP75Threshold(e.target.value)}
            size="small"
            sx={{ width: 120 }}
            placeholder="e.g., 2500"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl size="small" sx={{ width: 160 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="name">Metric Name</MenuItem>
              <MenuItem value="p75">p75 Value</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
            onClick={clearFilters}
          >
            <Typography variant="body2" color="text.secondary">
              Clear all filters
            </Typography>
            <IconButton size="small">×</IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterPanel;

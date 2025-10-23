import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableSortLabel,
  IconButton,
} from '@mui/material';
import { extractMetrics } from '../../utils/helpers';

const ChromeUxReport = ({ data }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [p75Threshold, setP75Threshold] = useState('');
  const [thresholdOperator, setThresholdOperator] = useState('gte');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(true);

  // Extract metrics with useMemo to avoid dependency changes
  const record = data?.record;

  const allMetrics = useMemo(() => {
    return record ? extractMetrics(record) : [];
  }, [record]);

  // Filter and sort metrics
  const filteredAndSortedMetrics = useMemo(() => {
    let filtered = allMetrics.filter((metric) => {
      // Filter by name
      if (
        nameFilter &&
        !metric.key.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return false;
      }

      // Filter by p75 threshold
      if (p75Threshold && metric.p75 !== null && metric.p75 !== undefined) {
        const threshold = parseFloat(p75Threshold);
        if (!isNaN(threshold)) {
          if (thresholdOperator === 'gte' && metric.p75 < threshold) {
            return false;
          }
          if (thresholdOperator === 'lte' && metric.p75 > threshold) {
            return false;
          }
          if (thresholdOperator === 'eq' && metric.p75 !== threshold) {
            return false;
          }
        }
      }

      return true;
    });

    // Sort metrics
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let aValue, bValue;

        if (sortBy === 'name') {
          aValue = a.key.toLowerCase();
          bValue = b.key.toLowerCase();
        } else if (sortBy === 'p75') {
          aValue = a.p75 === null || a.p75 === undefined ? -1 : a.p75;
          bValue = b.p75 === null || b.p75 === undefined ? -1 : b.p75;
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [
    allMetrics,
    nameFilter,
    p75Threshold,
    thresholdOperator,
    sortBy,
    sortOrder,
  ]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setNameFilter('');
    setP75Threshold('');
    setThresholdOperator('gte');
    setSortBy('');
    setSortOrder('asc');
  };

  if (!data || !data.record) {
    return (
      <Typography variant="body1" color="white">
        No CrUX data available.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ flexGrow: 1, mb: 0 }}>
          Chrome UX Report
        </Typography>
      </Box>

      {showFilters && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Filters & Sorting
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

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Showing {filteredAndSortedMetrics.length} of {allMetrics.length}{' '}
            metrics
          </Typography>
        </Paper>
      )}

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '200px' }}>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortBy === 'name' ? sortOrder : 'asc'}
                  onClick={() => handleSort('name')}
                  hideSortIcon={false}
                  sx={{ fontWeight: 'bold' }}
                >
                  Metric
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ width: '100px' }}>
                <TableSortLabel
                  active={sortBy === 'p75'}
                  direction={sortBy === 'p75' ? sortOrder : 'asc'}
                  onClick={() => handleSort('p75')}
                  hideSortIcon={false}
                  sx={{ fontWeight: 'bold' }}
                >
                  p75
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: 'auto', fontWeight: 'bold' }}>
                Histogram / Fractions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedMetrics.map((m) => (
              <TableRow key={m.key}>
                <TableCell sx={{ wordBreak: 'break-word' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {m.key}
                  </Typography>
                </TableCell>
                <TableCell align="right">{m.p75 ?? '—'}</TableCell>
                <TableCell>
                  {m.histogram ? (
                    <Box>
                      {m.histogram.map((h, i) => (
                        <Chip
                          key={i}
                          label={`[${h.start || 0}-${h.end || '∞'}]: ${(
                            h.density * 100
                          ).toFixed(1)}%`}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  ) : m.fractions ? (
                    <Box>
                      {Object.entries(m.fractions).map(([k, v]) => (
                        <Chip
                          key={k}
                          label={`${k}: ${(v * 100).toFixed(1)}%`}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  ) : (
                    '—'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredAndSortedMetrics.length === 0 && allMetrics.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            No metrics match the current filters. Try adjusting your filter
            criteria.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChromeUxReport;

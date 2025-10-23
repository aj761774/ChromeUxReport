import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Chip,
  Alert,
} from '@mui/material';
import { extractMetrics } from '../../utils/helpers';

const SingleReport = ({ report, globalFilters }) => {
  const { nameFilter, p75Threshold, thresholdOperator, sortBy, sortOrder } =
    globalFilters;

  const record = report?.data?.record;

  const allMetrics = useMemo(() => {
    return record ? extractMetrics(record) : [];
  }, [record]);

  // Filter and sort metrics for this report
  const filteredAndSortedMetrics = useMemo(() => {
    let filtered = allMetrics.filter((metric) => {
      // Filter by name
      if (
        nameFilter &&
        !metric.key.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return false;
      }

      if (metric.p75 === null || metric.p75 === undefined) {
        return false;
      }

      // Filter by p75 threshold
      if (p75Threshold && metric.p75 !== null && metric.p75 !== undefined) {
        const threshold = parseFloat(p75Threshold);

        if (!isNaN(threshold)) {
          if (thresholdOperator === 'gte' && +metric.p75 < threshold) {
            return false;
          }
          if (thresholdOperator === 'lte' && +metric.p75 > threshold) {
            return false;
          }
          if (thresholdOperator === 'eq' && +metric.p75 !== threshold) {
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

  // Show error state for this report
  if (report.error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        <Typography variant="body2">
          <strong>{report.url}:</strong> {report.error}
        </Typography>
      </Alert>
    );
  }

  // Show no data state for this report
  if (!report.data || !report.data.record) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="body2">
          <strong>{report.url}:</strong> No CrUX data available
        </Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableBody>
            {filteredAndSortedMetrics.map((item) => (
              <TableRow key={item.key}>
                <TableCell sx={{ width: '200px', wordBreak: 'break-word' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {item.key}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ width: '100px' }}>
                  {item.p75 ?? '—'}
                </TableCell>
                <TableCell sx={{ width: 'auto' }}>
                  {item.histogram ? (
                    <Box>
                      {item.histogram.map((h, i) => (
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
                  ) : item.fractions ? (
                    <Box>
                      {Object.entries(item.fractions).map(([k, v]) => (
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
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="body2" color="white">
            No metrics match the current filters for this URL.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SingleReport;

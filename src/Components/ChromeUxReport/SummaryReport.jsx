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
} from '@mui/material';
import { extractMetrics } from '../../utils/helpers';

const SummaryReport = ({ reports, globalFilters }) => {
  const { nameFilter, p75Threshold, thresholdOperator, sortBy, sortOrder } = globalFilters;

  // Aggregate all metrics from all successful reports
  const aggregatedMetrics = useMemo(() => {
    const metricMap = new Map();

    reports.forEach(report => {
      if (!report.error && report.data?.record) {
        const metrics = extractMetrics(report.data.record);
        metrics.forEach(metric => {
          if (!metricMap.has(metric.key)) {
            metricMap.set(metric.key, {
              key: metric.key,
              values: [],
              urls: []
            });
          }
          
          if (metric.p75 !== null && metric.p75 !== undefined) {
            metricMap.get(metric.key).values.push(metric.p75);
            metricMap.get(metric.key).urls.push(report.url);
          }
        });
      }
    });

    // Calculate statistics for each metric
    const result = Array.from(metricMap.entries()).map(([key, data]) => {
      const values = data.values;
      const count = values.length;
      const sum = values.reduce((a, b) => a + b, 0);
      const average = count > 0 ? sum / count : null;
      const min = count > 0 ? Math.min(...values) : null;
      const max = count > 0 ? Math.max(...values) : null;

      return {
        key,
        count,
        average: average ? Math.round(average) : null,
        sum: sum ? Math.round(sum) : null,
        min,
        max,
        urls: data.urls
      };
    });

    return result;
  }, [reports]);

  // Apply filtering and sorting to summary metrics
  const filteredAndSortedMetrics = useMemo(() => {
    let filtered = aggregatedMetrics.filter((metric) => {
      // Filter by name
      if (
        nameFilter &&
        !metric.key.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return false;
      }

      // Filter by p75 threshold (using average for summary)
      if (p75Threshold && metric.average !== null && metric.average !== undefined) {
        const threshold = parseFloat(p75Threshold);
        if (!isNaN(threshold)) {
          if (thresholdOperator === 'gte' && metric.average < threshold) {
            return false;
          }
          if (thresholdOperator === 'lte' && metric.average > threshold) {
            return false;
          }
          if (thresholdOperator === 'eq' && metric.average !== threshold) {
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
          // Sort by average for summary
          aValue = a.average === null || a.average === undefined ? -1 : a.average;
          bValue = b.average === null || b.average === undefined ? -1 : b.average;
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [
    aggregatedMetrics,
    nameFilter,
    p75Threshold,
    thresholdOperator,
    sortBy,
    sortOrder,
  ]);

  return (
    <Box sx={{ mb: 3 }}>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableBody>
            {filteredAndSortedMetrics.map((m) => (
              <TableRow key={m.key}>
                <TableCell sx={{ width: '200px', wordBreak: 'break-word' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {m.key}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ width: '60px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {m.count} URLs
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ width: '80px' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {m.average ?? '—'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    avg
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ width: '60px' }}>
                  <Typography variant="body2">
                    {m.min ?? '—'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    min
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ width: '60px' }}>
                  <Typography variant="body2">
                    {m.max ?? '—'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    max
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: 'auto' }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {m.urls.slice(0, 3).map((url, index) => {
                      let hostname = url;
                      try {
                        hostname = new URL(url).hostname;
                      } catch {
                        hostname = url.length > 20 ? url.substring(0, 20) + '...' : url;
                      }
                      return (
                        <Chip
                          key={index}
                          label={hostname}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      );
                    })}
                    {m.urls.length > 3 && (
                      <Chip
                        label={`+${m.urls.length - 3} more`}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredAndSortedMetrics.length === 0 && aggregatedMetrics.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            No metrics match the current filters in the summary.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SummaryReport;

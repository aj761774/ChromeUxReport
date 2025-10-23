import React from 'react';
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
} from '@mui/material';

// Utility function to extract key metrics from the CrUX response
const extractMetrics = (record) => {
  const metrics = record?.metrics || {};
  const result = [];

  for (const [key, value] of Object.entries(metrics)) {
    const p75 = value?.percentiles?.p75 ?? null;
    const histogram = value?.histogram ?? null;
    const fractions = value?.fractions ?? null;
    if (p75 !== null || histogram || fractions) {
      result.push({ key, p75, histogram, fractions });
    }
  }

  return result;
};

const ChromeUxReport = ({ data }) => {
  if (!data || !data.record) {
    return (
      <Typography variant="body1" color="white">
        No CrUX data available.
      </Typography>
    );
  }

  const record = data.record;
  const origin = record.key?.url || record.key?.origin;
  const metrics = extractMetrics(record);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Chrome UX Report
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Origin:</strong> {origin}
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Metric</TableCell>
              <TableCell align="right">p75</TableCell>
              <TableCell>Histogram / Fractions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metrics.map((m) => (
              <TableRow key={m.key}>
                <TableCell>
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
    </Box>
  );
};

export default ChromeUxReport;

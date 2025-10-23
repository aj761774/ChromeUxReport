import React from 'react';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@mui/material';

const TableHeader = ({ sortBy, sortOrder, handleSort, isSummaryView }) => {
  return (
    <Paper sx={{ mb: 1 }}>
      <TableContainer>
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

              {/* Summary table headers */}
              {isSummaryView ? (
                <>
                  <TableCell
                    align="right"
                    sx={{ width: '60px', fontWeight: 'bold' }}
                  >
                    Count
                  </TableCell>
                  <TableCell align="right" sx={{ width: '80px' }}>
                    <TableSortLabel
                      active={sortBy === 'p75'}
                      direction={sortBy === 'p75' ? sortOrder : 'asc'}
                      onClick={() => handleSort('p75')}
                      hideSortIcon={false}
                      sx={{ fontWeight: 'bold' }}
                    >
                      Average
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ width: '60px', fontWeight: 'bold' }}
                  >
                    Min
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ width: '60px', fontWeight: 'bold' }}
                  >
                    Max
                  </TableCell>
                  <TableCell sx={{ width: 'auto', fontWeight: 'bold' }}>
                    URLs
                  </TableCell>
                </>
              ) : (
                /* Individual report headers */
                <>
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
                </>
              )}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableHeader;

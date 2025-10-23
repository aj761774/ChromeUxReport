import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SummaryReport from './SummaryReport';
import SingleReport from './SingleReport';
import FilterPanel from './FilterPanel';
import ReportTabs from './ReportTabs';
import TableHeader from './TableHeader';

// Main Component
const ChromeUxReport = ({ reports }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [p75Threshold, setP75Threshold] = useState('');
  const [thresholdOperator, setThresholdOperator] = useState('gte');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const clearFilters = () => {
    setNameFilter('');
    setP75Threshold('');
    setThresholdOperator('gte');
    setSortBy('');
    setSortOrder('asc');
  };

  // Reset selectedTab when reports change
  useEffect(() => {
    const successfulReports = reports.filter(
      (report) => !report.error && report.data?.record
    );

    // Calculate total tabs (summary tab + individual report tabs)
    const totalTabs =
      successfulReports.length > 1
        ? successfulReports.length + 1 // +1 for summary tab
        : successfulReports.length;

    if (selectedTab >= totalTabs && totalTabs > 0) {
      setSelectedTab(0);
    }
  }, [reports, selectedTab]);

  const globalFilters = {
    nameFilter,
    p75Threshold,
    thresholdOperator,
    sortBy,
    sortOrder,
  };

  if (!reports || reports.length === 0) {
    return (
      <Typography variant="body1" color="white">
        Enter URLs above to generate Chrome UX Reports.
      </Typography>
    );
  }

  // Separate successful reports from error/warning reports
  const successfulReports = reports.filter(
    (report) => !report.error && report.data?.record
  );
  const errorReports = reports.filter(
    (report) => report.error || !report.data?.record
  );

  const isSummaryView = successfulReports.length > 1 && selectedTab === 0;

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Chrome UX Reports ({reports.length})
      </Typography>

      {/* Show errors/warnings first */}
      {errorReports.map((report, index) => (
        <SingleReport
          key={`error-${report.url}-${index}`}
          report={report}
          globalFilters={globalFilters}
        />
      ))}

      {successfulReports.length > 0 && (
        <>
          <FilterPanel
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            p75Threshold={p75Threshold}
            setP75Threshold={setP75Threshold}
            thresholdOperator={thresholdOperator}
            setThresholdOperator={setThresholdOperator}
            sortBy={sortBy}
            setSortBy={setSortBy}
            clearFilters={clearFilters}
          />

          <ReportTabs
            selectedTab={selectedTab}
            handleTabChange={handleTabChange}
            successfulReports={successfulReports}
          />

          <TableHeader
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSort={handleSort}
            isSummaryView={isSummaryView}
          />

          {/* Selected Tab Content */}
          {isSummaryView ? (
            <SummaryReport
              reports={successfulReports}
              globalFilters={globalFilters}
            />
          ) : (
            successfulReports[
              successfulReports.length > 1 ? selectedTab - 1 : selectedTab
            ] && (
              <SingleReport
                report={
                  successfulReports[
                    successfulReports.length > 1 ? selectedTab - 1 : selectedTab
                  ]
                }
                globalFilters={globalFilters}
              />
            )
          )}
        </>
      )}
    </Box>
  );
};

export default ChromeUxReport;

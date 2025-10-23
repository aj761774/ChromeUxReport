import React from 'react';
import { Paper, Tabs, Tab } from '@mui/material';

const ReportTabs = ({ selectedTab, handleTabChange, successfulReports }) => {
  return (
    <Paper sx={{ mb: 2 }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        selectionFollowsFocus
        sx={{
          borderBottom: 1,
          maxWidth: '98vw',
          borderColor: 'divider',
          '& .MuiTabs-scrollButtons': {
            '&.Mui-disabled': {
              opacity: 0.3,
            },
            width: 40,
            '& svg': {
              fontSize: '1.2rem',
            },
          },
          '& .MuiTabs-scroller': {
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          },
        }}
      >
        {/* Summary tab for multiple URLs */}
        {successfulReports.length > 1 && (
          <Tab
            key="summary"
            label="Summary"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: 'success.main',
            }}
          />
        )}

        {successfulReports.map((report, index) => {
          let tabLabel = report.url;
          try {
            tabLabel = new URL(report.url).hostname || report.url;
            // Truncate very long hostnames
            if (tabLabel.length > 25) {
              tabLabel = tabLabel.substring(0, 22) + '...';
            }
          } catch {
            // Fallback for invalid URLs - truncate if too long
            tabLabel =
              report.url.length > 25
                ? report.url.substring(0, 22) + '...'
                : report.url;
          }

          return (
            <Tab
              key={index}
              label={tabLabel}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                minWidth: 80,
                maxWidth: 200,
                '& .MuiTab-wrapper': {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              }}
              title={report.url} // Show full URL on hover
            />
          );
        })}
      </Tabs>
    </Paper>
  );
};

export default ReportTabs;

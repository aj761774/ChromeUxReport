# Chrome UX Report Dashboard

A modern React application for visualizing Chrome User Experience Report (CrUX) data. This tool allows you to analyze real-world performance metrics for any website using Google's Chrome UX Report API.

## Features

### Core Functionality
- **Multi-URL Support**: Analyze multiple websites simultaneously with comma-separated URLs
- **Concurrent Processing**: Parallel API requests for improved performance when analyzing multiple URLs
- **Real-time UX Analysis**: Fetch and display Chrome UX Report data for any website
- **Performance Metrics**: Comprehensive view of Core Web Vitals and other UX metrics

### Advanced Analysis
- **Summary Dashboard**: Aggregated statistics across all analyzed URLs with count, average, min, and max values
- **Tabbed Interface**: Organized view with Summary tab and individual URL tabs for easy comparison
- **Advanced Filtering**: Filter metrics by name and p75 threshold values with multiple operators
- **Smart Sorting**: Sort data by metric name or performance values in ascending/descending order

### User Experience
- **Modern UI**: Clean, responsive interface built with Material-UI components
- **Error Handling**: Comprehensive error handling with detailed toast notifications
- **Loading States**: Visual feedback during data fetching with loading indicators
- **Empty States**: Helpful messages when no data matches current filters

### Technical Features
- **Component Architecture**: Modular, maintainable codebase with separated concerns
- **Performance Optimized**: Memoized calculations and efficient rendering
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Fast Development**: Hot module replacement with Vite for rapid development

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Chrome UX Report API key from Google Cloud Console

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd chrome-ux-report

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory and add your Chrome UX Report API key:

```env
VITE_CHROME_UX_REPORT_API_KEY=your_api_key_here
```

#### How to get a Chrome UX Report API Key:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Chrome UX Report API
4. Go to "Credentials" and create an API key
5. Optionally, restrict the API key to the Chrome UX Report API for security

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
chrome-ux-report/
├── public/                 # Static assets
├── src/
│   ├── Components/
│   │   ├── ChromeUxReport/
│   │   │   ├── index.jsx          # Main orchestrator component
│   │   │   ├── SummaryReport.jsx  # Summary statistics across URLs
│   │   │   ├── SingleReport.jsx   # Individual URL report display
│   │   │   ├── FilterPanel.jsx    # Filtering and sorting controls
│   │   │   ├── ReportTabs.jsx     # Tab navigation component
│   │   │   └── TableHeader.jsx    # Dynamic table headers
│   │   └── Search/                # URL search input component
│   ├── utils/
│   │   └── helpers.js            # Utility functions for data processing
│   ├── assets/                   # Project assets
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # Application styles
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Application entry point
├── .env                          # Environment variables (API key)
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
└── README.md                    # Project documentation
```

## Usage

### Basic Usage
1. **Start the application** using `npm run dev`
2. **Enter URLs** in the search input field (single URL or comma-separated multiple URLs)
3. **Click Search** to fetch Chrome UX Report data for all URLs concurrently
4. **View the results** in the organized tabbed interface

### Single URL Analysis
- Enter a single URL (e.g., `https://example.com`)
- Results display in a single table with detailed metrics

### Multiple URL Analysis
- Enter comma-separated URLs (e.g., `https://google.com, https://github.com, https://stackoverflow.com`)
- Results display in a tabbed interface:
  - **Summary Tab**: Aggregated statistics showing count, average, min, and max values across all URLs
  - **Individual Tabs**: Detailed metrics for each specific URL

### Advanced Features

#### Filtering Options
- **Metric Name Filter**: Search for specific metrics (e.g., "paint", "layout")
- **P75 Threshold Filter**: Filter metrics by performance values with operators:
  - `≥` (Greater than or equal)
  - `≤` (Less than or equal)
  - `=` (Equal to)

#### Sorting Options
- **Sort by Metric Name**: Alphabetical sorting (A-Z or Z-A)
- **Sort by p75 Value**: Performance value sorting (Low-High or High-Low)
- **Summary Sort**: In summary view, sorts by average values

#### Data Display
The application displays Core Web Vitals and other performance metrics including:
- **Largest Contentful Paint (LCP)**: Loading performance
- **First Input Delay (FID)**: Interactivity measurement
- **Cumulative Layout Shift (CLS)**: Visual stability metric
- **First Contentful Paint (FCP)**: Initial rendering performance
- **Time to First Byte (TTFB)**: Server response time
- **Interaction to Next Paint (INP)**: Responsiveness metric

#### Summary Statistics
When analyzing multiple URLs, the Summary tab provides:
- **Count**: Number of URLs that have each metric
- **Average**: Mean performance value across all URLs
- **Min/Max**: Performance range showing best and worst values
- **URL Attribution**: Shows which URLs contribute to each metric

## Examples

### Single URL Analysis
```
https://google.com
```
Results in a single table showing all available metrics for Google.

### Multiple URL Comparison
```
https://google.com, https://github.com, https://stackoverflow.com
```
Results in:
- **Summary tab** showing aggregated statistics across all three sites
- **google.com tab** with detailed Google metrics
- **github.com tab** with detailed GitHub metrics  
- **stackoverflow.com tab** with detailed Stack Overflow metrics

### Filtering Examples
1. **Find all paint-related metrics**: Enter "paint" in the metric name filter
2. **Show fast-loading pages**: Set p75 threshold to "≤ 1500" for LCP metrics
3. **Identify slow metrics**: Set p75 threshold to "≥ 4000" to find performance issues
4. **Sort by performance**: Choose "p75 Value" sorting to see best/worst performing metrics

### Real-World Use Cases
- **Competitor Analysis**: Compare your site against competitors
- **Performance Benchmarking**: Analyze multiple pages of your own site
- **Technology Stack Comparison**: Compare sites built with different technologies
- **Regional Performance**: Compare same site across different domains/regions

## Technologies Used

### Frontend Framework
- **React 19.1.1** - Component-based UI library with hooks
- **Vite 7.1.7** - Fast build tool and development server

### UI Components & Styling
- **Material-UI 7.3.4** - React component library
- **Material-UI Icons** - Icon components for UI elements
- **Emotion** - CSS-in-JS styling solution
- **React Toastify** - Toast notification system

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite Plugin React** - React support for Vite

### Architecture & Performance
- **Component Architecture**: Modular design with separated concerns
- **React Hooks**: useState, useEffect, useMemo for state management
- **Concurrent Processing**: Promise.all() for parallel API requests
- **Performance Optimization**: Memoized calculations and efficient rendering

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Component Architecture

The application follows a modular architecture with clear separation of concerns:

### Core Components
- **Main App** (`App.jsx`): Manages global state and API requests
- **Search Component** (`Search/index.jsx`): Handles URL input and search functionality

### ChromeUxReport Module
- **Main Controller** (`ChromeUxReport/index.jsx`): Orchestrates all report components and manages state
- **SummaryReport** (`SummaryReport.jsx`): Aggregates and displays statistics across multiple URLs
- **SingleReport** (`SingleReport.jsx`): Displays individual URL metrics and handles error states
- **FilterPanel** (`FilterPanel.jsx`): Contains all filtering and sorting controls
- **ReportTabs** (`ReportTabs.jsx`): Manages tabbed navigation for multiple reports
- **TableHeader** (`TableHeader.jsx`): Dynamic table headers based on current view

### Utility Functions
- **Helpers** (`utils/helpers.js`): Data processing and metric extraction utilities

### Benefits of This Architecture
- **Maintainability**: Easy to locate and modify specific functionality
- **Testability**: Components can be tested in isolation
- **Reusability**: Components are self-contained and reusable
- **Performance**: Optimized rendering with memoized calculations
- **Scalability**: Easy to add new features or modify existing ones

## API Information

This application uses the [Chrome UX Report API](https://developers.google.com/web/tools/chrome-user-experience-report/api/reference) to fetch real-world user experience data. The API provides aggregated performance metrics collected from Chrome users who have opted into syncing their browsing history.

### Rate Limits and Considerations
- The API has standard rate limits for requests
- Multiple URL requests are processed concurrently for better performance
- Error handling ensures individual URL failures don't break the entire analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test your changes with multiple URLs
6. Ensure all components work correctly
7. Submit a pull request

## Troubleshooting

### Common Issues

#### API and Data Issues
- **API Key Error**: Ensure your API key is correctly set in the `.env` file
- **CORS Issues**: The Chrome UX Report API supports CORS, but ensure your API key has proper permissions
- **No Data Available**: Some URLs might not have sufficient data in the Chrome UX Report database
- **Partial Results**: When analyzing multiple URLs, some may succeed while others fail - this is normal

#### UI and Filtering Issues
- **Empty Summary Tab**: Ensure at least 2 URLs have successful data to see the summary
- **No Results After Filtering**: Check your filter criteria - try clearing filters and starting over
- **Tabs Not Appearing**: Verify that URLs are valid and returning data
- **Performance Issues**: Large numbers of URLs (>10) may cause slower performance

#### Input Format Issues
- **Invalid URLs**: Ensure URLs include the protocol (https:// or http://)
- **Comma Separation**: When entering multiple URLs, separate them with commas
- **Whitespace**: Extra spaces around URLs are automatically trimmed

### Tips for Best Results
- Use complete URLs with protocols (e.g., `https://example.com`)
- Popular websites typically have more comprehensive CrUX data
- Mobile and desktop data may vary significantly
- Some newer websites may not have sufficient data in the CrUX database

### Support

For issues with the Chrome UX Report API, refer to the [official documentation](https://developers.google.com/web/tools/chrome-user-experience-report/api/reference).

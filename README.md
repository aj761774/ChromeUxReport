# Chrome UX Report Dashboard

A modern React application for visualizing Chrome User Experience Report (CrUX) data. This tool allows you to analyze real-world performance metrics for any website using Google's Chrome UX Report API.

## Features

- **Real-time UX Analysis**: Fetch and display Chrome UX Report data for any URL
- **Performance Metrics**: View Core Web Vitals and other UX metrics
- **Modern UI**: Built with Material-UI components for a clean, responsive interface
- **Error Handling**: Comprehensive error handling with toast notifications
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
│   │   ├── ChromeUxReport/ # Component for displaying UX report data
│   │   └── Search/         # URL search input component
│   ├── assets/            # Project assets
│   ├── App.jsx            # Main application component
│   ├── App.css           # Application styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── .env                   # Environment variables (API key)
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## Usage

1. **Start the application** using `npm run dev`
2. **Enter a URL** in the search input field
3. **Click Search** to fetch Chrome UX Report data
4. **View the results** displaying various UX metrics and Core Web Vitals

The application will display performance data including:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- And other Core Web Vitals metrics

## Technologies Used

### Frontend Framework
- **React 19.1.1** - Component-based UI library
- **Vite 7.1.7** - Fast build tool and development server

### UI Components
- **Material-UI 7.3.4** - React component library
- **Emotion** - CSS-in-JS styling solution
- **React Toastify** - Toast notification system

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite Plugin React** - React support for Vite

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## API Information

This application uses the [Chrome UX Report API](https://developers.google.com/web/tools/chrome-user-experience-report/api/reference) to fetch real-world user experience data. The API provides aggregated performance metrics collected from Chrome users who have opted into syncing their browsing history.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test your changes
6. Submit a pull request

## Troubleshooting

### Common Issues

- **API Key Error**: Ensure your API key is correctly set in the `.env` file
- **CORS Issues**: The Chrome UX Report API supports CORS, but ensure your API key has proper permissions
- **No Data Available**: Some URLs might not have sufficient data in the Chrome UX Report database

### Support

For issues with the Chrome UX Report API, refer to the [official documentation](https://developers.google.com/web/tools/chrome-user-experience-report/api/reference).

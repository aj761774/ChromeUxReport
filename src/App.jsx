import { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import ChromeUxReport from './Components/ChromeUxReport';
import Search from './Components/Search';

const ChromeUxReportApiKey = import.meta.env.VITE_CHROME_UX_REPORT_API_KEY;

function App() {
  const [urls, setUrls] = useState('');
  const [reports, setReports] = useState([]);
  const [isSearching, setSearching] = useState(false);

  const handleChange = (e) => {
    setUrls(e.target.value);
  };

  const fetchSingleReport = async (url) => {
    const apiUrl = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${ChromeUxReportApiKey}`;
    const body = {
      url: url.trim(),
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        return { url: url.trim(), data, error: null };
      } else if (data.error) {
        return { url: url.trim(), data: null, error: data.error.message };
      }
    } catch (error) {
      return { url: url.trim(), data: null, error: error.message };
    }
  };

  const fetchAllReports = async (urlList) => {
    setSearching(true);
    setReports([]);

    try {
      // Filter out empty URLs
      const validUrls = urlList.filter((url) => url.trim().length > 0);

      if (validUrls.length === 0) {
        toast.error('Please enter at least one valid URL');
        return;
      }

      // Fetch all reports concurrently
      const promises = validUrls.map((url) => fetchSingleReport(url));
      const results = await Promise.all(promises);

      setReports(results);

      // Show error toasts for failed requests
      const errorCount = results.filter((result) => result.error).length;
      const successCount = results.filter((result) => !result.error).length;

      if (errorCount > 0 && successCount > 0) {
        toast.warning(
          `${successCount} reports loaded successfully, ${errorCount} failed`
        );
      } else if (errorCount > 0 && successCount === 0) {
        toast.error(
          'All requests failed. Please check your URLs and try again.'
        );
      } else if (successCount > 0) {
        toast.success(
          `Successfully loaded ${successCount} report${
            successCount > 1 ? 's' : ''
          }`
        );
      }
    } catch (error) {
      console.error('Error fetching Chrome UX Reports:', error);
      toast.error('An unexpected error occurred while fetching reports');
    } finally {
      setSearching(false);
    }
  };

  const handleSearch = () => {
    const urlList = urls.split(',').map((url) => url.trim());
    fetchAllReports(urlList);
  };

  return (
    <>
      <div className="search-and-ux-report-container">
        <Search
          value={urls}
          handleChange={handleChange}
          handleSearch={handleSearch}
          isSearching={isSearching}
        />
        <ChromeUxReport reports={reports} />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

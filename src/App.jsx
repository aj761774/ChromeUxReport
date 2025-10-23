import { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import ChromeUxReport from './Components/ChromeUxReport';
import Search from './Components/Search';

const ChromeUxReportApiKey = import.meta.env.VITE_CHROME_UX_REPORT_API_KEY;

function App() {
  const [urls, setUrls] = useState('');
  const [data, setData] = useState(null);
  const [isSearching, setSearching] = useState(false);

  const handleChange = (e) => {
    setUrls(e.target.value);
  };

  const fetchReport = async (url) => {
    if (isSearching) return;
    setSearching(true);
    const apiUrl = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${ChromeUxReportApiKey}`;
    const body = {
      url: url,
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
        setData(data);
      } else if (data.error) {
        toast.error(`Error: ${data.error.message}`);
        setData(null);
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error('Error fetching Chrome UX Report:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleSearch = () => {
    const urlList = urls.split(',').map((url) => url.trim());
    if (urlList.length > 0) {
      fetchReport(urlList[0]); // Fetch report for the first URL only
    }
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
        <ChromeUxReport data={data} />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

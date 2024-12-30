import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import Report from './components/Report';

function App() {
  const [report, setReport] = useState(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null); // New state for capturing errors

  // Handle the upload of the URL (POST request)
  const handleUpload = async (url) => {
    try {
      // Send the URL to the backend API
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Sending JSON data
        },
        body: JSON.stringify({ url }), // Send URL as JSON
      });

      // Check if the response is OK (200-299 status)
      if (response.ok) {
        const result = await response.json(); // Parse the JSON response

        console.log('Upload successful:', result);

        // Assuming 'results' contains the logs and 'report' contains the summary
        setLogs(result.results || []);
        setReport(result.report || {});
        setError(null); // Clear any previous error when the upload is successful
      } else {
        // If not OK, display the error message (e.g., 400 or 500 status)
        const result = await response.json(); // Get the error details from the response
        setError(`Error: ${response.status} - ${result.error || 'Unknown error'}`);
        console.error('Upload failed:', response.status, result);
        setLogs([]); // Clear logs on error
        setReport(null); // Clear report on error
      }
    } catch (error) {
      console.error('Error during upload:', error);
      setError(`Request failed: ${error.message}`); // Capture network errors or other issues
      setLogs([]); // Clear logs on error
      setReport(null); // Clear report on error
    }
  };

  return (
    <div>
      <h1>REST API Evaluator</h1>
      <FileUploader onUpload={handleUpload} />
      
      {/* Display the error message if there is an error */}
      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}

      {/* Display the Report if logs are available */}
      {logs && logs.length > 0 && (
        <div>
          <h2>Log Report</h2>
          <pre>{JSON.stringify(logs, null, 2)}</pre>
        </div>
      )}

      {report && (
        <div>
          <h2>Upload Status</h2>
          <p>Status: {report.successRate}% successful</p>
          <p>Total Requests: {report.total}</p>
          <p>Successful: {report.successful}</p>
          <p>Failed: {report.failed}</p>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import FileUploader from './components/FileUploader';


function App() {
  const [report, setReport] = useState(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null); 

  
  const handleUpload = async (url) => {
    console.log('Sending URL:', url); 

    setLogs([]);
    setError(null);
    setReport(null);
  
    try {
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, timestamp: Date.now() }),
      });
  
      const result = await response.json();  
      console.log('API Response:', result);
  
      if (response.ok) {
        
       setLogs(result.results || []);
        setReport(result.report || {});
        console.log('Logs:', result.results); 
        console.log('Report:', result.report);
      } else {
        setError(`Error: ${response.status} - ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      setError(`Request failed: ${error.message}`);
    }
  };
  

  return (
    <div style={{ color: 'blue', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#8494ad' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>REST API EVALUATOR</h1>

      <FileUploader onUpload={handleUpload} />
      
      
      {error && (
        <div style={{ color: 'red', marginTop: '20px', padding: '10px', border: '1px solid red', backgroundColor: '#ffe6e6' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}

      {logs && logs.length > 0 && (
        <div style={{ color: "black", marginTop: '10px', padding: '10px', backgroundColor: '#e6f7ff', borderRadius: '5px', marginTop: '15px' }}>
          <h2 style={{ color: 'blue' , fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Log Report</h2>
          <pre>{JSON.stringify(logs, null, 2)}</pre>
        </div>
      )}

      {report && (
        <div style={{ color: "black", marginTop: '20px', padding: '20px', backgroundColor: '#e6f7ff', borderRadius: '5px' }}>
          <h2 style={{ color: 'blue' , fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Summary Report</h2>
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

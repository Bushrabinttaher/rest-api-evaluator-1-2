import React from 'react';

function Report({ logs, report }) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
  <h2 style={{ color: "blue", textAlign: 'center', color: '#333' }}>Report Summary</h2>
  <div style={{ marginBottom: '10px', fontSize: '16px', color: '#555' }}>
    <strong>Success Rate:</strong> {report.successRate || 'N/A'}%
  </div>
  <h3 style={{ marginTop: '20px', color: '#444' }}>Logs</h3>
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    {logs.map((log, index) => (
      <li
        key={index}
        style={{
          padding: '10px',
          marginBottom: '5px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          backgroundColor: '#f7f7f7',
        }}
      >
        <strong>Status:</strong> {log.status}, <strong>Error:</strong> {log.error}
      </li>
    ))}
  </ul>
</div>

  );
}

export default Report; 
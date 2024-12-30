import React from 'react';

function Report({ logs, report }) {
  return (
    <div>
      <h2>Report Summary</h2>
      <div>
        <strong>Success Rate:</strong> {report.successRate || 'N/A'}%
      </div>
      <div>
        <strong>Total Requests:</strong> {report.total || 'N/A'}
      </div>
      <div>
        <strong>Successful Requests:</strong> {report.successful || 'N/A'}
      </div>
      <div>
        <strong>Failed Requests:</strong> {report.failed || 'N/A'}
      </div>
      <h3>Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <strong>Status:</strong> {log.status}, <strong>Error:</strong> {log.error}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Report;

import React, { useState } from 'react';

function FileUploader({ onUpload }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      new URL(url); 
    } catch {
      setError('Invalid URL. Please enter a valid API URL.');
      return;
    }

    setError('');
    onUpload(url);
    setUrl('');
  };

  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <input
        style={{
          padding: '10px',
          width: '70%',
          marginRight: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
        type="text"
        placeholder="Enter API URL"
        value={url}
        onChange={handleChange}
      />
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#002fff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleSubmit}
      >
        UPLOAD
      </button>
      {error && (
        <div
          style={{
            color: 'red',
            marginTop: '10px',
            padding: '5px',
            border: '1px solid red',
            backgroundColor: '#ffe6e6',
            borderRadius: '3px',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default FileUploader;

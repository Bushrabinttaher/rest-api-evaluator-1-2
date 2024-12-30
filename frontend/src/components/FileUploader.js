import React, { useState } from 'react';

function FileUploader({ onUpload }) {
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    setUrl(e.target.value); // Update the URL input field
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload(url); // Trigger the onUpload function passed as a prop
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter API endpoint URL"
        value={url}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}

export default FileUploader;

const axios = require('axios');
const SwaggerParser = require("@apidevtools/swagger-parser");

let logs = [];

const logRequest = (endpoint, response) => {
  logs.push({
    endpoint,
    response,
  });
};

const generateReport = () => {
  const total = logs.length;
  const successful = logs.filter((log) => log.response.status >= 200 && log.response.status < 300).length;
  return {
    successRate: (successful / total) * 100,
    total,
    successful,
    failed: total - successful,
  };
};

const executeRequest = async (method, url, body = null) => {
  try {
    const response = await axios({
      method,
      url,
      data: body,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      error: error.message,
    };
  }
};

const uploadOASFile = async (req, res) => {
  try {
    const { url } = req.body;  
    const response = await axios.get(url);  
    const api = await SwaggerParser.validate(response.data); 

    const endpoints = Object.entries(api.paths).reduce((acc, [path, methods]) => {
      for (const [method, details] of Object.entries(methods)) {
        if (['get', 'post'].includes(method)) {
          acc.push({ method: method.toUpperCase(), path, details });
        }
      }
      return acc;
    }, []);

    const results = [];
    for (let endpoint of endpoints) {
      const { method, path } = endpoint;
      const body = method === 'POST' ? { dummyData: 'example' } : null; 
      const response = await executeRequest(method.toLowerCase(), `https://api.example.com${path}`, body); 
      logRequest(endpoint, response);
      results.push(response);
    }

    const report = generateReport();
    res.json({ results, report });
  } catch (error) {
    res.status(500).json({ message: 'Error processing OAS file', error: error.message });
  }
};

module.exports = { uploadOASFile };

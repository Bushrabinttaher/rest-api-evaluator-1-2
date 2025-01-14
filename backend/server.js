const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 5001;
const cors = require('cors')


app.use(cors());
app.use(bodyParser.json());

let logs = [];  


app.post('/api/upload', async (req, res) => {
  const { url } = req.body;  
  const openApiUrl = 'https://petstore.swagger.io/v2/swagger.json'; 
  const successResponses = [];  
  let successCount = 0;
  let failedCount = 0;

  try {
    
    const oasResponse = await axios.get(openApiUrl);
    const oas = oasResponse.data;

    
    const endpoints = [];
    for (const path in oas.paths) {
      for (const method in oas.paths[path]) {
        if (['get', 'post'].includes(method)) {
          endpoints.push({ method, path });
        }
      }
    }

   
    for (const endpoint of endpoints) {
      const { method, path } = endpoint;
      const requestUrl = `https://petstore.swagger.io/v2${path}`;

      try {
        let apiResponse;
        if (method === 'get') {
          apiResponse = await axios.get(requestUrl);  
        } else if (method === 'post') {
          apiResponse = await axios.post(requestUrl, {});  
        }

        
        logs.push({
          method,
          url: requestUrl,
          status: apiResponse.status,
          response: apiResponse.data,
        });

        
        if (apiResponse.status >= 200 && apiResponse.status < 300) {
          successResponses.push({ method, url: requestUrl, status: apiResponse.status });
          successCount++;
        } else {
          failedCount++;
        }
      } catch (error) {
        
        logs.push({
          method,
          url: requestUrl,
          status: error.response ? error.response.status : 'N/A',
          error: error.message,
        });

        failedCount++;
      }
    }

    const totalRequests = successCount + failedCount;
    const successRate = (successCount / totalRequests) * 100;

    const report = {
      successRate: successRate.toFixed(2),
      total: totalRequests,
      successful: successCount,
      failed: failedCount,
    };

    
    res.json({ results: logs, report });
  } catch (error) {
    console.error('Error fetching OAS:', error);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
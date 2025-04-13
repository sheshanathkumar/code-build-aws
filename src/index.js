const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// a test

// Serve static HTML page with cat fact
app.get('/cat-fact', async (req, res) => {
  try {
    const response = await axios.get('https://catfact.ninja/fact');
    const fact = response.data.fact;

    res.send(`
      <html>
        <head>
          <title>Cat Fact</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              background-color: #f8f9fa;
              text-align: center;
            }
            .box {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>🐱 Random Cat Fact</h1>
            <p>${fact}</p>
            <a href="/cat-fact">Get Another Fact</a>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    res.send(`<h2>Failed to fetch cat fact: ${error.message}</h2>`);
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('<h2>Welcome! Visit <a href="/cat-fact">/cat-fact</a> to see a cat fact 🐾</h2>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

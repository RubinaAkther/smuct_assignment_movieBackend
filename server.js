const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('This is a home page. and i am in server file');
});

app.get('/register', (req, res) => {
  res.status(200).send('This is a registration page');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

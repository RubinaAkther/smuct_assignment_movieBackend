const express = require('express');
const app = express();
const router = require('./routers/auth.route.js');
const connectDB = require('./utils/db.js');

app.use(express.json());

app.use('/api/auth', router);

const PORT = 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

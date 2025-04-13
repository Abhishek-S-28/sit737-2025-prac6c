const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
 res.send('This is an UPDATED version of the 737kubernetes app!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

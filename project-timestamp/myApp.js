const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date || Date.now();
  const date = new Date(dateParam);

  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  const unixTimestamp = date.getTime();
  const utcString = date.toUTCString();

  res.json({ unix: unixTimestamp, utc: utcString });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
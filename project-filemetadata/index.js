const express = require('express');
const cors = require('cors');
require('dotenv').config()
const multer = require('multer');
let app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, size } = req.file;
  
  res.json({ name: originalname, type: mimetype, size: size });
});
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});


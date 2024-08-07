const express = require('express');
const qr = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/generate', async (req, res) => {
  const { url, size } = req.body;

  try {
    const qrCode = await qr.toDataURL(url, { width: parseInt(size) });

    res.json({ src: qrCode });
  } catch (err) {
    res.status(500).send('Error occurred');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

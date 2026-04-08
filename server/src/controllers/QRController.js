const QRCode = require('qrcode');

const generateQR = async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL es requerida' });
    }

    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#3D2B1F',
        light: '#FAF7F2'
      }
    });

    res.json({ qr: qrDataUrl, url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateQRBuffer = async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL es requerida' });
    }

    const buffer = await QRCode.toBuffer(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#3D2B1F',
        light: '#FAF7F2'
      }
    });

    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateQR,
  generateQRBuffer
};

const express = require('express');
const router = express.Router();
const { generateQR, generateQRBuffer } = require('../controllers/QRController');

router.get('/', generateQR);
router.get('/download', generateQRBuffer);

module.exports = router;

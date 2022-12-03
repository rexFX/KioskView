const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/logout', async (req, res) => {
  axios.get('https://webkiosk.juit.ac.in:9443/CommonFiles/SignOut.jsp', { headers: { Cookie: req.cookies['Cookie'] } })
});

module.exports = router;
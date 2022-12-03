const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.post('/detailedAttendance/', async (req, res) => {
  let baseUrl = `https://webkiosk.juit.ac.in:9443/StudentFiles/Academic/${req.body['link']}`;
  axios.get(baseUrl, { headers: { Cookie: req.cookies['Cookie'] } })
    .then(resp => {
      let $ = cheerio.load(resp.data);
      let detailedList = [];
      $('#table-1 > tbody').children().each((i, el) => {
        let subj = {
          key: i,
        };
        for (let x = 2; x <= 5; x++) {
          subj[$(`#table-1 > thead > tr > td:nth-child(${x})`).text().trim()] = $(`td:nth-child(${x})`, el).text();
        }
        detailedList.push(subj);
      });
      res.send(detailedList);
    })
    .catch(err => res.send(err));
});

module.exports = router;
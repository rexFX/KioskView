const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.post('/attendance', async (req, res) => {
  let myList = [];
  axios.get('https://webkiosk.juit.ac.in:9443/StudentFiles/Academic/StudentAttendanceList.jsp', { headers: { Cookie: req.cookies['Cookie'] } })
    .then(resp => {
      let $ = cheerio.load(resp.data);
      $('#table-1 > tbody').children().each((i, el) => {
        let key = i;
        let name = $('td:nth-child(2)', el).text().trim();
        let totalAttendance, detailedAttendance;
        if (name.includes('LAB')) {
          totalAttendance = $('td:nth-child(6) > a', el).text().trim();
          detailedAttendance = $('td:nth-child(6) > a', el).attr('href');
        }
        else {
          totalAttendance = $('td:nth-child(3) > a', el).text().trim();
          detailedAttendance = $('td:nth-child(3) > a', el).attr('href');
        }
        myList.push({ key, name, totalAttendance, detailedAttendance });
      });
      res.send(myList);
    })
    .catch(err => {
      res.send('err');
    });
});

module.exports = router;